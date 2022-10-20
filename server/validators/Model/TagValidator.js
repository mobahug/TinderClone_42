const ModelValidator = require('./ModelValidator');

class TagValidator extends ModelValidator {
  static isTag(req) {
    let reason = '';
    // console.log(req.body.tags);
    let valid = true;
    if (!req.body.tags) {
      return { valid, reason };
    }
    if (req.body.tags.length == 0) {
      return { valid, reason };
    }
    if (req.body.tags.length > 100) {
      valid = false;
      reason = 'Too many tags';
      return { valid, reason };
    }
    req.body.tags.forEach((element) => {
      const regex = new RegExp('^[a-zA-Z0-9 ]{3,20}$', 'gm');
      valid = regex.test(element);
      // console.log(element);
      // console.log(valid);
      if (!valid) {
        reason = 'tags are not in right format';
        return { valid, reason };
      }
    });
    return { valid, reason };
  }
}

module.exports = TagValidator;
