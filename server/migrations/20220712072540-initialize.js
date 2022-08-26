/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

const fs = require('fs');
const path = require('path');

let Promise;
let dbm;
let type;
let seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
  Promise = options.Promise;
};

exports.up = function(db) {
  const filePath = path.join(__dirname, 'sqls', '20220710132419-initialize-up.sql');
  return new Promise( ( resolve, reject ) => {
    // eslint-disable-next-line consistent-return
    fs.readFile(filePath, {encoding: 'utf-8'}, (err,data)=> {
      if (err) return reject(err);
      console.log(`received data: ${  data}`);

      resolve(data);
    });
  })
  .then((data) => db.runSql(data));
};

exports.down = function(db) {
  const filePath = path.join(__dirname, 'sqls', '20220710132419-initialize-down.sql');
  return new Promise( ( resolve, reject ) => {
    // eslint-disable-next-line consistent-return
    fs.readFile(filePath, {encoding: 'utf-8'}, (err,data)=> {
      if (err) return reject(err);
      console.log(`received data: ${  data}`);

      resolve(data);
    });
  })
  .then((data) => db.runSql(data));
};

// eslint-disable-next-line no-underscore-dangle
exports._meta = {
  "version": 1
};
