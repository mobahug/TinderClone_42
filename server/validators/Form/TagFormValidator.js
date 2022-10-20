const FormValidator = require('./FormValidator');
const TagValidator = require('../Model/TagValidator');

class TagFormValidator extends FormValidator {
  constructor() {
    super('Tag');
    super.functions = {
      tags: TagValidator.isTag,
    };
  }
}
module.exports = new TagFormValidator();
