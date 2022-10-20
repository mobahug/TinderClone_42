const ModelValidator = require('./ModelValidator');

class MessageValidator extends ModelValidator {
  static isChatMessage(req) {
    return { valid: super.isString(req.body.message), reason: '' };
  }

  static isId(req) {
    let reason = '';
    let valid = false;
    if (!req.body.user_id || !req.user.id) {
      reason = 'no id';
      return { valid, reason };
    }

    let valid_user = '';
    let valid_sender = '';
    let reason_user = '';
    let reason_sender = '';
    [valid_user, reason_user] = super.checkNumber(req.body.user_id);
    [valid_sender, reason_sender] = super.checkNumber(req.user.id);

    if (!valid_user || !valid_sender) {
      return { valid: false, reason: 'User_id: ' + reason_user + ' Sender_id: ' + reason_sender };
    }
    return { valid: true, reason: '' };
  }
}

module.exports = MessageValidator;
