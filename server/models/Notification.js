const Orm = require('./Orm');
const pool = require('./db');

class Notification extends Orm {
  constructor() {
    super('notification', 'id');
  }

  async getNotificationFromUser(id) {
    const response = await super.getAllWhere(
      "to_char( creation_date, 'DD/MM/YY HH24:MI') as formatted_date ",
      "user_id='" + id + "' ORDER by  creation_date DESC"
    );
    return response.rows;
  }

  async getNotificationFromUserTest(userId) {
    const sql = `
    SELECT
        u.username,
        notification.user_id,
        category,
        TO_CHAR(notification.creation_date, 'DD/MM/YY HH24:MI') as formatted_date
    FROM notification
        JOIN users u on u.id = notification.sender_id
        WHERE notification.user_id='${userId}'
    `;
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

  async updatePics(uri, id) {
    const sql = `UPDATE notification SET  sender_pic = '${uri}' WHERE  sender_id ='${id}'`;
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

  async getCountUnread(id) {
    const unread = await super.count('*', `user_id ='${id}' AND is_read=FALSE`);
    return unread.rows[0];
  }

  setRead(id) {
    this.update('is_read', 'true', 'user_id', id);
  }
}
module.exports = new Notification();
