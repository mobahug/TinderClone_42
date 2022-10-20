const Orm = require('./Orm');
const Photo = require('./Photo');
const Notification = require('./Notification');

class VisitHistory extends Orm {
  constructor() {
    super('visitHistory', 'id');
  }

  async createVisitHistory(user_id, sender_id) {
    this.insert({ user_id, visitor_id: sender_id });
    const user2_pic = await Photo.getAllWhere('uri', 'user_id=' + sender_id + ' AND num=0');
    Notification.insert({
      category: 'visit',
      user_id: user_id,
      sender_id: sender_id,
      sender_pic: user2_pic.rows[0].uri,
    });
  }
}

module.exports = new VisitHistory();
