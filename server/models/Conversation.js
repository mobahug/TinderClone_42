const Orm = require('./Orm');
const pool = require('./db');

class Conversation extends Orm {
  constructor() {
    super('conversation', 'id');
  }

  async getConversation(conversation_id) {
    const sql = `SELECT * FROM ${this.table} WHERE id='${conversation_id}'`;
    console.log(sql);
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

  async getConversationsByUserId(conversation_id) {
    const sql = `SELECT * FROM ${this.table} WHERE user_id1='${userId}' OR user_id2='${userId}'`;
    console.log(sql);
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

  createConversation(conversationDict) {
    const columns = Object.keys(conversationDict).join(', ');
    const values = Object.values(conversationDict).join("', '");
    console.log(`INSERT INTO ${this.table} (${columns}) VALUES ('${values}')`);
    this.insert(columns, values);
  }
}

module.exports = new Conversation();
