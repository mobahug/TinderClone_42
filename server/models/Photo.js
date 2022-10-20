const Orm = require('./Orm');

class Photo extends Orm {
  constructor() {
    super('photos', 'id');
  }

  async getPhotoFromUser(id) {
    const response = await this.getAllFields('user_id', id);
    return response.rows;
  }
  async createPhoto(photoDict) {
    this.insert(photoDict);
  }

  async deletePhoto(user, num) {
    const sql = `DELETE FROM ${this.table} WHERE user = $1 AND num = $2`;
    const values = [user, num];
    //  console.log(sql);
    pool.query(sql, values, (err, res) => {
      // console.log(err, res);
    });
  }
}

module.exports = new Photo();
