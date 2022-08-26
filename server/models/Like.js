const Conversation = require('./Conversation');
const Notification = require('./Notification');
const User = require('./User');
const Orm = require('./Orm');

class Like extends Orm {
  constructor() {
    super('likes', 'id');
  }

  async getLike(id) {
    const response = await this.getAllFields(this.table, 'id', id);
    return response.rows[0];
  }

  async getLikeFromUser(id) {
    const response = await this.getAllFields(this.table, 'user_id', id);
    return response.rows[0];
  }
  // isMatch(id, id2) {
  //   // const response = await this.get(this.table, 'id', id);
  //   // const response = await this.get(this.table, 'id', id);
  //   // return response.rows[0].username;
  // }

  async createLike(likeDict) {
  
    const columns = Object.keys(likeDict).join(', ');
    const values = Object.values(likeDict).join("', '");
    // if is liked create conversation
    if (await this.getLikeFromUser(likeDict.liker_id) != null) {
      Conversation.createConversation({ user_id1: likeDict.liker_id, user_id2: likeDict.user_id });
      // let message = '{likeDict.liker_id} has liked you!';
      Notification.createNotification({
        category: 'match',
        user_id: likeDict.user_id,
        sender_id: likeDict.liker_id,
      });
      // message = '{likeDict.user_id} has liked you!';
      Notification.createNotification({
        category: 'match',
        user_id: likeDict.liker_id,
        sender_id: likeDict.user_id,
      });
    }
    console.log(`INSERT INTO ${this.table} (${columns}) VALUES ('${values}')`);
    this.insert(columns, values);
    Notification.createNotification({
      category: 'liked',
      user_id: likeDict.user_id,
      sender_id:  likeDict.liker_id ,
    });
    User.addFame(likeDict.user_id, 10)
  }

  async getLikeLiked(liker_id, user_id) {
    const response = await this.getAllFields(this.table, 'id', id);
    return response.rows[0];
  }

    async unLike(likeDict) {
      super.delete("user_id = "+likeDict.user_id+" AND liker_id='"+likeDict.liked_id+"'")

    }
}

module.exports = new Like();
