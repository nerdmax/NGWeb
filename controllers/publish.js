const NgWeb = require('../models/Ngweb');
// const symbolsParser = require('less-symbols-parser');
const log = require('pretty-log');

const fs = require('fs');

const sql = require('mssql');

/**
 * GET /
 * New Next Gen Web page.
 */
exports.getPublish = (req, res) => {
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
    server: 'MAX',
    database: 'Vokins_CMS',
    user: 'umbraco',
    password: 'umbraco'
  };

  // function getEmp() {
  //   const conn = new sql.ConnectionPool(dbConfig);
  //   const req = new sql.Request(conn);

  //   conn.connect((err) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     req.query(`
  //     BACKUP DATABASE Vokins_CMS TO DISK = 'C:\\Temp\\Vokins_CMS.BAK'
  //     `, (err, recordset) => {
  //       if (err) {
  //         log.error(err);
  //       } else {
  //         log.debug(recordset);
  //         console.log(recordset);
  //       }
  //       conn.close();
  //     });
  //   });
  // }

  // getEmp();

  function getEmp() {
    const conn = new sql.ConnectionPool(dbConfig);
    const req = new sql.Request(conn);

    conn.connect((err) => {
      if (err) {
        log.error(err);
        return;
      }
      req.query(`

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

//   RESTORE FILELISTONLY FROM DISK='C:\Temp\Vokins_CMS.BAK'
// RESTORE DATABASE testdb FROM DISK = 'C:\Temp\Vokins_CMS.BAK'
// WITH
//    MOVE 'Madsen_CMS_Data' TO 'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\testdb.mdf',
//    MOVE 'Madsen_CMS_Log' TO 'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\testdb_log.ldf'

  res.render('publish', {
    title: 'PUBLISH',
    // ngWeb
  });
};

/**
 * POST /
 * New Next Gen Web page.
 */
exports.postPublish = (req, res) => {

};
