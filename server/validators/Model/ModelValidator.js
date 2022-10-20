class ModelValidator {
  static isPositiveNumber(num) {
    //only process strings
    // console.log(num);
    if (!isNaN(num) && num > -1 && num < 9007199254740991) {
      return true;
    }
    return false;
  }

  static isDate(date) {
    var timestamp = Date.parse(date);
    // console.log(timestamp);
    if (isNaN(timestamp) == false) {
      // const regex = new RegExp(
      //   '^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[13-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$',
      //   ''
      // );
      let regex = /^\d{4}-\d{2}-\d{2}$/gm;

      let valid = regex.test(date);
      if (!valid) {
        regex = /^\d{2}-\d{2}-\d{4}$/gm;
        valid = regex.test(date);
      }

      return valid;
    }

    return false;
  }

  static isString(str) {
    if (typeof str == 'string' && str.length > 0) return true;
    return false;
  }
  // check if choice is part of the choices array
  static isPartOfChoices(req, choice, choices) {
    return choices[choice].includes(req.body[choice]);
  }

  static checkNumber(id) {
    let reason = '';
    let valid = false;
    if (typeof id == 'string') {
      if (!ModelValidator.isPositiveNumber(id)) {
        reason = 'Not a positive number';
      } else {
        valid = true;
      }
    }

    if (typeof id == 'number') {
      if (!ModelValidator.isPositiveNumber(id.toString())) {
        reason = 'Not a positive number';
      } else {
        valid = true;
      }
    }
    return [valid, reason];
  }

  static isEmail(email) {
    if (!ModelValidator.isString(email)) {
      return false;
    }

    if (email.length > 254) {
      return false;
    }

    const emailRegex =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    const valid = emailRegex.test(email);
    if (!valid) {
      return false;
    }

    // Further checking of some things regex can't handle
    const parts = email.split('@');
    if (parts[0].length > 64) {
      return false;
    }

    const domainParts = parts[1].split('.');
    if (domainParts.some((part) => part.length > 63)) {
      return false;
    }
    return true;
  }
}

module.exports = ModelValidator;
