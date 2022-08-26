const Orm = require('./Orm');

class Tag extends Orm {
  constructor() {
    super('tag', 'id');
  }

  async getTag(id) {
    const response = await this.getAllFields(this.table, 'id', id);
    return response.rows[0];
  }

  createTag(tagDict) {
    const columns = Object.keys(tagDict).join(', ');
    const values = Object.values(tagDict).join("', '");
    console.log(`INSERT INTO ${this.table} (${columns}) VALUES ('${values}')`);
    this.insert(columns, values);
  }

  getTopTags() {
    sql =`SELECT tag.name, count(*) as count
    FROM tag
             JOIN usersTag
                  ON tag.id=usersTag.tag_id
             JOIN users
                  ON usersTag.user_id=users.id
    GROUP BY tag.name
    ORDER BY count desc LIMIT 3`
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
  //   getAllTags() {

  //   }
}

module.exports = new Tag();
