const ModelValidator = require('./ModelValidator');

class FilterValidator extends ModelValidator {
  static isLimit(req) {
    let valid = super.isPositiveNumber(req.body.limit);

    let reason = '';
    if (!valid) reason = 'is not positive number';
    const result = { valid, reason };
    return result;
  }

  static isMaxdistance(req) {
    let valid = super.isPositiveNumber(req.body.maxdistance);
    let reason = '';
    if (!valid) reason = 'is not positive number';
    if (req > 40075000) {
      reason = 'distance is too large';
    }
    const result = { valid, reason };
    return result;
  }

  static isOrderby(req) {
    let reason = '';
    let valid = super.isString(req.body.orderby);

    if (!valid) {
      reason = 'is not a string';
    } else {
      const choices = { orderby: ['age', 'fame', 'distance', 'common tags'] };
      valid = super.isPartOfChoices(req, 'orderby', choices);
      if (!valid) {
        reason = 'is not part of orderby';
      }
    }
    const result = { valid, reason };
    return result;
  }

  static isMindate(req) {
    let reason = '';
    let valid = true;
    if (!super.isDate(req.body.mindate)) {
      reason = 'mindate is not in right format';
      valid = false;
    }
    return { valid, reason };
  }

  static isMaxdate(req) {
    let reason = '';
    let valid = true;
    if (!super.isDate(req.body.maxdate)) {
      reason = 'maxdate is not in right format';
      valid = false;
    }
    return { valid, reason };
  }
}

module.exports = FilterValidator;
