const pool = require('./db');
const Orm = require('./Orm');

class Message extends Orm {
  constructor() {
    super('messages', 'id');
  }

  getMessages(id) {
    const sql =
      "SELECT *, TO_CHAR(messages.creation_date, 'HH24:MI') as time   FROM messages FULL JOIN users on messages.user_id=users.id WHERE conversation_id= '" +
      id +
      "' ORDER BY messages.creation_date ASC";
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
    const sql =
      `select count(*) from messages JOIN conversation on messages.conversation_id=conversation.id WHERE( user_id1 = ` +
      id +
      ` or user_id2 = ` +
      id +
      ` )AND NOT user_id = ` +
      id +
      ` AND messages.is_read = false`;
    // console.log(sql);
    // pool.query(sql, (err, res) => {
    //   console.log('--errored--');
    //   console.log(err, res);
    //   console.log('--errored--');
    // });

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

  setRead(id, user_id) {
    const sql = `UPDATE ${this.table} SET is_read='true' WHERE conversation_id=$1 AND NOT user_id=$2`;

    const values = [id, user_id];
    // console.log(sql);
    pool.query(sql, values, (err, res) => {
      // console.log(err, res);
    });
  }
}

module.exports = new Message();
