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

  res.render('test', {
    title: 'test',
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
