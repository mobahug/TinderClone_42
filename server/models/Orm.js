const pool = require('./db');

class Orm {
  constructor(table, primaryKey) {
    this.table = table;
    this.primaryKey = primaryKey;
  }

  get(selectColumn, whereColumn, where) {
    const sql = `SELECT ${selectColumn} FROM ${this.table} WHERE ${whereColumn}=$1`;
    const values = [where];
    //console.log(sql);
    return new Promise((resolve, reject) => {
      pool.query(sql, values, (err, res) => {
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
    // console.log(sql);
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
    if (format.length != 0) {
      sql = `SELECT *, ${format} FROM ${this.table} WHERE ${condition}`;
    }
    // console.log(sql);
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

  getAllFields(whereColumn, where) {
    const sql = `SELECT * FROM ${this.table} WHERE ${whereColumn}=$1`;
    const values = [where];
    // console.log(sql);
    // console.log('value: ' + where);
    return new Promise((resolve, reject) => {
      pool.query(sql, values, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  parametrizedSqlGenerator(dict) {
    const columns = Object.keys(dict).join(', ');
    const values = Object.values(dict);

    let new_vars = [];
    let i = 1;
    while (i < values.length + 1) {
      new_vars.push('$' + i.toString());
      i++;
    }
    return [columns, values, new_vars];
  }

  insert(dict) {
    const [columns, values, new_vars] = this.parametrizedSqlGenerator(dict);
    const sql = `INSERT INTO ${this.table} (${columns}) VALUES (${new_vars}) returning *`;
    return new Promise((resolve, reject) => {
      pool.query(sql, values, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  update(column, value, whereColumn, where) {
    const sql = `UPDATE ${this.table} SET ${column}='${value}' WHERE ${whereColumn}=$1;`;
    const values = [where];
    // console.log(sql);
    pool.query(sql, values, (err, res) => {
      // console.log(err, res);
    });
  }

  updateAll(dict, where) {
    const [columns, values, new_vars] = this.parametrizedSqlGenerator(dict);
    // console.log(values.length);
    let sql = `UPDATE ${this.table} SET  (${columns}) = (${new_vars}) WHERE id=${where};`;
    if (values.length == 1) {
      sql = `UPDATE ${this.table} SET  ${columns} = ${new_vars} WHERE id=${where};`;
    }

    // console.log(sql);
    pool.query(sql, values, (err, res) => {
      // console.log(err, res);
    });
  }

  delete(column, where) {
    const sql = `DELETE FROM ${this.table} WHERE ${column} = $1`;
    const values = [where];
    //  console.log(sql);
    return new Promise((resolve, reject) => {
      pool.query(sql, values, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  search(column, where) {
    const sql = `SELECT ${column} FROM ${this.table} WHERE ${column} LIKE $1`;
    const values = [where];
    // console.log(sql);
    // console.log(where);
    return new Promise((resolve, reject) => {
      pool.query(sql, values, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  count(column, condition) {
    const sql = `SELECT COUNT(${column})
    FROM ${this.table}
    WHERE ${condition}`;
    // console.log(sql);
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
}

module.exports = Orm;
