const NgWeb = require('../models/Ngweb');
const Test = require('../models/testModel');
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

  // log.debug('DLKJLFJ');

  res.render('test', {
    title: 'test',
  });

  // Test.find((err, bears) => {
  //   if (err) res.send(err);

  //   res.json(bears);
  // });
};

/**
 * POST /
 * New Next Gen Web page.
 */
exports.postTest = (req, res) => {
  // logger.debug(req);
  log.debug(JSON.stringify(req.body));

  const test = new Test({
    name: String,
    child: {
      subName: String,
    },
  }); // create a new instance of the Bear model
  test.name = req.body.name; // set the bears name (comes from the request)
  test.child.subName = req.body.subName;

  // save the bear and check for errors
  test.save((err) => {
    if (err) res.send(err);

    res.json({ message: `Test created, NAME: ${test.name}, SUBNAME: ${test.child.subName}` });
  });
};

exports.getTestById = (req, res) => {
  Test.findById(req.params.test_id, (err, test) => {
    if (err) res.send(err);
    res.json(test);
  });
};

exports.updateTestById = (req, res) => {
  Test.findById(req.params.test_id, (err, test) => {
    if (err) res.send(err);

    test.name = req.body.name; // update the bears info

    // save the bear
    test.save((err) => {
      if (err) res.send(err);

      res.json({ message: 'Bear updated!' });
    });
  });
};

exports.deleteTestById = (req, res) => {
  Test.remove(
    {
      _id: req.params.test_id,
    },
    (err, test) => {
      if (err) res.send(err);

      res.json({ message: 'Successfully deleted' });
    }
  );
};
