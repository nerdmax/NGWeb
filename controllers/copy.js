const NgWeb = require('../models/Ngweb');
const cheerio = require('cheerio');
// const symbolsParser = require('less-symbols-parser');
const log = require('pretty-log');

const fs = require('fs');
const fse = require('fs-extra');
const sharp = require('sharp');

const sql = require('mssql');

const gulp = require('gulp');
const less = require('gulp-less');
const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
const gutil = require('gulp-util');

const rootPath = 'C:/Max/SurgaPortalWebsites/Adept.WebSites';

/**
 * GET /
 * New Next Gen Web page.
 */
exports.getCopy = (req, res) => {
  log.debug(JSON.stringify(req.query.test, null, 4));
  fs.readdir(rootPath, (err, files) => {
    // console.log(files);
    const templateWebNames = [];
    files.forEach((file) => {
      if (fs.lstatSync(`${rootPath}\\${file}`).isDirectory()) {
        templateWebNames.push(file);
      }
    }, this);

    const ngWeb = new NgWeb({
      templateWebNames,
      templateWebName: 'Crown',
    });

    res.render('copy', {
      title: 'COPY',
      ngWeb,
    });
  });
};

/**
 * POST /
 * New Next Gen Web page.
 */
exports.postCopy = (req, res) => {
  // console.log(req.body.webLogo);
  // console.log(req.files);
  // console.log(path.join(__dirname, 'uploads'));

  // console.log(req.files.webLogo[0].buffer);

  RegExp.quote = function (str) {
    return `${str}`.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
  };

  function changeVar(key, oldValue, newValue, data) {
    const re = new RegExp(RegExp.quote(`"${key}": "${oldValue}"`), 'g');
    return data.replace(re, `"${key}": "${newValue}"`);
  }

  function changePackageJson(data, ngWeb) {
    const packagejson = JSON.parse(data);
    data = changeVar('name', packagejson.name, ngWeb.newWebName, data);
    data = changeVar('portNO', packagejson.nextGenConfig.portNO, ngWeb.portNO, data);
    data = changeVar('companyname', packagejson.nextGenConfig.companyname, ngWeb.newWebName, data);
    data = changeVar('stagingcompanyname', packagejson.nextGenConfig.stagingcompanyname, '', data);
    data = changeVar(
      'blobsettingsfilename',
      packagejson.nextGenConfig.blobsettingsfilename,
      `${ngWeb.newWebName}.BlobSettings`,
      data
    );
    data = changeVar('publishfilename', packagejson.nextGenConfig.publishfilename, '', data);
    return data;
  }

  function changeCompilerconfig(data, ngWeb) {
    data = changeVar(
      'outputFile',
      `css/${ngWeb.templateWebName}.css`,
      `css/${ngWeb.newWebName}.css`,
      data
    );
    data = changeVar(
      'inputFile',
      `less/${ngWeb.templateWebName}.less`,
      `less/${ngWeb.newWebName}.less`,
      data
    );
    return data;
  }

  function createNewDb(sqlReq, ngWeb, sqlConn) {
    sqlReq.query(
      `
                USE [master]
                RESTORE DATABASE [${ngWeb.newDbName}] FROM  DISK = N'C:\\Temp\\${ngWeb.templateDbName}.BAK' WITH  FILE = 1, MOVE N'${ngWeb.templateDbName}_Data' TO N'C:\\Program Files\\Microsoft SQL Server\\MSSQL13.MSSQLSERVER\\MSSQL\\DATA\\${ngWeb.newDbName}.mdf', MOVE N'${ngWeb.templateDbName}_Log' TO N'C:\\Program Files\\Microsoft SQL Server\\MSSQL13.MSSQLSERVER\\MSSQL\\DATA\\${ngWeb.newDbName}.ldf', NOUNLOAD, STATS = 5;
                ALTER DATABASE [${ngWeb.newDbName}] MODIFY FILE ( NAME = ${ngWeb.templateDbName}_Data, NEWNAME = ${ngWeb.newDbName}_Data );
                ALTER DATABASE [${ngWeb.newDbName}] MODIFY FILE ( NAME = ${ngWeb.templateDbName}_Log, NEWNAME = ${ngWeb.newDbName}_Log );
                `,
      (err, recordset) => {
        if (err) {
          log.error(err);
        } else {
          log.success(`13.1.2 Create new database: ${ngWeb.templateDbName}`);
        }
        sqlConn.close();
      }
    );
  }

  fs.readdir(rootPath, (err, files) => {
    // console.log(files);
    const templateWebNames = [];
    files.forEach((file) => {
      if (fs.lstatSync(`${rootPath}\\${file}`).isDirectory()) {
        templateWebNames.push(file);
      }
    }, this);

    // Construct NgWeb object
    const ngWeb = new NgWeb({
      templateWebNames,
      templateWebName: req.body.templateWebName,
      newWebName: req.body.newWebName,
      templateDbName: req.body.templateDbName,
      newDbName: req.body.newDbName,
      portNO: req.body.portNO,
      resetPassEmail: req.body.resetPassEmail,
      database: {
        databaseName: req.body.databaseName,
        databaseUsername: req.body.databaseUsername,
        databasePassword: req.body.databasePassword,
      },
      blob: {
        blobAddress: req.body.blobAddress,
        blobAccountKey: req.body.blobAccountKey,
      },
    });
    console.log(ngWeb);

    if (ngWeb.templateWebName && ngWeb.newWebName) {
      const templateWebFolder = `C:/Max/SurgaPortalWebsites/Adept.WebSites/${ngWeb.templateWebName}`;
      const NewWebFolder = `C:/Max/SurgaPortalWebsites/Adept.WebSites/${ngWeb.newWebName}`;

      // 1. Copy folder
      log.warn('Copying folder...');
      const filterFunc = (src, dest) => {
        if (src.indexOf('node_modules') === -1) {
          // if (src.indexOf('umbraco') === -1 && src.indexOf('umbraco_client') === -1) {
          //   return true;
          // }
          return true;
        }
      };
      fse.copySync(templateWebFolder, NewWebFolder, {
        filter: filterFunc,
      });
      log.success('1 Copy folder');

      // 2. Rename Folder
      if (fs.existsSync(`${NewWebFolder}/${ngWeb.templateWebName}`)) {
        fs.renameSync(
          `${NewWebFolder}/${ngWeb.templateWebName}`,
          `${NewWebFolder}/${ngWeb.newWebName}`
        );
        log.success('2 Rename Folder');
      }

      // 3. Rename *.BlobSettings
      const blobSettingFilePathOld = `${NewWebFolder}/${ngWeb.templateWebName}.BlobSettings`;
      const blobSettingFilePathNew = `${NewWebFolder}/${ngWeb.newWebName}.BlobSettings`;
      if (fs.existsSync(blobSettingFilePathOld)) {
        fs.renameSync(blobSettingFilePathOld, blobSettingFilePathNew);
        log.success('3 Rename *.BlobSettings');
      }

      // 4. Remove *.PublishSettings
      const publishSettingsFilePath = `${NewWebFolder}/${ngWeb.templateWebName}.PublishSettings`;
      if (fs.existsSync(publishSettingsFilePath)) {
        fse.removeSync(publishSettingsFilePath);
        log.success('4 Remove *.PublishSettings');
      } else {
        log.success("4 Cann't find *.PublishSettings");
      }

      // 5. Empty Log folder inside App_Data
      const logFolderPath = `${NewWebFolder}/${ngWeb.newWebName}/App_Data/Logs`;
      fse.emptyDirSync(logFolderPath);
      log.success('5 Empty Log folder inside App_Data');

      // 6. Delete uatlater, uatbackup folders
      const uatlaterFolderPath = `${NewWebFolder}/${ngWeb.newWebName}/uatlater`;
      const uatbackupFolderPath = `${NewWebFolder}/${ngWeb.newWebName}/uatbackup`;
      if (fs.existsSync(uatlaterFolderPath)) {
        fse.removeSync(uatlaterFolderPath);
        log.success('6.1 Delete uatlater folder');
      } else {
        log.success("6.1 Cann't find uatlater folder");
      }
      if (fs.existsSync(uatbackupFolderPath)) {
        fse.removeSync(uatbackupFolderPath);
        log.success('6.2 Delete uatback folder');
      } else {
        log.success("6.2 Cann't find uatback folder");
      }

      // 7. Change .less file's name
      const lessFilePathOld = `${NewWebFolder}/${ngWeb.newWebName}/less/${ngWeb.templateWebName}.less`;
      const lessFilePathNew = `${NewWebFolder}/${ngWeb.newWebName}/less/${ngWeb.newWebName}.less`;
      if (fs.existsSync(lessFilePathOld)) {
        fs.renameSync(lessFilePathOld, lessFilePathNew);
        log.success("7 Change .less file's name");
      }

      // 8. Delete bundle.min.css, (Company's name).css, (Company's name).min.css 3 files.
      const bundlecssminFilePath = `${NewWebFolder}/${ngWeb.newWebName}/css/bundle.min.css`;
      const companycssFilePath = `${NewWebFolder}/${ngWeb.newWebName}/css/${ngWeb.templateWebName}.css`;
      const companycssminFIlePath = `${NewWebFolder}/${ngWeb.newWebName}/css/${ngWeb.templateWebName}.min.css`;
      if (fs.existsSync(bundlecssminFilePath)) {
        fse.removeSync(bundlecssminFilePath);
        log.success('8.1 Delete bundle.min.css');
      }
      if (fs.existsSync(companycssFilePath)) {
        fse.removeSync(companycssFilePath);
        log.success("8.2 Delete (Company's name).css");
      }
      if (fs.existsSync(companycssminFIlePath)) {
        fse.removeSync(companycssminFIlePath);
        log.success("8.3 Delete (Company's name).min.css");
      }

      // 9. Replace favicon.ico, logo
      // favicon.ico
      if (req.files.favicon) {
        const faviconBuffer = req.files.favicon[0].buffer;
        fs.writeFileSync(
          `${NewWebFolder}/${ngWeb.newWebName}/favicon.ico`,
          faviconBuffer,
          'binary'
        );
        log.success('9.1 Replace favicon.ico');
      }
      // logo
      if (req.files.webLogo) {
        const webLogoBuffer = req.files.webLogo[0].buffer;
        // Resize logo images
        const resize = (size, index) => {
          let suffix = '';
          switch (index) {
            case 0:
              suffix = '';
              break;
            case 1:
              suffix = '@2x';
              break;
            case 2:
              suffix = '_fix';
              break;
            case 3:
              suffix = '_fix@2x';
              break;
            case 4:
              suffix = '_mobile';
              break;
            case 5:
              suffix = '_mobile@2x';
              break;
            case 6:
              suffix = '_tablet';
              break;
            case 7:
              suffix = '_tablet@2x';
              break;
            default:
              suffix = '';
          }
          sharp(webLogoBuffer)
            .resize(null, size)
            .toFile(`${NewWebFolder}/${ngWeb.newWebName}/images/logo/logo${suffix}.png`);
        };

        Promise.all([60, 120, 30, 60, 60, 120, 40, 80].map(resize)).then(() => {
          log.success('9.2 Replace logo');
        });
      }

      // 10. Change package.json
      // Get blob settings
      fs.readFile(`${NewWebFolder}/package.json`, 'utf8', (err, data) => {
        if (err) throw err;
        data = changePackageJson(data, ngWeb);
        fs.writeFile(`${NewWebFolder}/package.json`, data, 'utf8', (err) => {
          if (err) return console.log(err);
          log.success('10 Change package.json');
        });
      });

      // 11. Change email address
      let webConfig = fs.readFileSync(`${NewWebFolder}/${ngWeb.newWebName}/Web.config`);
      let $Web = cheerio.load(webConfig, {
        xmlMode: true,
        decodeEntities: false,
      });
      $Web('mailSettings smtp').attr('from', ngWeb.resetPassEmail);
      fs.writeFileSync(`${NewWebFolder}/${ngWeb.newWebName}/Web.config`, $Web.html());
      log.success('11 Change email address');

      // 12. Edit .compilerconfig.json
      fs.readFile(
        `${NewWebFolder}/${ngWeb.newWebName}/compilerconfig.json`,
        'utf8',
        (err, data) => {
          if (err) throw err;
          data = changeCompilerconfig(data, ngWeb);
          fs.writeFile(
            `${NewWebFolder}/${ngWeb.newWebName}/compilerconfig.json`,
            data,
            'utf8',
            (err) => {
              if (err) return console.log(err);
              log.success('12 Edit .compilerconfig.json');
            }
          );
        }
      );

      // 13. Setup database
      // 13.1 Backup & Copy database
      const dbConfig = {
        server: 'MAX2',
        user: 'admin',
        password: 'admin',
      };

      const sqlConn = new sql.ConnectionPool(dbConfig);
      const sqlReq = new sql.Request(sqlConn);

      sqlConn.connect((err) => {
        if (err) {
          log.error(err);
          return;
        }
        if (req.files.newDbFile) {
          // Get database from upload files
          const newDbFileBuffer = req.files.newDbFile[0].buffer;
          fs.writeFileSync(`C:\\Temp\\${ngWeb.templateDbName}.BAK`, newDbFileBuffer, 'binary');
          log.success(`13.1.1 Backup database: ${ngWeb.templateDbName}`);
          createNewDb(sqlReq, ngWeb, sqlConn);
        } else {
          sqlReq.query(
            `
            BACKUP DATABASE ${ngWeb.templateDbName} TO DISK = 'C:\\Temp\\${ngWeb.templateDbName}.BAK'
          `,
            (err, recordset) => {
              if (err) {
                log.error(err);
              } else {
                log.success(`13.1.1 Backup database: ${ngWeb.templateDbName}`);
                createNewDb(sqlReq, ngWeb, sqlConn);
              }
            }
          );
        }
      });
      // 13.2 Change web.config
      webConfig = fs.readFileSync(`${NewWebFolder}/${ngWeb.newWebName}/Web.config`);
      $Web = cheerio.load(webConfig, {
        xmlMode: true,
        decodeEntities: false,
      });
      $Web('connectionStrings add[name="umbracoDbDSN"]').attr(
        'connectionString',
        `server=MAX2;database=${ngWeb.newDbName};user id=umbraco;password=umbraco`
      );
      fs.writeFileSync(`${NewWebFolder}/${ngWeb.newWebName}/Web.config`, $Web.html());
      log.success('13.2 Edit Web.config with new dataBase settings');

      // 14.1 Generate CSS files
      const cssfiles = [
        `${NewWebFolder}/${ngWeb.newWebName}/css/bootstrap.css`,
        `${NewWebFolder}/${ngWeb.newWebName}/css/jquery-ui.css`,
        `${NewWebFolder}/${ngWeb.newWebName}/css/font-awesome.css`,
        `${NewWebFolder}/${ngWeb.newWebName}/css/jquery.selectBoxIt.css`,
        `${NewWebFolder}/${ngWeb.newWebName}/css/blueimp-gallery.css`,
        `${NewWebFolder}/${ngWeb.newWebName}/css/Common.css`,
        `${NewWebFolder}/${ngWeb.newWebName}/css/${ngWeb.newWebName}.css`
      ];
      gulp.task('compileLess', () =>
        gulp
          .src([
            `${NewWebFolder}/${ngWeb.newWebName}/less/Common.less`,
            `${NewWebFolder}/${ngWeb.newWebName}/less/${ngWeb.newWebName}.less`
          ])
          .pipe(less())
          .pipe(gulp.dest(`${NewWebFolder}/${ngWeb.newWebName}/css`))
      );
      gulp.task('bundleCss', ['compileLess'], () =>
        gulp
          .src(cssfiles)
          .pipe(concatCss('bundle.min.css'))
          .pipe(
            cleanCSS({
              compatibility: 'ie8',
              keepSpecialComments: 0,
              keepBreaks: false,
            })
          )
          .pipe(gulp.dest(`${NewWebFolder}/${ngWeb.newWebName}/css/`))
          .on('end', () => {
            gutil.log('14. Generate CSS files');
          })
      );
      gulp.start('bundleCss');
    }

    res.render('copy', {
      title: 'COPY',
      ngWeb,
    });
  });
};
