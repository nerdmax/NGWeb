const gulp = require('gulp');
const less = require('gulp-less');
const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
const NgWeb = require('../models/Ngweb');
const cheerio = require('cheerio');
const log = require('pretty-log');
const log4js = require('log4js');
const lessToJs = require('less-vars-to-js');

const fs = require('fs');

const rootPath = 'C:/Max/SurgaPortalWebsites/Adept.WebSites';
const companyName = 'Crown';

const logger = log4js.getLogger('modify');

function constructNgWebObject(req, templateWebNames) {
  return new NgWeb({
    templateWebNames,
    templateWebName: req.body.templateWebName,
    newWebName: req.body.newWebName,
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
    styleSettings: {
      colorSettings: {
        darkColor1: req.body.darkColor1,
        darkColor2: req.body.darkColor2,
        darkColor3: req.body.darkColor3,
        lightColor1: req.body.lightColor1,
        lightColor2: req.body.lightColor2,
        lightColor3: req.body.lightColor3,
        globalHoverColor1: req.body.globalHoverColor1,
        globalHoverColor2: req.body.globalHoverColor2,
      },
      otherSettings: {
        globalTextShadow1: req.body.globalTextShadow1,
      },
      themeSettings: {
        bgColor: {
          theme1BgColor: req.body.theme1BgColor,
          theme2BgColor: req.body.theme2BgColor,
          theme3BgColor: req.body.theme3BgColor,
          theme4BgColor: req.body.theme4BgColor,
        },
        bgGradient: {
          theme1BgGradient: req.body.theme1BgGradient === undefined ? 'false' : 'true',
          theme2BgGradient: req.body.theme2BgGradient === undefined ? 'false' : 'true',
          theme3BgGradient: req.body.theme3BgGradient === undefined ? 'false' : 'true',
          theme4BgGradient: req.body.theme4BgGradient === undefined ? 'false' : 'true',
        },
        bgGradientDetails: {
          theme1BgGradientDetails: req.body.theme1BgGradientDetails,
          theme2BgGradientDetails: req.body.theme2BgGradientDetails,
          theme3BgGradientDetails: req.body.theme3BgGradientDetails,
          theme4BgGradientDetails: req.body.theme4BgGradientDetails,
        },
        h1TextColor: {
          theme1H1TextColor: req.body.theme1H1TextColor,
          theme2H1TextColor: req.body.theme2H1TextColor,
          theme3H1TextColor: req.body.theme3H1TextColor,
          theme4H1TextColor: req.body.theme4H1TextColor,
        },
        h2TextColor: {
          theme1H2TextColor: req.body.theme1H2TextColor,
          theme2H2TextColor: req.body.theme2H2TextColor,
          theme3H2TextColor: req.body.theme3H2TextColor,
          theme4H2TextColor: req.body.theme4H2TextColor,
        },
        h3TextColor: {
          theme1H3TextColor: req.body.theme1H3TextColor,
          theme2H3TextColor: req.body.theme2H3TextColor,
          theme3H3TextColor: req.body.theme3H3TextColor,
          theme4H3TextColor: req.body.theme4H3TextColor,
        },
        h4TextColor: {
          theme1H4TextColor: req.body.theme1H4TextColor,
          theme2H4TextColor: req.body.theme2H4TextColor,
          theme3H4TextColor: req.body.theme3H4TextColor,
          theme4H4TextColor: req.body.theme4H4TextColor,
        },
        pTextColor: {
          theme1PTextColor: req.body.theme1PTextColor,
          theme2PTextColor: req.body.theme2PTextColor,
          theme3PTextColor: req.body.theme3PTextColor,
          theme4PTextColor: req.body.theme4PTextColor,
        },
        hyperLinkTextColor: {
          theme1HyperlinkTextColor: req.body.theme1HyperlinkTextColor,
          theme2HyperlinkTextColor: req.body.theme2HyperlinkTextColor,
          theme3HyperlinkTextColor: req.body.theme3HyperlinkTextColor,
          theme4HyperlinkTextColor: req.body.theme4HyperlinkTextColor,
        },
        hyperLinkHoverColor: {
          theme1HyperlinkHoverColor: req.body.theme1HyperlinkHoverColor,
          theme2HyperlinkHoverColor: req.body.theme2HyperlinkHoverColor,
          theme3HyperlinkHoverColor: req.body.theme3HyperlinkHoverColor,
          theme4HyperlinkHoverColor: req.body.theme4HyperlinkHoverColor,
        },
        IconTextColor: {
          theme1IconTextColor: req.body.theme1IconTextColor,
          theme2IconTextColor: req.body.theme2IconTextColor,
          theme3IconTextColor: req.body.theme3IconTextColor,
          theme4IconTextColor: req.body.theme4IconTextColor,
        },
        buttonTextColor: {
          theme1ButtonTextColor: req.body.theme1ButtonTextColor,
          theme2ButtonTextColor: req.body.theme2ButtonTextColor,
          theme3ButtonTextColor: req.body.theme3ButtonTextColor,
          theme4ButtonTextColor: req.body.theme4ButtonTextColor,
        },
        buttonTextHoverColor: {
          theme1ButtonTextHoverColor: req.body.theme1ButtonTextHoverColor,
          theme2ButtonTextHoverColor: req.body.theme2ButtonTextHoverColor,
          theme3ButtonTextHoverColor: req.body.theme3ButtonTextHoverColor,
          theme4ButtonTextHoverColor: req.body.theme4ButtonTextHoverColor,
        },
        buttonBgColor: {
          theme1ButtonBgColor: req.body.theme1ButtonBgColor,
          theme2ButtonBgColor: req.body.theme2ButtonBgColor,
          theme3ButtonBgColor: req.body.theme3ButtonBgColor,
          theme4ButtonBgColor: req.body.theme4ButtonBgColor,
        },
        buttonBgGradient: {
          theme1ButtonBgGradient: req.body.theme1ButtonBgGradient === undefined ? 'false' : 'true',
          theme2ButtonBgGradient: req.body.theme2ButtonBgGradient === undefined ? 'false' : 'true',
          theme3ButtonBgGradient: req.body.theme3ButtonBgGradient === undefined ? 'false' : 'true',
          theme4ButtonBgGradient: req.body.theme4ButtonBgGradient === undefined ? 'false' : 'true',
        },
        buttonBgGradientDetails: {
          theme1ButtonBgGradientDetails: req.body.theme1ButtonBgGradientDetails,
          theme2ButtonBgGradientDetails: req.body.theme2ButtonBgGradientDetails,
          theme3ButtonBgGradientDetails: req.body.theme3ButtonBgGradientDetails,
          theme4ButtonBgGradientDetails: req.body.theme4ButtonBgGradientDetails,
        },
        buttonBgHoverColor: {
          theme1ButtonBgHoverColor: req.body.theme1ButtonBgHoverColor,
          theme2ButtonBgHoverColor: req.body.theme2ButtonBgHoverColor,
          theme3ButtonBgHoverColor: req.body.theme3ButtonBgHoverColor,
          theme4ButtonBgHoverColor: req.body.theme4ButtonBgHoverColor,
        },
        buttonIs3D: {
          theme1ButtonIs3D: req.body.theme1ButtonIs3D === undefined ? 'false' : 'true',
          theme2ButtonIs3D: req.body.theme2ButtonIs3D === undefined ? 'false' : 'true',
          theme3ButtonIs3D: req.body.theme3ButtonIs3D === undefined ? 'false' : 'true',
          theme4ButtonIs3D: req.body.theme4ButtonIs3D === undefined ? 'false' : 'true',
        },
      },
      headerSettings: {
        haderBackground: {
          navBackgroundColor: req.body.navBackgroundColor,
        },
        topHeader: {
          navContactFontColor: req.body.navContactFontColor,
          navContactFontHoverColor: req.body.navContactFontHoverColor,
          navContactIconColor: req.body.navContactIconColor,
          navContactIconHoverColor: req.body.navContactIconHoverColor,
          navWatchlistFontColor: req.body.navWatchlistFontColor,
          navWatchlistFontHoverColor: req.body.navWatchlistFontHoverColor,
          navWatchlistIconColor: req.body.navWatchlistIconColor,
          navWatchlistIconHoverColor: req.body.navWatchlistIconHoverColor,
        },
        bottomHeader: {
          navFontColor: req.body.navFontColor,
          navFontHoverColor: req.body.navFontHoverColor,
          navSecondFontColor: req.body.navSecondFontColor,
          navSecondFontHoverColor: req.body.navSecondFontHoverColor,
          navMobileFontColor: req.body.navMobileFontColor,
          navMobileFontHoverColor: req.body.navMobileFontHoverColor,
          navMobileSecondFontColor: req.body.navMobileSecondFontColor,
          navMobileSecondFontHoverColor: req.body.navMobileSecondFontHoverColor,
          navToggleButtonColor: req.body.navToggleButtonColor,
          navToggleButtonBgColor: req.body.navToggleButtonBgColor,
        },
      },
      footerSettings: {
        footerBackground: {
          footerBgColor: req.body.footerBgColor,
          footerMianBackGroundColor: req.body.footerMianBackGroundColor,
          footerMainBottomDividerColor: req.body.footerMainBottomDividerColor,
          footerBottomBackgroundColor: req.body.footerBottomBackgroundColor,
        },
        footerColor: {
          footerFontColor: req.body.footerFontColor,
          footerFontHoverColor: req.body.footerFontHoverColor,
          footerIconColor: req.body.footerIconColor,
          footerIconHoverColor: req.body.footerIconHoverColor,
          footerRoundIconColor: req.body.footerRoundIconColor,
          footerRoundIconBgColor: req.body.footerRoundIconBgColor,
          footerRoundIconHoverColor: req.body.footerRoundIconHoverColor,
          footerRoundIconBgHoverColor: req.body.footerRoundIconBgHoverColor,
        },
      },
    },
  });
}

