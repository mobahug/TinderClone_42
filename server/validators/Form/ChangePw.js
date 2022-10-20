const FormValidator = require('./FormValidator');
const User = require('../Model/UserValidator');

class ChangePw extends FormValidator {
  constructor() {
    super('ChangePw');
    super.functions = {
      password: User.isPassword,
      passwordVerify: User.isPassword,
    };
  }
}
module.exports = new ChangePw();
