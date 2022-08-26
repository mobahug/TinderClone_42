const Orm = require('./Orm');

class Message extends Orm {
  constructor() {
    super('messages', 'id');
  }

  async getNotification(id) {
    const response = await this.getAllFields(this.table, 'id', id);
    return response.rows[0];
  }

  async getNotificationFromUser(id) {
    const response = await this.getAllFields(this.table, 'user_id', id);
    return response.rows[0];
  }

  async getMessages(id) {
    const response = await this.getAllFields(this.table, 'conversation_id', id);
    return response.rows;
  }
  createMessage(dict) {
    const columns = Object.keys(dict).join(', ');
    const values = Object.values(dict).join("', '");
    console.log(`INSERT INTO ${this.table} (${columns}) VALUES ('${values}')`);
    this.insert(columns, values);
  }
  getCountUnread(id) {
    super.count('*', `id ='${id}' AND is_read=FALSE`)
  }
}


module.exports = new Message();
