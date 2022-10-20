const FormValidator = require('./FormValidator');
const User = require('../Model/UserValidator');

class LoginFormValidator extends FormValidator {
  constructor() {
    super('Login');
    super.functions = {
      username: User.isUsername,
      password: User.isLoginPassword,
    };
  }
}
module.exports = new LoginFormValidator();
