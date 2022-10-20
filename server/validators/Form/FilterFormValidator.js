const FormValidator = require('./FormValidator');
const Filter = require('../Model/FilterValidator');
const User = require('../Model/UserValidator');
const Tag = require('../Model/TagValidator');

class FilterFormValidator extends FormValidator {
  constructor() {
    super('Filter');
    // console.log(Filter.isLimit());
    super.functions = {
      limit: Filter.isLimit,
      preference: User.isPreference,
      orderby: Filter.isOrderby,
      mindate: Filter.isMindate,
      maxdate: Filter.isMaxdate,
      tags: Tag.isTag,
      maxdistance: Filter.isMaxdistance,
    };
  }
}

module.exports = new FilterFormValidator();
