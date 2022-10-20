const Orm = require('./Orm');
const Photo = require('./Photo');
const Notification = require('./Notification');

class Blocked extends Orm {
  constructor() {
    super('blocked', 'id');
  }

  async createBlocked(user_id, sender_id) {
    if (
      (await this.getAllWhere('id', 'user_id=' + sender_id + ' AND blocked_id =' + user_id)).rows
        .length != 0
    ) {
      return;
    }

    this.insert({ user_id: sender_id, blocked_id: user_id });
  }
}

module.exports = new Blocked();
