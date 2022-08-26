const Orm = require('./Orm');

class Notification extends Orm {
  constructor() {
    super('notification', 'id');
  }

  async getNotification(id) {
    const response = await this.getAllFields(this.table, 'id', id);
    return response.rows[0];
  }

  async getNotificationFromUser(id) {
    const response = await super.getAllWhere("to_char( creation_date :: DATE, 'yyyy-mm-dd hh:mm') as formatted_date ", "user_id='"+id+"'");
    return response.rows;
  }

  createNotification(notificationDict) {
    const columns = Object.keys(notificationDict).join(', ');
    const values = Object.values(notificationDict).join("', '");
    console.log(`INSERT INTO ${this.table} (${columns}) VALUES ('${values}')`);
    this.insert(columns, values);
  }

async getCountUnread(id) {
  const unread = await super.count('*', `user_id ='${id}' AND is_read=FALSE`)
  return unread.rows[0]
}


}
module.exports = new Notification();
