const Orm = require('./Orm');
const pool = require('./db');

class User extends Orm {
  constructor() {
    super('users', 'id');
  }

  async getUsername(id) {
    const response = await this.get('username', 'id', id);
    return response.rows[0].username;
  }

  async getUser(id) {
    const sql = `select AGE(users.birthdate) as age, users.id, username, firstname, lastname, email, preference, gender, latitude, longitude, birthdate, bio, p.uri  as photo, t.name as tag from users join userstag u on users.id = u.user_id join tag t on u.tag_id = t.id join photos p on users.id = p.user_id where users.id=$1`;
    const values = [id];
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
  async getUserWithDistance(id, latitude, longitude) {
    const sql = `select 
    (
      earth_distance(
        ll_to_earth(
          cast(latitude AS float), 
          cast(longitude AS float)
        ), 
        ll_to_earth(
          cast(60.1797 AS float), 
          cast(24.9344 AS float)
        )
      )
    ) AS distance, 
    AGE(users.birthdate) as age, 
    TO_CHAR(logged_in, 'DD/MM/YY HH24:MI') AS logged_in_string, 
    users.id, 
    username, 
    firstname, 
    lastname, 
    email, 
    preference, 
    gender, 
    latitude, 
    longitude, 
    birthdate, 
    bio, 
    p.uri as photo, 
    fame
  from 
    users 
    join photos p on users.id = p.user_id 
  where 
    users.id = $1
    AND
    p.num = 0
  group by 
    users.id, 
    p.uri`;
    // console.log(sql);
    const values = [id];
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

  async getUserNoTags(id) {
    const sql = `
    select users.id, username, firstname, lastname, email, preference, gender, latitude, longitude, birthdate, bio, p.uri  as photo from users   join photos p on users.id = p.user_id where users.id=$1`;
    const values = [id];
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

  async getUserByName(username) {
    const sql = `select active, users.id, username, firstname, lastname, email, preference, gender, latitude, longitude, birthdate, bio, p.uri  as photo, t.name as tag from users join userstag u on users.id = u.user_id join tag t on u.tag_id = t.id join photos p on users.id = p.user_id where users.username=$1`;
    const values = [username];
    // console.log(sql);
    // console.log(values);
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

  async setActive(user_id, activation_code) {
    const response = await super.get('activation_code', 'id', user_id);
    if (response.rows[0].activation_code == activation_code) {
      super.update('active', 'true', 'id', user_id);
    }
  }

  updateIpLocation(userId, ip_longitude, ip_latitude) {
    super.updateAll({ ip_longitude, ip_latitude }, userId);
  }
  async addFame(userId, amount) {
    const response = await super.get('fame', 'id', userId);
    const fame = response.rows[0].fame + amount;
    super.update('fame', fame, 'id', userId);
  }

  updateUser(userDict, id) {
    // console.log('updateuser');
    super.updateAll(userDict, id);
  }

  updateLoggedIn(user) {
    const sql = `UPDATE ${this.table} SET logged_in=CURRENT_TIMESTAMP WHERE id=$1;`;
    const values = [user];
    // console.log(sql);
    pool.query(sql, values, (err, res) => {
      //  console.log(err, res);
    });
  }

  async getPassword(id) {
    const password = await super.get('password', 'id', id);
    return password.rows[0].password;
  }
}
module.exports = new User();
