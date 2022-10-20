const FormValidator = require('./FormValidator');
const User = require('../Model/UserValidator');

class VisitHistoryValidator extends FormValidator {
  constructor() {
    super('VisitHistory');
    super.functions = {
      user_id: User.isId,
    };
  }
}
module.exports = new VisitHistoryValidator();
