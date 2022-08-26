const pool = require('./db');

class Orm {
  constructor(table, primaryKey) {
    this.table = table;
    this.primaryKey = primaryKey;
  }

  /*     const sql = `SELECT setval(${`*`}, (SELECT MAX (id) FROM ${this.table} WHERE ${whereColumn}='${where}'))`; */

  get(selectColumn, whereColumn, where) {
    const sql = `SELECT ${selectColumn} FROM ${this.table} WHERE ${whereColumn}='${where}'`;
    console.log(sql);
    return new Promise((resolve, reject) => {
      pool.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  getAll() {
    const sql = `SELECT * FROM ${this.table}`;
    console.log(sql);
    return new Promise((resolve, reject) => {
      pool.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  getAllWhere(format, condition) {
    let sql = `SELECT * FROM ${this.table} WHERE ${condition}`;
    if( format.length != 0){
      sql = `SELECT *, ${format} FROM ${this.table} WHERE ${condition}`;
    }
    console.log(sql);
    return new Promise((resolve, reject) => {
      pool.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  getAllFields(table, whereColumn, where) {
    const sql = `SELECT * FROM ${this.table} WHERE ${whereColumn}='${where}'`;
    console.log(sql);
    return new Promise((resolve, reject) => {
      pool.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  insert(columns, values) {
    const sql = `INSERT INTO ${this.table} (${columns}) VALUES ('${values}') returning *`;
    console.log(sql);
    return new Promise((resolve, reject) => {
      pool.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

update(column, value, whereColumn, where) {
    const sql = `UPDATE ${this.table} SET ${column}='${value}' WHERE ${whereColumn}='${where}';`;
    console.log(sql);
    pool.query(sql, (err, res) => {
      console.log(err, res);
    });
  }

  updateWithScript(column, value, whereColumn, where) {
    const sql = `UPDATE ${this.table} SET ${column}=${value} WHERE ${whereColumn}='${where}';`;
    console.log(sql);
    pool.query(sql, (err, res) => {
      console.log(err, res);
    });
  }
  delete(condition) {
    const sql = `DELETE FROM ${this.table} WHERE ${condition}`;
    console.log(sql);
    pool.query(sql, (err, res) => {
      console.log(err, res);
    });
  }

  deleteImage(whereColumn, where) {
    const sql = `DELETE FROM ${this.table} WHERE ${whereColumn}='${where}';`;
    console.log(sql);
    pool.query(sql, (err, res) => {
      console.log(err, res);
    });
  }

  count(column, condition) {
    const sql = `SELECT COUNT(${column})
    FROM ${this.table}
    WHERE ${condition}`;
    console.log(sql);
    return new Promise((resolve, reject) => {
      pool.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  // columnMaker(columnsList) {

  // }
  // valuesMaker(valuesList) {

  // }
}

module.exports = Orm;
