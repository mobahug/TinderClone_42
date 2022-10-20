const FormValidator = require('./FormValidator');
const Message = require('../Model/MessageValidator');

class ChatFormValidator extends FormValidator {
  constructor() {
    super('Chat');
    super.functions = {
      message: Message.isChatMessage,
    };
  }
}
module.exports = new ChatFormValidator();
