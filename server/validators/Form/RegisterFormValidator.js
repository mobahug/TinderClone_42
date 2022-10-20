const FormValidator = require('./FormValidator');
const User = require('../Model/UserValidator');
class RegisterFormValidator extends FormValidator {
  constructor() {
    super('Register');
    super.functions = {
      username: User.isRegisterUsername,
      email: User.isRegisterEmail,
      password: User.isPassword,
      firstname: User.isName,
      lastname: User.isName,
    };
  }
}
module.exports = new RegisterFormValidator();
