const Orm = require('./Orm');
const pool = require('./db');

class Conversation extends Orm {
  constructor() {
    super('conversation', 'id');
  }

  async getConversationsFromUser(userId) {
    // join messages to count unread

    const sql = `SELECT user1_pic, user2_pic, last_message, conversation.id as conversation_id, u.id as id1, u2.id as id2, u.username as u2_name, u2.username FROM conversation JOIN users u on u.id = conversation.user_id1 JOIN users u2 on u2.id = conversation.user_id2 WHERE user_id1='${userId}' OR user_id2='${userId}'`;
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

  async updatePic(num, num2, uri, id) {
    const sql = `UPDATE conversation SET  ${num} = '${uri}' WHERE  ${num2}  ='${id}'`;
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
    // console.log('updating pic');
    // if (u == 1) {
    await this.updatePic('user1_pic', 'user_id2', uri, id);
    // } else {
    await this.updatePic('user2_pic', 'user_id1', uri, id);
    // }
  }

  async deleteConversation(where1, where2) {
    const sql = `DELETE FROM ${this.table} WHERE (user_id1 = $1 AND user_id2= $2) OR (user_id2 = $1 AND user_id1 = $2)`;
    const values = [where1, where2];
    // console.log(values);
    // console.log(sql);
    return new Promise((resolve, reject) => {
      pool.query(sql, values, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
  async deleteConversations(id1, id2) {
    await this.deleteConversations(id1, id2);
  }

  async getConversationById(id) {
    {
      const sql = `SELECT user1_pic, user2_pic, last_message, conversation.id as conversation_id, u.id as id1, u2.id as id2, u.username as username, u2.username as u2_name  FROM conversation JOIN users u on u.id = conversation.user_id1 JOIN users u2 on u2.id = conversation.user_id2 WHERE conversation.id = '${id}'`;
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
  }
}

module.exports = new Conversation();
