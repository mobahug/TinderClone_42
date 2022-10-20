const Conversation = require('./Conversation');
const Notification = require('./Notification');
const Photo = require('./Photo');
const User = require('./User');
const Orm = require('./Orm');

class Like extends Orm {
  constructor() {
    super('likes', 'id');
  }

  async getLikeFromUser(liker_id, user_id) {
    const response = await this.getAllWhere(
      'id',
      'user_id=' + liker_id + ' AND liker_id =' + user_id
    );
    return response.rows[0];
  }

  /*
    Like creates a conversation if user is liked back, fame is added to user after like
    returns TRUE if conversation is created
  */

  async createLike(user_id, sender_id) {
    let match = false;
    const user1_pic = await Photo.getAllWhere('uri', 'user_id=' + user_id + ' AND num=0');
    const user2_pic = await Photo.getAllWhere('uri', 'user_id=' + sender_id + ' AND num=0');
    if (!user1_pic) {
      return;
    }

    if (
      (await this.getAllWhere('id', 'user_id=' + user_id + ' AND liker_id =' + sender_id)).rows
        .length != 0
    ) {
      return;
    }
    if ((await this.getLikeFromUser(sender_id, user_id)) != null) {
      // console.log('asdasdasd');
      // console.log(user1_pic);
      // console.log(user2_pic);
      // console.log('asdasdasd');
      Conversation.insert({
        user_id1: sender_id,
        user_id2: user_id,
        user1_pic: user1_pic.rows[0].uri,
        user2_pic: user2_pic.rows[0].uri,
      });
      Notification.insert({
        category: 'match',
        user_id: user_id,
        sender_id: sender_id,
        sender_pic: user2_pic.rows[0].uri,
      });
      Notification.insert({
        category: 'match',
        user_id: sender_id,
        sender_id: user_id,
        sender_pic: user1_pic.rows[0].uri,
      });
      match = true;
    }

    this.insert({ user_id, liker_id: sender_id });
    Notification.insert({
      category: 'liked',
      user_id: user_id,
      sender_id: sender_id,
      sender_pic: user2_pic.rows[0].uri,
    });
    User.addFame(user_id, 10);
    return match;
  }
  //TODO: need fixing
  async unLike(likeDict) {
    super.delete('user_id = ' + likeDict.user_id + " AND liker_id='" + likeDict.liked_id + "'");
  }
}

module.exports = new Like();
