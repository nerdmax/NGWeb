const NgWeb = require('../models/Ngweb');
// const symbolsParser = require('less-symbols-parser');
const log = require('pretty-log');

const fs = require('fs');

const sql = require('mssql');

const log4js = require('log4js');

const logger = log4js.getLogger('test');

/**
 * GET /
 * New Next Gen Web page.
 */
exports.getTest = (req, res) => {
  // async () => {
  //   try {
  //     const pool = await sql.connect('mssql://username:password@localhost/database')
  //     const result = await sql.query `select * from mytable where id = ${value}`
  //     console.dir(result)
  //   } catch (err) {
  //     // ... error checks
  //   }
  // };

  log.debug('DLKJLFJ');

  const dbConfig = {
    server: 'MAX2',
    user: 'admin',
    password: 'admin'
  };

  function getEmp() {
    const conn = new sql.ConnectionPool(dbConfig);
    const req = new sql.Request(conn);

    conn.connect((err) => {
      if (err) {
        log.error(err);
        return;
      }
      // req.query(`
      // BACKUP DATABASE Crown_CMS TO DISK = 'C:\\Temp\\Crown_CMS.BAK'
      // `, (err, recordset) => {
      //   if (err) {
      //     log.error(err);
      //   } else {
      //     log.debug(recordset);
      //     console.log(recordset);
      //   }
      //   conn.close();
      // });

      req.query(`
      USE [master]
      RESTORE DATABASE [TEST_CMS] FROM  DISK = N'C:\\temp\\Crown_CMS.BAK' WITH  FILE = 1,  MOVE N'Crown_CMS_Data' TO N'C:\\Program Files\\Microsoft SQL Server\\MSSQL13.MSSQLSERVER\\MSSQL\\DATA\\TEST_CMS.mdf',  MOVE N'Crown_CMS_Log' TO N'C:\\Program Files\\Microsoft SQL Server\\MSSQL13.MSSQLSERVER\\MSSQL\\DATA\\TEST_CMS.ldf',  NOUNLOAD,  STATS = 5      
      `, (err, recordset) => {
        if (err) {
          log.error(err);
        } else {
          log.debug(recordset);
          console.log(recordset);
        }
        conn.close();
      });
    });
  }

  getEmp();

  res.render('test', {
    // title: 'NewWeb',
    // ngWeb
  });
};

/**
 * POST /
 * New Next Gen Web page.
 */
exports.postTest = (req, res) => {
  logger.debug(req);
  console.log(req.body);
};