RegExp.quote = function (str) {
  return `${str}`.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
};

function getAllVar(ngWeb, palette) {
  // Global Settings
  // Get global colors
  ngWeb.styleSettings.colorSettings.darkColor1 = palette['@darkColor1'];
  ngWeb.styleSettings.colorSettings.darkColor2 = palette['@darkColor2'];
  ngWeb.styleSettings.colorSettings.darkColor3 = palette['@darkColor3'];
  ngWeb.styleSettings.colorSettings.lightColor1 = palette['@lightColor1'];
  ngWeb.styleSettings.colorSettings.lightColor2 = palette['@lightColor2'];
  ngWeb.styleSettings.colorSettings.lightColor3 = palette['@lightColor3'];
  ngWeb.styleSettings.colorSettings.globalHoverColor1 = palette['@globalHoverColor1'];
  ngWeb.styleSettings.colorSettings.globalHoverColor2 = palette['@globalHoverColor2'];
  // Get others settings
  ngWeb.styleSettings.otherSettings.globalTextShadow1 = palette['@globalTextShadow1'];

  // 4 Themes
  // Get theme background color
  ngWeb.styleSettings.themeSettings.bgColor.theme1BgColor = palette['@theme1BgColor'];
  ngWeb.styleSettings.themeSettings.bgColor.theme2BgColor = palette['@theme2BgColor'];
  ngWeb.styleSettings.themeSettings.bgColor.theme3BgColor = palette['@theme3BgColor'];
  ngWeb.styleSettings.themeSettings.bgColor.theme4BgColor = palette['@theme4BgColor'];

  // Get theme background gradient
  ngWeb.styleSettings.themeSettings.bgGradient.theme1BgGradient = palette['@theme1BgGradient'];
  ngWeb.styleSettings.themeSettings.bgGradient.theme2BgGradient = palette['@theme2BgGradient'];
  ngWeb.styleSettings.themeSettings.bgGradient.theme3BgGradient = palette['@theme3BgGradient'];
  ngWeb.styleSettings.themeSettings.bgGradient.theme4BgGradient = palette['@theme4BgGradient'];

  // Get theme background gradient details
  ngWeb.styleSettings.themeSettings.bgGradientDetails.theme1BgGradientDetails =
    palette['@theme1BgGradientDetails'];
  ngWeb.styleSettings.themeSettings.bgGradientDetails.theme2BgGradientDetails =
    palette['@theme2BgGradientDetails'];
  ngWeb.styleSettings.themeSettings.bgGradientDetails.theme3BgGradientDetails =
    palette['@theme3BgGradientDetails'];
  ngWeb.styleSettings.themeSettings.bgGradientDetails.theme4BgGradientDetails =
    palette['@theme4BgGradientDetails'];

  // Get theme h1 color
  ngWeb.styleSettings.themeSettings.h1TextColor.theme1H1TextColor = palette['@theme1H1TextColor'];
  ngWeb.styleSettings.themeSettings.h1TextColor.theme2H1TextColor = palette['@theme2H1TextColor'];
  ngWeb.styleSettings.themeSettings.h1TextColor.theme3H1TextColor = palette['@theme3H1TextColor'];
  ngWeb.styleSettings.themeSettings.h1TextColor.theme4H1TextColor = palette['@theme4H1TextColor'];

  // Get theme h2 color
  ngWeb.styleSettings.themeSettings.h2TextColor.theme1H2TextColor = palette['@theme1H2TextColor'];
  ngWeb.styleSettings.themeSettings.h2TextColor.theme2H2TextColor = palette['@theme2H2TextColor'];
  ngWeb.styleSettings.themeSettings.h2TextColor.theme3H2TextColor = palette['@theme3H2TextColor'];
  ngWeb.styleSettings.themeSettings.h2TextColor.theme4H2TextColor = palette['@theme4H2TextColor'];

  // Get theme h3 color
  ngWeb.styleSettings.themeSettings.h3TextColor.theme1H3TextColor = palette['@theme1H3TextColor'];
  ngWeb.styleSettings.themeSettings.h3TextColor.theme2H3TextColor = palette['@theme2H3TextColor'];
  ngWeb.styleSettings.themeSettings.h3TextColor.theme3H3TextColor = palette['@theme3H3TextColor'];
  ngWeb.styleSettings.themeSettings.h3TextColor.theme4H3TextColor = palette['@theme4H3TextColor'];

  // Get theme h4 color
  ngWeb.styleSettings.themeSettings.h4TextColor.theme1H4TextColor = palette['@theme1H4TextColor'];
  ngWeb.styleSettings.themeSettings.h4TextColor.theme2H4TextColor = palette['@theme2H4TextColor'];
  ngWeb.styleSettings.themeSettings.h4TextColor.theme3H4TextColor = palette['@theme3H4TextColor'];
  ngWeb.styleSettings.themeSettings.h4TextColor.theme4H4TextColor = palette['@theme4H4TextColor'];

  // Get theme body color
  ngWeb.styleSettings.themeSettings.pTextColor.theme1PTextColor = palette['@theme1PTextColor'];
  ngWeb.styleSettings.themeSettings.pTextColor.theme2PTextColor = palette['@theme2PTextColor'];
  ngWeb.styleSettings.themeSettings.pTextColor.theme3PTextColor = palette['@theme3PTextColor'];
  ngWeb.styleSettings.themeSettings.pTextColor.theme4PTextColor = palette['@theme4PTextColor'];

  // Get theme hyperlink text color
  ngWeb.styleSettings.themeSettings.hyperLinkTextColor.theme1HyperlinkTextColor =
    palette['@theme1HyperlinkTextColor'];
  ngWeb.styleSettings.themeSettings.hyperLinkTextColor.theme2HyperlinkTextColor =
    palette['@theme2HyperlinkTextColor'];
  ngWeb.styleSettings.themeSettings.hyperLinkTextColor.theme3HyperlinkTextColor =
    palette['@theme3HyperlinkTextColor'];
  ngWeb.styleSettings.themeSettings.hyperLinkTextColor.theme4HyperlinkTextColor =
    palette['@theme4HyperlinkTextColor'];

  // Get theme hyperlink text hover color
  ngWeb.styleSettings.themeSettings.hyperLinkHoverColor.theme1HyperlinkHoverColor =
    palette['@theme1HyperlinkHoverColor'];
  ngWeb.styleSettings.themeSettings.hyperLinkHoverColor.theme2HyperlinkHoverColor =
    palette['@theme2HyperlinkHoverColor'];
  ngWeb.styleSettings.themeSettings.hyperLinkHoverColor.theme3HyperlinkHoverColor =
    palette['@theme3HyperlinkHoverColor'];
  ngWeb.styleSettings.themeSettings.hyperLinkHoverColor.theme4HyperlinkHoverColor =
    palette['@theme4HyperlinkHoverColor'];

  // Get theme icon text color
  ngWeb.styleSettings.themeSettings.IconTextColor.theme1IconTextColor =
    palette['@theme1IconTextColor'];
  ngWeb.styleSettings.themeSettings.IconTextColor.theme2IconTextColor =
    palette['@theme2IconTextColor'];
  ngWeb.styleSettings.themeSettings.IconTextColor.theme3IconTextColor =
    palette['@theme3IconTextColor'];
  ngWeb.styleSettings.themeSettings.IconTextColor.theme4IconTextColor =
    palette['@theme4IconTextColor'];

  // Get theme button text color
  ngWeb.styleSettings.themeSettings.buttonTextColor.theme1ButtonTextColor =
    palette['@theme1ButtonTextColor'];
  ngWeb.styleSettings.themeSettings.buttonTextColor.theme2ButtonTextColor =
    palette['@theme2ButtonTextColor'];
  ngWeb.styleSettings.themeSettings.buttonTextColor.theme3ButtonTextColor =
    palette['@theme3ButtonTextColor'];
  ngWeb.styleSettings.themeSettings.buttonTextColor.theme4ButtonTextColor =
    palette['@theme4ButtonTextColor'];

  // Get theme button text hover color
  ngWeb.styleSettings.themeSettings.buttonTextHoverColor.theme1ButtonTextHoverColor =
    palette['@theme1ButtonTextHoverColor'];
  ngWeb.styleSettings.themeSettings.buttonTextHoverColor.theme2ButtonTextHoverColor =
    palette['@theme2ButtonTextHoverColor'];
  ngWeb.styleSettings.themeSettings.buttonTextHoverColor.theme3ButtonTextHoverColor =
    palette['@theme3ButtonTextHoverColor'];
  ngWeb.styleSettings.themeSettings.buttonTextHoverColor.theme4ButtonTextHoverColor =
    palette['@theme4ButtonTextHoverColor'];

  // Get theme button background color
  ngWeb.styleSettings.themeSettings.buttonBgColor.theme1ButtonBgColor =
    palette['@theme1ButtonBgColor'];
  ngWeb.styleSettings.themeSettings.buttonBgColor.theme2ButtonBgColor =
    palette['@theme2ButtonBgColor'];
  ngWeb.styleSettings.themeSettings.buttonBgColor.theme3ButtonBgColor =
    palette['@theme3ButtonBgColor'];
  ngWeb.styleSettings.themeSettings.buttonBgColor.theme4ButtonBgColor =
    palette['@theme4ButtonBgColor'];

  // Get theme button background gradient
  ngWeb.styleSettings.themeSettings.buttonBgGradient.theme1ButtonBgGradient =
    palette['@theme1ButtonBgGradient'];
  ngWeb.styleSettings.themeSettings.buttonBgGradient.theme2ButtonBgGradient =
    palette['@theme2ButtonBgGradient'];
  ngWeb.styleSettings.themeSettings.buttonBgGradient.theme3ButtonBgGradient =
    palette['@theme3ButtonBgGradient'];
  ngWeb.styleSettings.themeSettings.buttonBgGradient.theme4ButtonBgGradient =
    palette['@theme4ButtonBgGradient'];

  // Get theme button background gradient details
  ngWeb.styleSettings.themeSettings.buttonBgGradientDetails.theme1ButtonBgGradientDetails =
    palette['@theme1ButtonBgGradientDetails'];
  ngWeb.styleSettings.themeSettings.buttonBgGradientDetails.theme2ButtonBgGradientDetails =
    palette['@theme2ButtonBgGradientDetails'];
  ngWeb.styleSettings.themeSettings.buttonBgGradientDetails.theme3ButtonBgGradientDetails =
    palette['@theme3ButtonBgGradientDetails'];
  ngWeb.styleSettings.themeSettings.buttonBgGradientDetails.theme4ButtonBgGradientDetails =
    palette['@theme4ButtonBgGradientDetails'];

  // Get theme button background hover color
  ngWeb.styleSettings.themeSettings.buttonBgHoverColor.theme1ButtonBgHoverColor =
    palette['@theme1ButtonBgHoverColor'];
  ngWeb.styleSettings.themeSettings.buttonBgHoverColor.theme2ButtonBgHoverColor =
    palette['@theme2ButtonBgHoverColor'];
  ngWeb.styleSettings.themeSettings.buttonBgHoverColor.theme3ButtonBgHoverColor =
    palette['@theme3ButtonBgHoverColor'];
  ngWeb.styleSettings.themeSettings.buttonBgHoverColor.theme4ButtonBgHoverColor =
    palette['@theme4ButtonBgHoverColor'];

  // Get theme button is 3D flag
  ngWeb.styleSettings.themeSettings.buttonIs3D.theme1ButtonIs3D = palette['@theme1ButtonIs3D'];
  ngWeb.styleSettings.themeSettings.buttonIs3D.theme2ButtonIs3D = palette['@theme2ButtonIs3D'];
  ngWeb.styleSettings.themeSettings.buttonIs3D.theme3ButtonIs3D = palette['@theme3ButtonIs3D'];
  ngWeb.styleSettings.themeSettings.buttonIs3D.theme4ButtonIs3D = palette['@theme4ButtonIs3D'];

  // Header
  // Get header background style
  ngWeb.styleSettings.headerSettings.haderBackground.navBackgroundColor =
    palette['@navBackgroundColor'];
  // Get top header style
  ngWeb.styleSettings.headerSettings.topHeader.navContactFontColor =
    palette['@navContactFontColor'];
  ngWeb.styleSettings.headerSettings.topHeader.navContactFontHoverColor =
    palette['@navContactFontHoverColor'];
  ngWeb.styleSettings.headerSettings.topHeader.navContactIconColor =
    palette['@navContactIconColor'];
  ngWeb.styleSettings.headerSettings.topHeader.navContactIconHoverColor =
    palette['@navContactIconHoverColor'];
  ngWeb.styleSettings.headerSettings.topHeader.navWatchlistFontColor =
    palette['@navWatchlistFontColor'];
  ngWeb.styleSettings.headerSettings.topHeader.navWatchlistFontHoverColor =
    palette['@navWatchlistFontHoverColor'];
  ngWeb.styleSettings.headerSettings.topHeader.navWatchlistIconColor =
    palette['@navWatchlistIconColor'];
  ngWeb.styleSettings.headerSettings.topHeader.navWatchlistIconHoverColor =
    palette['@navWatchlistIconHoverColor'];
  // Get bottom header style
  ngWeb.styleSettings.headerSettings.bottomHeader.navFontColor = palette['@navFontColor'];
  ngWeb.styleSettings.headerSettings.bottomHeader.navFontHoverColor = palette['@navFontHoverColor'];
  ngWeb.styleSettings.headerSettings.bottomHeader.navSecondFontColor =
    palette['@navSecondFontColor'];
  ngWeb.styleSettings.headerSettings.bottomHeader.navSecondFontHoverColor =
    palette['@navSecondFontHoverColor'];
  ngWeb.styleSettings.headerSettings.bottomHeader.navMobileFontColor =
    palette['@navMobileFontColor'];
  ngWeb.styleSettings.headerSettings.bottomHeader.navMobileFontHoverColor =
    palette['@navMobileFontHoverColor'];
  ngWeb.styleSettings.headerSettings.bottomHeader.navMobileSecondFontColor =
    palette['@navMobileSecondFontColor'];
  ngWeb.styleSettings.headerSettings.bottomHeader.navMobileSecondFontHoverColor =
    palette['@navMobileSecondFontHoverColor'];
  ngWeb.styleSettings.headerSettings.bottomHeader.navToggleButtonColor =
    palette['@navToggleButtonColor'];
  ngWeb.styleSettings.headerSettings.bottomHeader.navToggleButtonBgColor =
    palette['@navToggleButtonBgColor'];

  // Footer
  // Get Footer background style
  ngWeb.styleSettings.footerSettings.footerBackground.footerBgColor = palette['@footerBgColor'];
  ngWeb.styleSettings.footerSettings.footerBackground.footerMianBackGroundColor =
    palette['@footerMianBackGroundColor'];
  ngWeb.styleSettings.footerSettings.footerBackground.footerMainBottomDividerColor =
    palette['@footerMainBottomDividerColor'];
  ngWeb.styleSettings.footerSettings.footerBackground.footerBottomBackgroundColor =
    palette['@footerBottomBackgroundColor'];
  // Get Footer style
  ngWeb.styleSettings.footerSettings.footerColor.footerFontColor = palette['@footerFontColor'];
  ngWeb.styleSettings.footerSettings.footerColor.footerFontHoverColor =
    palette['@footerFontHoverColor'];
  ngWeb.styleSettings.footerSettings.footerColor.footerIconColor = palette['@footerIconColor'];
  ngWeb.styleSettings.footerSettings.footerColor.footerIconHoverColor =
    palette['@footerIconHoverColor'];
  ngWeb.styleSettings.footerSettings.footerColor.footerRoundIconColor =
    palette['@footerRoundIconColor'];
  ngWeb.styleSettings.footerSettings.footerColor.footerRoundIconBgColor =
    palette['@footerRoundIconBgColor'];
  ngWeb.styleSettings.footerSettings.footerColor.footerRoundIconHoverColor =
    palette['@footerRoundIconHoverColor'];
  ngWeb.styleSettings.footerSettings.footerColor.footerRoundIconBgHoverColor =
    palette['@footerRoundIconBgHoverColor'];
}

