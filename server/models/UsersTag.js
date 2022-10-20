const Orm = require('./Orm');
const pool = require('./db');

class UsersTag extends Orm {
  constructor() {
    super('userstag', 'id');
  }

  async getTags(userId) {
    const sql = `SELECT tag.name, tag.id
  FROM tag
      JOIN usersTag
      ON tag.id=usersTag.tag_id
      JOIN users
      ON usersTag.user_id=users.id
  WHERE
      users.id = $1`;
    const values = [userId];

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
}
module.exports = new UsersTag();
