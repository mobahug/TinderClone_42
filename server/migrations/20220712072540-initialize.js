const fs = require('fs');
const path = require('path');

let Promise;
let dbm;
let type;
let seed;

exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
  Promise = options.Promise;
};

exports.up = function (db) {
  const filePath = path.join(__dirname, 'sqls', '20220710132419-initialize-up.sql');
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) return reject(err);
      // console.log(`received data: ${  data}`);

      resolve(data);
    });
  }).then((data) => db.runSql(data));
};

exports.down = function (db) {
  const filePath = path.join(__dirname, 'sqls', '20220710132419-initialize-down.sql');
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) return reject(err);
      // console.log(`received data: ${  data}`);

      resolve(data);
    });
  }).then((data) => db.runSql(data));
};

exports._meta = {
  version: 1,
};
