const FormValidator = require('./FormValidator');
const User = require('../Model/UserValidator');

class IdValidator extends FormValidator {
  constructor() {
    super('Login');
    super.functions = {
      id: User.isId,
    };
  }
}
module.exports = new IdValidator();