function changeBlobSettings(ngWeb, req) {
  const blobinfo = {
    blobaddress: ngWeb.blob.blobAddress,
    accountname: ngWeb.blob.blobAddress
      .replace('https://', '')
      .replace('.blob.core.windows.net/', ''),
    accountkey: ngWeb.blob.blobAccountKey,
  };
  // .BlobSettings
  fs.readFile(
    `${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}.BlobSettings`,
    (err, data) => {
      if (err) {
        throw err;
      }

      const $blobsettings = cheerio.load(data, {
        xmlMode: true,
        decodeEntities: false,
      });

      $blobsettings('blob').attr('blobaddress', blobinfo.blobaddress);
      $blobsettings('blob').attr('accountkey', blobinfo.accountkey);
      log.error($blobsettings('blob').attr('accountkey'));

      fs.writeFile(
        `${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}.BlobSettings`,
        $blobsettings.html(),
        (err) => {
          if (err) {
            throw err;
          }
          log.warn('.BlobSettings (2 parts) has been changed successfully');
        }
      );
    }
  );
  // FileSystemProviders.config
  fs.readFile(
    `${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}/Config/FileSystemProviders.config`,
    (err, data) => {
      if (err) {
        throw err;
      }

      const $FileSystemProviders = cheerio.load(data, {
        xmlMode: true,
        decodeEntities: false,
      });

      log.warn('----------Start FileSystemProviders.config (3 parts) logging old----------');
      log.warn($FileSystemProviders('add[key="rootUrl"]').attr('value'));
      log.warn($FileSystemProviders('add[key="connectionString"]').attr('value'));
      log.warn('----------Start FileSystemProviders.config (3 parts) logging new----------');
      $FileSystemProviders('add[key="rootUrl"]').attr('value', blobinfo.blobaddress);
      $FileSystemProviders('add[key="connectionString"]').attr(
        'value',
        `DefaultEndpointsProtocol=https;AccountName=${blobinfo.accountname};AccountKey=${blobinfo.accountkey}`
      );
      log.warn($FileSystemProviders('add[key="rootUrl"]').attr('value'));
      log.warn($FileSystemProviders('add[key="connectionString"]').attr('value'));

      fs.writeFile(
        `${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}/Config/FileSystemProviders.config`,
        $FileSystemProviders.html(),
        (err) => {
          if (err) {
            throw err;
          }
          log.warn('FileSystemProviders.config (3 parts) has been changed successfully');
        }
      );
    }
  );
  // cache.config
  fs.readFile(
    `${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}/Config/imageprocessor/cache.config`,
    (err, data) => {
      if (err) {
        throw err;
      }

      const $cache = cheerio.load(data, {
        xmlMode: true,
        decodeEntities: false,
      });

      log.warn('----------Start cache.config (4 parts) logging old----------');
      log.warn($cache('setting[key="CachedStorageAccount"]').attr('value'));
      log.warn($cache('setting[key="SourceStorageAccount"]').attr('value'));
      log.warn('----------Start cache.config (4 parts) logging new----------');
      $cache('setting[key="CachedStorageAccount"]').attr(
        'value',
        `DefaultEndpointsProtocol=https;AccountName=${blobinfo.accountname};AccountKey=${blobinfo.accountkey}`
      );
      $cache('setting[key="SourceStorageAccount"]').attr(
        'value',
        `DefaultEndpointsProtocol=https;AccountName=${blobinfo.accountname};AccountKey=${blobinfo.accountkey}`
      );
      log.warn($cache('setting[key="CachedStorageAccount"]').attr('value'));
      log.warn($cache('setting[key="SourceStorageAccount"]').attr('value'));

      fs.writeFile(
        `${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}/Config/imageprocessor/cache.config`,
        $cache.html(),
        (err) => {
          if (err) {
            throw err;
          }
          log.warn('cache.config (4 parts) has been changed successfully');
        }
      );
    }
  );
  // security.config
  fs.readFile(
    `${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}/Config/imageprocessor/security.config`,
    (err, data) => {
      if (err) {
        throw err;
      }

      const $security = cheerio.load(data, {
        xmlMode: true,
        decodeEntities: false,
      });

      log.warn('----------Start security.config (2 parts) logging old----------');
      log.warn($security('setting[key="Host"]').attr('value'));
      log.warn($security('whitelist add').attr('url'));
      log.warn('----------Start security.config (2 parts) logging new----------');
      $security('setting[key="Host"]').attr('value', `${blobinfo.blobaddress}media/`);
      $security('whitelist add').attr('url', (index, currentvalue) => {
        if (index === 0) {
          currentvalue = blobinfo.blobaddress;
        }
        return currentvalue;
      });
      log.warn($security('setting[key="Host"]').attr('value'));
      log.warn($security('whitelist add').attr('url'));

      fs.writeFile(
        `${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}/Config/imageprocessor/security.config`,
        $security.html(),
        (err) => {
          if (err) {
            throw err;
          }
          log.warn('security.config (2 parts) has been changed successfully');
        }
      );
    }
  );
  // Web.config
  fs.readFile(
    `${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}/Web.config`,
    (err, data) => {
      if (err) {
        throw err;
      }

      const $Web = cheerio.load(data, {
        xmlMode: true,
        decodeEntities: false,
      });

      log.warn('----------Start Web.config (2 parts) logging old----------');
      log.warn($Web('add[key="StaticContent.StorageConnectionString"]').attr('value'));
      log.warn('----------Start Web.config (2 parts) logging new----------');
      $Web('add[key="StaticContent.StorageConnectionString"]').attr(
        'value',
        `DefaultEndpointsProtocol=https;AccountName=${blobinfo.accountname};AccountKey=${blobinfo.accountkey}`
      );
      log.warn($Web('add[key="StaticContent.StorageConnectionString"]').attr('value'));

      fs.writeFile(
        `${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}/Web.config`,
        $Web.html(),
        (err) => {
          if (err) {
            throw err;
          }
          log.warn('Web.config (2 parts) has been changed successfully');
        }
      );
    }
  );
}

