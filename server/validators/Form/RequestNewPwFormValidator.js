const FormValidator = require('./FormValidator');
const User = require('../Model/UserValidator');

class RequestNewPwFormValidator extends FormValidator {
  constructor() {
    super('RequestNewPw');
    super.functions = {
      email: User.isEmail,
      username: User.isUsername,
    };
  }
}
module.exports = new RequestNewPwFormValidator();
