const Orm = require('./Orm');
const Notification = require('./Notification')

class VisitHistory extends Orm {
  constructor() {
    super('visitHistory', 'id');
  }

  async getVisitHistoryFromUser(id) {
    const response = await this.getAllFields(this.table, 'user_id', id);
    return response.rows[0];
  }

  createVisitHistory(visitHistoryDict) {
    const columns = Object.keys(visitHistoryDict).join(', ');
    const values = Object.values(visitHistoryDict).join("', '");
    console.log(`INSERT INTO ${this.table} (${columns}) VALUES ('${values}')`);
    this.insert(columns, values);
    Notification.createNotification({
      category: 'visit profile',
      user_id: visitHistoryDict.user_id,
      sender_id:  visitHistoryDict.visitor_id ,
    });
  }
}

module.exports = new VisitHistory();
