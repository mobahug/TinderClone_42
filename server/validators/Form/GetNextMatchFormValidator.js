const FormValidator = require('./FormValidator');
const User = require('../Model/UserValidator');

class GetNextMatchFormValidator extends FormValidator {
  constructor() {
    super('GetNextMatch');
    super.functions = {
      block: User.isPositiveNumber,
      like: User.isPositiveNumber,
      visithistory: User.isPositiveNumber,
      report: User.isPositiveNumber,
    };
  }
}
module.exports = new GetNextMatchFormValidator();