function changeVar(palette, lessVariableName, lessVariableValue, data) {
  const re = new RegExp(RegExp.quote(`${lessVariableName}: ${palette[lessVariableName]}`), 'g');
  return data.replace(re, `${lessVariableName}: ${lessVariableValue}`);
}

function changeAllVar(data, palette, ngWeb) {
  // Set up global colors
  data = changeVar(palette, '@darkColor1', ngWeb.styleSettings.colorSettings.darkColor1, data);
  data = changeVar(palette, '@darkColor2', ngWeb.styleSettings.colorSettings.darkColor2, data);
  data = changeVar(palette, '@darkColor3', ngWeb.styleSettings.colorSettings.darkColor3, data);
  data = changeVar(palette, '@lightColor1', ngWeb.styleSettings.colorSettings.lightColor1, data);
  data = changeVar(palette, '@lightColor2', ngWeb.styleSettings.colorSettings.lightColor2, data);
  data = changeVar(palette, '@lightColor3', ngWeb.styleSettings.colorSettings.lightColor3, data);
  data = changeVar(
    palette,
    '@globalHoverColor1',
    ngWeb.styleSettings.colorSettings.globalHoverColor1,
    data
  );
  data = changeVar(
    palette,
    '@globalHoverColor2',
    ngWeb.styleSettings.colorSettings.globalHoverColor2,
    data
  );
  // Set up others settings
  // less-symbols-parser has a bug, cann't read rgba(0, 0, 0, 0.75) properly
  // data = changeVar(palette, '@globalTextShadow1', ngWeb.styleSettings.otherSettings.globalTextShadow1, data);
  // Set up theme background color
  data = changeVar(
    palette,
    '@theme1BgColor',
    ngWeb.styleSettings.themeSettings.bgColor.theme1BgColor,
    data
  );
  data = changeVar(
    palette,
    '@theme2BgColor',
    ngWeb.styleSettings.themeSettings.bgColor.theme2BgColor,
    data
  );
  data = changeVar(
    palette,
    '@theme3BgColor',
    ngWeb.styleSettings.themeSettings.bgColor.theme3BgColor,
    data
  );
  data = changeVar(
    palette,
    '@theme4BgColor',
    ngWeb.styleSettings.themeSettings.bgColor.theme4BgColor,
    data
  );
  // Set up theme background gradient
  data = changeVar(
    palette,
    '@theme1BgGradient',
    ngWeb.styleSettings.themeSettings.bgGradient.theme1BgGradient,
    data
  );
  data = changeVar(
    palette,
    '@theme2BgGradient',
    ngWeb.styleSettings.themeSettings.bgGradient.theme2BgGradient,
    data
  );
  data = changeVar(
    palette,
    '@theme3BgGradient',
    ngWeb.styleSettings.themeSettings.bgGradient.theme3BgGradient,
    data
  );
  data = changeVar(
    palette,
    '@theme4BgGradient',
    ngWeb.styleSettings.themeSettings.bgGradient.theme4BgGradient,
    data
  );
  // Set up theme background gradient details
  data = changeVar(
    palette,
    '@theme1BgGradientDetails',
    ngWeb.styleSettings.themeSettings.bgGradientDetails.theme1BgGradientDetails,
    data
  );
  data = changeVar(
    palette,
    '@theme2BgGradientDetails',
    ngWeb.styleSettings.themeSettings.bgGradientDetails.theme2BgGradientDetails,
    data
  );
  data = changeVar(
    palette,
    '@theme3BgGradientDetails',
    ngWeb.styleSettings.themeSettings.bgGradientDetails.theme3BgGradientDetails,
    data
  );
  data = changeVar(
    palette,
    '@theme4BgGradientDetails',
    ngWeb.styleSettings.themeSettings.bgGradientDetails.theme4BgGradientDetails,
    data
  );
  // Set up theme h1 color
  data = changeVar(
    palette,
    '@theme1H1TextColor',
    ngWeb.styleSettings.themeSettings.h1TextColor.theme1H1TextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme2H1TextColor',
    ngWeb.styleSettings.themeSettings.h1TextColor.theme2H1TextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme3H1TextColor',
    ngWeb.styleSettings.themeSettings.h1TextColor.theme3H1TextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme4H1TextColor',
    ngWeb.styleSettings.themeSettings.h1TextColor.theme4H1TextColor,
    data
  );
  // Set up theme h2 color
  data = changeVar(
    palette,
    '@theme1H2TextColor',
    ngWeb.styleSettings.themeSettings.h2TextColor.theme1H2TextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme2H2TextColor',
    ngWeb.styleSettings.themeSettings.h2TextColor.theme2H2TextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme3H2TextColor',
    ngWeb.styleSettings.themeSettings.h2TextColor.theme3H2TextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme4H2TextColor',
    ngWeb.styleSettings.themeSettings.h2TextColor.theme4H2TextColor,
    data
  );
  // Set up theme h3 color
  data = changeVar(
    palette,
    '@theme1H3TextColor',
    ngWeb.styleSettings.themeSettings.h3TextColor.theme1H3TextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme2H3TextColor',
    ngWeb.styleSettings.themeSettings.h3TextColor.theme2H3TextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme3H3TextColor',
    ngWeb.styleSettings.themeSettings.h3TextColor.theme3H3TextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme4H3TextColor',
    ngWeb.styleSettings.themeSettings.h3TextColor.theme4H3TextColor,
    data
  );
  // Set up theme h4 color
  data = changeVar(
    palette,
    '@theme1H4TextColor',
    ngWeb.styleSettings.themeSettings.h4TextColor.theme1H4TextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme2H4TextColor',
    ngWeb.styleSettings.themeSettings.h4TextColor.theme2H4TextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme3H4TextColor',
    ngWeb.styleSettings.themeSettings.h4TextColor.theme3H4TextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme4H4TextColor',
    ngWeb.styleSettings.themeSettings.h4TextColor.theme4H4TextColor,
    data
  );
  // Set up theme body color
  data = changeVar(
    palette,
    '@theme1PTextColor',
    ngWeb.styleSettings.themeSettings.pTextColor.theme1PTextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme2PTextColor',
    ngWeb.styleSettings.themeSettings.pTextColor.theme2PTextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme3PTextColor',
    ngWeb.styleSettings.themeSettings.pTextColor.theme3PTextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme4PTextColor',
    ngWeb.styleSettings.themeSettings.pTextColor.theme4PTextColor,
    data
  );
  // Set up theme hyperlink text color
  data = changeVar(
    palette,
    '@theme1HyperlinkTextColor',
    ngWeb.styleSettings.themeSettings.hyperLinkTextColor.theme1HyperlinkTextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme2HyperlinkTextColor',
    ngWeb.styleSettings.themeSettings.hyperLinkTextColor.theme2HyperlinkTextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme3HyperlinkTextColor',
    ngWeb.styleSettings.themeSettings.hyperLinkTextColor.theme3HyperlinkTextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme4HyperlinkTextColor',
    ngWeb.styleSettings.themeSettings.hyperLinkTextColor.theme4HyperlinkTextColor,
    data
  );
  // Set up theme hyperlink text hover color
  data = changeVar(
    palette,
    '@theme1HyperlinkHoverColor',
    ngWeb.styleSettings.themeSettings.hyperLinkHoverColor.theme1HyperlinkHoverColor,
    data
  );
  data = changeVar(
    palette,
    '@theme2HyperlinkHoverColor',
    ngWeb.styleSettings.themeSettings.hyperLinkHoverColor.theme2HyperlinkHoverColor,
    data
  );
  data = changeVar(
    palette,
    '@theme3HyperlinkHoverColor',
    ngWeb.styleSettings.themeSettings.hyperLinkHoverColor.theme3HyperlinkHoverColor,
    data
  );
  data = changeVar(
    palette,
    '@theme4HyperlinkHoverColor',
    ngWeb.styleSettings.themeSettings.hyperLinkHoverColor.theme4HyperlinkHoverColor,
    data
  );
  // Set up theme icon text color
  data = changeVar(
    palette,
    '@theme1IconTextColor',
    ngWeb.styleSettings.themeSettings.IconTextColor.theme1IconTextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme2IconTextColor',
    ngWeb.styleSettings.themeSettings.IconTextColor.theme2IconTextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme3IconTextColor',
    ngWeb.styleSettings.themeSettings.IconTextColor.theme3IconTextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme4IconTextColor',
    ngWeb.styleSettings.themeSettings.IconTextColor.theme4IconTextColor,
    data
  );
  // Set up theme button text color
  data = changeVar(
    palette,
    '@theme1ButtonTextColor',
    ngWeb.styleSettings.themeSettings.buttonTextColor.theme1ButtonTextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme2ButtonTextColor',
    ngWeb.styleSettings.themeSettings.buttonTextColor.theme2ButtonTextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme3ButtonTextColor',
    ngWeb.styleSettings.themeSettings.buttonTextColor.theme3ButtonTextColor,
    data
  );
  data = changeVar(
    palette,
    '@theme4ButtonTextColor',
    ngWeb.styleSettings.themeSettings.buttonTextColor.theme4ButtonTextColor,
    data
  );
  // Set up theme button text hover color
  data = changeVar(
    palette,
    '@theme1ButtonTextHoverColor',
    ngWeb.styleSettings.themeSettings.buttonTextHoverColor.theme1ButtonTextHoverColor,
    data
  );
  data = changeVar(
    palette,
    '@theme2ButtonTextHoverColor',
    ngWeb.styleSettings.themeSettings.buttonTextHoverColor.theme2ButtonTextHoverColor,
    data
  );
  data = changeVar(
    palette,
    '@theme3ButtonTextHoverColor',
    ngWeb.styleSettings.themeSettings.buttonTextHoverColor.theme3ButtonTextHoverColor,
    data
  );
  data = changeVar(
    palette,
    '@theme4ButtonTextHoverColor',
    ngWeb.styleSettings.themeSettings.buttonTextHoverColor.theme4ButtonTextHoverColor,
    data
  );
  // Set up theme button background color
  data = changeVar(
    palette,
    '@theme1ButtonBgColor',
    ngWeb.styleSettings.themeSettings.buttonBgColor.theme1ButtonBgColor,
    data
  );
  data = changeVar(
    palette,
    '@theme2ButtonBgColor',
    ngWeb.styleSettings.themeSettings.buttonBgColor.theme2ButtonBgColor,
    data
  );
  data = changeVar(
    palette,
    '@theme3ButtonBgColor',
    ngWeb.styleSettings.themeSettings.buttonBgColor.theme3ButtonBgColor,
    data
  );
  data = changeVar(
    palette,
    '@theme4ButtonBgColor',
    ngWeb.styleSettings.themeSettings.buttonBgColor.theme4ButtonBgColor,
    data
  );
  // Set up theme button background gradient
  data = changeVar(
    palette,
    '@theme1ButtonBgGradient',
    ngWeb.styleSettings.themeSettings.buttonBgGradient.theme1ButtonBgGradient,
    data
  );
  data = changeVar(
    palette,
    '@theme2ButtonBgGradient',
    ngWeb.styleSettings.themeSettings.buttonBgGradient.theme2ButtonBgGradient,
    data
  );
  data = changeVar(
    palette,
    '@theme3ButtonBgGradient',
    ngWeb.styleSettings.themeSettings.buttonBgGradient.theme3ButtonBgGradient,
    data
  );
  data = changeVar(
    palette,
    '@theme4ButtonBgGradient',
    ngWeb.styleSettings.themeSettings.buttonBgGradient.theme4ButtonBgGradient,
    data
  );
  // Set up theme button background gradient details
  data = changeVar(
    palette,
    '@theme1ButtonBgGradientDetails',
    ngWeb.styleSettings.themeSettings.buttonBgGradientDetails.theme1ButtonBgGradientDetails,
    data
  );
  data = changeVar(
    palette,
    '@theme2ButtonBgGradientDetails',
    ngWeb.styleSettings.themeSettings.buttonBgGradientDetails.theme2ButtonBgGradientDetails,
    data
  );
  data = changeVar(
    palette,
    '@theme3ButtonBgGradientDetails',
    ngWeb.styleSettings.themeSettings.buttonBgGradientDetails.theme3ButtonBgGradientDetails,
    data
  );
  data = changeVar(
    palette,
    '@theme4ButtonBgGradientDetails',
    ngWeb.styleSettings.themeSettings.buttonBgGradientDetails.theme4ButtonBgGradientDetails,
    data
  );
  // Set up theme button background hover color
  data = changeVar(
    palette,
    '@theme1ButtonBgHoverColor',
    ngWeb.styleSettings.themeSettings.buttonBgHoverColor.theme1ButtonBgHoverColor,
    data
  );
  data = changeVar(
    palette,
    '@theme2ButtonBgHoverColor',
    ngWeb.styleSettings.themeSettings.buttonBgHoverColor.theme2ButtonBgHoverColor,
    data
  );
  data = changeVar(
    palette,
    '@theme3ButtonBgHoverColor',
    ngWeb.styleSettings.themeSettings.buttonBgHoverColor.theme3ButtonBgHoverColor,
    data
  );
  data = changeVar(
    palette,
    '@theme4ButtonBgHoverColor',
    ngWeb.styleSettings.themeSettings.buttonBgHoverColor.theme4ButtonBgHoverColor,
    data
  );
  // Set up 3D button
  data = changeVar(
    palette,
    '@theme1ButtonIs3D',
    ngWeb.styleSettings.themeSettings.buttonIs3D.theme1ButtonIs3D,
    data
  );
  data = changeVar(
    palette,
    '@theme2ButtonIs3D',
    ngWeb.styleSettings.themeSettings.buttonIs3D.theme2ButtonIs3D,
    data
  );
  data = changeVar(
    palette,
    '@theme3ButtonIs3D',
    ngWeb.styleSettings.themeSettings.buttonIs3D.theme3ButtonIs3D,
    data
  );
  data = changeVar(
    palette,
    '@theme4ButtonIs3D',
    ngWeb.styleSettings.themeSettings.buttonIs3D.theme4ButtonIs3D,
    data
  );
  // Header
  // Set header background style
  data = changeVar(
    palette,
    '@navBackgroundColor',
    ngWeb.styleSettings.headerSettings.haderBackground.navBackgroundColor,
    data
  );
  // Set top header style
  data = changeVar(
    palette,
    '@navContactFontColor',
    ngWeb.styleSettings.headerSettings.topHeader.navContactFontColor,
    data
  );
  data = changeVar(
    palette,
    '@navContactFontHoverColor',
    ngWeb.styleSettings.headerSettings.topHeader.navContactFontHoverColor,
    data
  );
  data = changeVar(
    palette,
    '@navContactIconColor',
    ngWeb.styleSettings.headerSettings.topHeader.navContactIconColor,
    data
  );
  data = changeVar(
    palette,
    '@navContactIconHoverColor',
    ngWeb.styleSettings.headerSettings.topHeader.navContactIconHoverColor,
    data
  );
  data = changeVar(
    palette,
    '@navWatchlistFontColor',
    ngWeb.styleSettings.headerSettings.topHeader.navWatchlistFontColor,
    data
  );
  data = changeVar(
    palette,
    '@navWatchlistFontHoverColor',
    ngWeb.styleSettings.headerSettings.topHeader.navWatchlistFontHoverColor,
    data
  );
  data = changeVar(
    palette,
    '@navWatchlistIconColor',
    ngWeb.styleSettings.headerSettings.topHeader.navWatchlistIconColor,
    data
  );
  data = changeVar(
    palette,
    '@navWatchlistIconHoverColor',
    ngWeb.styleSettings.headerSettings.topHeader.navWatchlistIconHoverColor,
    data
  );
  // Get bottom header style
  data = changeVar(
    palette,
    '@navFontColor',
    ngWeb.styleSettings.headerSettings.bottomHeader.navFontColor,
    data
  );
  data = changeVar(
    palette,
    '@navFontHoverColor',
    ngWeb.styleSettings.headerSettings.bottomHeader.navFontHoverColor,
    data
  );
  data = changeVar(
    palette,
    '@navSecondFontColor',
    ngWeb.styleSettings.headerSettings.bottomHeader.navSecondFontColor,
    data
  );
  data = changeVar(
    palette,
    '@navSecondFontHoverColor',
    ngWeb.styleSettings.headerSettings.bottomHeader.navSecondFontHoverColor,
    data
  );
  data = changeVar(
    palette,
    '@navMobileFontColor',
    ngWeb.styleSettings.headerSettings.bottomHeader.navMobileFontColor,
    data
  );
  data = changeVar(
    palette,
    '@navMobileFontHoverColor',
    ngWeb.styleSettings.headerSettings.bottomHeader.navMobileFontHoverColor,
    data
  );
  data = changeVar(
    palette,
    '@navMobileSecondFontColor',
    ngWeb.styleSettings.headerSettings.bottomHeader.navMobileSecondFontColor,
    data
  );
  data = changeVar(
    palette,
    '@navMobileSecondFontHoverColor',
    ngWeb.styleSettings.headerSettings.bottomHeader.navMobileSecondFontHoverColor,
    data
  );
  data = changeVar(
    palette,
    '@navToggleButtonColor',
    ngWeb.styleSettings.headerSettings.bottomHeader.navToggleButtonColor,
    data
  );
  data = changeVar(
    palette,
    '@navToggleButtonBgColor',
    ngWeb.styleSettings.headerSettings.bottomHeader.navToggleButtonBgColor,
    data
  );
  // Footer
  // Get Footer background style
  data = changeVar(
    palette,
    '@footerBgColor',
    ngWeb.styleSettings.footerSettings.footerBackground.footerBgColor,
    data
  );
  data = changeVar(
    palette,
    '@footerMianBackGroundColor',
    ngWeb.styleSettings.footerSettings.footerBackground.footerMianBackGroundColor,
    data
  );
  data = changeVar(
    palette,
    '@footerMainBottomDividerColor',
    ngWeb.styleSettings.footerSettings.footerBackground.footerMainBottomDividerColor,
    data
  );
  data = changeVar(
    palette,
    '@footerBottomBackgroundColor',
    ngWeb.styleSettings.footerSettings.footerBackground.footerBottomBackgroundColor,
    data
  );
  // Get Footer style
  data = changeVar(
    palette,
    '@footerFontColor',
    ngWeb.styleSettings.footerSettings.footerColor.footerFontColor,
    data
  );
  data = changeVar(
    palette,
    '@footerFontHoverColor',
    ngWeb.styleSettings.footerSettings.footerColor.footerFontHoverColor,
    data
  );
  data = changeVar(
    palette,
    '@footerIconColor',
    ngWeb.styleSettings.footerSettings.footerColor.footerIconColor,
    data
  );
  data = changeVar(
    palette,
    '@footerIconHoverColor',
    ngWeb.styleSettings.footerSettings.footerColor.footerIconHoverColor,
    data
  );
  data = changeVar(
    palette,
    '@footerRoundIconColor',
    ngWeb.styleSettings.footerSettings.footerColor.footerRoundIconColor,
    data
  );
  data = changeVar(
    palette,
    '@footerRoundIconBgColor',
    ngWeb.styleSettings.footerSettings.footerColor.footerRoundIconBgColor,
    data
  );
  data = changeVar(
    palette,
    '@footerRoundIconHoverColor',
    ngWeb.styleSettings.footerSettings.footerColor.footerRoundIconHoverColor,
    data
  );
  data = changeVar(
    palette,
    '@footerRoundIconBgHoverColor',
    ngWeb.styleSettings.footerSettings.footerColor.footerRoundIconBgHoverColor,
    data
  );
  return data;
}

