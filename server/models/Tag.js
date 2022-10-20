const Orm = require('./Orm');
const pool = require('./db');
class Tag extends Orm {
  constructor() {
    super('tag', 'id');
  }

  async getTagName(name) {
    const response = await this.getAllFields('name', name);
    return response.rows[0];
  }
  async searchTag(name) {
    const response = await this.search('name', name + '%');
    return response.rows[0];
  }

  async getTopTags() {
    const sql = `SELECT tag.name, count(*) as count
    FROM tag
             JOIN usersTag
                  ON tag.id=usersTag.tag_id
             JOIN users
                  ON usersTag.user_id=users.id
    GROUP BY tag.name
    ORDER BY count desc LIMIT 5`;
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

module.exports = new Tag();
