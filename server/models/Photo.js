const Orm = require('./Orm');

// CREATE TABLE photos (
//     id SERIAL PRIMARY KEY,
//     uri  VARCHAR(255) UNIQUE,
//     is_profile BOOLEAN DEFAULT FALSE,
//     path VARCHAR(255) UNIQUE,
//     user_id SERIAL,
//     CONSTRAINT fk_user
//           FOREIGN KEY(user_id)
//           REFERENCES users(id)
//           ON DELETE CASCADE)
class Photo extends Orm {
  constructor() {
    super('photos', 'id');
  }

  async getPhoto(id) {
    const response = await this.getAllFields(this.table, 'id', id);
    return response.rows[0];
  }

  async getPhotoFromUser(id) {
    const response = await this.getAllFields(this.table, 'user_id', id);
    return response.rows[0];
  }



  async getProfilePhotoFromUser(id) {
    const response = await this.getAllWhere("", 'user_id='+id+' AND is_profile=TRUE')
  return response.rows[0];
}


  createPhoto(photoDict) {
    const columns = Object.keys(photoDict).join(', ');
    const values = Object.values(photoDict).join("', '");
    console.log(`INSERT INTO ${this.table} (${columns}) VALUES ('${values}')`);
    this.insert(columns, values);
  }
}

module.exports = new Photo();