function generateCssFiles(req, ngWeb) {
  // Compile less files and bundle css files
  const cssfiles = [
    `${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}/css/bootstrap.css`,
    `${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}/css/jquery-ui.css`,
    `${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}/css/font-awesome.css`,
    `${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}/css/jquery.selectBoxIt.css`,
    `${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}/css/blueimp-gallery.css`,
    `${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}/css/Common.css`,
    `${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}/css/${ngWeb.templateWebName}.css`
  ];
  gulp.task('compileLess', () =>
    gulp
      .src([
        `${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}/less/Common.less`,
        `${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}/less/${ngWeb.templateWebName}.less`
      ])
      .pipe(less())
      .pipe(gulp.dest(`${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}/css`))
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
      .pipe(gulp.dest(`${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}/css/`))
  );
  gulp.start('bundleCss');
}

/**
 * GET /
 * Modify Next Gen Web page.
 */
exports.getModify = (req, res) => {
  // Get stored ngWebs
  NgWeb.find((err, ngWebsFromDb) => {
    if (err) res.send(err);

    // logger.debug(JSON.stringify(ngWebsFromDb));
    if (req.query.ngWebFromDb) {
      // Get ngWeb from databsae
      NgWeb.findById(req.query.ngWebFromDb, (err, ngWeb) => {
        if (err) res.send(err);
        res.render('modify', {
          title: 'MODIFY',
          ngWeb,
          ngWebFromDbId: req.query.ngWebFromDb,
          companyName: req.query.companyName || ngWeb.templateWebName,
          ngWebsFromDb,
        });
      });
    } else {
      // Get ngWeb from file
      log.debug(JSON.stringify(req.query.companyName, null, 4));
      fs.readdir(rootPath, (err, files) => {
        // console.log(files);
        const templateWebNames = [];
        files.forEach((file) => {
          if (fs.lstatSync(`${rootPath}/${file}`).isDirectory()) {
            templateWebNames.push(file);
          }
        }, this);

        const ngWeb = new NgWeb({
          templateWebNames,
        });

        // Get blob settings
        const packagejson = JSON.parse(
          fs.readFileSync(`${rootPath}/${req.query.companyName || companyName}/package.json`)
        );
        const blobsettingsfilename = packagejson.nextGenConfig.blobsettingsfilename;
        const blobsettings = fs.readFileSync(
          `${rootPath}/${req.query.companyName || companyName}/${blobsettingsfilename}`
        );
        const $blobsettings = cheerio.load(blobsettings, {
          xmlMode: true,
        });

        const blobinfo = {
          blobaddress: $blobsettings('blob').attr('blobaddress'),
          accountname: $blobsettings('blob')
            .attr('blobaddress')
            .replace('https://', '')
            .replace('.blob.core.windows.net/', ''),
          accountkey: $blobsettings('blob').attr('accountkey'),
        };

        // console.log(blobinfo);

        ngWeb.blob.blobAddress = blobinfo.blobaddress;
        ngWeb.blob.blobAccountKey = blobinfo.accountkey;

        fs.readFile(
          `${rootPath}/${req.query.companyName || companyName}/${req.query.companyName ||
            companyName}/less/less/variables.less`,
          'utf8',
          (err, data) => {
            if (err) throw err;

            const palette = lessToJs(data);
            // logger.debug(palette);
            getAllVar(ngWeb, palette);

            res.render('modify', {
              title: 'MODIFY',
              ngWeb,
              companyName: req.query.companyName || companyName,
              ngWebsFromDb,
            });
          }
        );
      });
    }
  });
};

