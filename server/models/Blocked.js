const Orm = require('./Orm');

class Blocked extends Orm {
  constructor() {
    super('blocked', 'id');
  }

  async getBlocked(id) {
    const response = await this.getAllFields(this.table, 'id', id);
    return response.rows[0];
  }

  createBlocked(tagDict) {
    const columns = Object.keys(tagDict).join(', ');
    const values = Object.values(tagDict).join("', '");
    console.log(`INSERT INTO ${this.table} (${columns}) VALUES ('${values}')`);
    this.insert(columns, values);
    Notification.createNotification({
      category: 'blocked',
      user_id: likeDict.user_id,
      sender_id:  likeDict.liker_id ,
    });
  }

  getAllBlocked(id) {
    return super.getAllWhere(`userid = ${id}`);
  }
}

module.exports = new Blocked();
