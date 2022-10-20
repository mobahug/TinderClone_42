const FormValidator = require('./FormValidator');
const Message = require('../Model/MessageValidator');

class LikeValidator extends FormValidator {
  constructor() {
    super('Likevalidator');
    super.functions = {
      user_id: Message.isId,
      sender_id: Message.isId,
    };
  }
}
module.exports = new LikeValidator();