/**
 * POST /
 * Modify Next Gen Web page.
 */
exports.postModify = (req, res) => {
  NgWeb.find((err, ngWebsFromDb) => {
    if (err) res.send(err);
    // Get templateWebNames list
    fs.readdir(rootPath, (err, files) => {
      // console.log(files);
      const templateWebNames = [];
      files.forEach((file) => {
        if (fs.lstatSync(`${rootPath}/${file}`).isDirectory()) {
          templateWebNames.push(file);
        }
      }, this);

      // console.log(req.body);

      // Construct NgWeb object
      const ngWeb = constructNgWebObject(req, templateWebNames);
      // console.log(ngWeb);
      // logger.debug(JSON.stringify(req.body));
      logger.debug(JSON.stringify(ngWeb));

      // Blob
      changeBlobSettings(ngWeb, req);

      // 4 Themes
      fs.readFile(
        `${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}/less/less/variables.less`,
        'utf8',
        (err, data) => {
          if (err) throw err;

          const palette = lessToJs(data);
          data = changeAllVar(data, palette, ngWeb);

          // Write changed data back to variable.less file
          fs.writeFile(
            `${rootPath}/${ngWeb.templateWebName}/${ngWeb.templateWebName}/less/less/variables.less`,
            data,
            'utf8',
            (err) => {
              if (err) return console.log(err);

              generateCssFiles(req, ngWeb);
            }
          );
        }
      );

      res.render('modify', {
        title: 'MODIFY',
        ngWeb,
        companyName: ngWeb.templateWebName || companyName,
        ngWebsFromDb,
      });
    });
  });
};

/**
 * POST /
 * Modify Next Gen Web page.
 */
exports.postModifyStore = (req, res) => {
  // Get templateWebNames list
  fs.readdir(rootPath, (err, files) => {
    console.log('Inside reda file rootPath');
    // console.log(files);
    const templateWebNames = [];
    files.forEach((file) => {
      if (fs.lstatSync(`${rootPath}/${file}`).isDirectory()) {
        templateWebNames.push(file);
      }
    }, this);

    // console.log(req.body);

    // Construct NgWeb object
    const ngWeb = constructNgWebObject(req, templateWebNames);
    // console.log(ngWeb);
    logger.debug(JSON.stringify(req.body));
    console.log(JSON.stringify(ngWeb));
    logger.debug(JSON.stringify(ngWeb));

    ngWeb.save((err) => {
      if (err) res.send(err);
      console.log('Store ngWeb successfully');
      res.json({ message: 'Store ngWeb successfully' });
    });
  });
};
