const ModelValidator = require('./ModelValidator');
const User = require('../../models/User');

class UserValidator extends ModelValidator {
  static isEmail(req) {
    let valid = super.isEmail(req.body.email);
    let reason = '';
    if (!valid) {
      reason = 'Email is wrong format!';
    }
    return { valid, reason };
  }

  static async isRegisterEmail(req) {
    let reason = '';
    let valid = true;
    let user = await User.get('email', 'email', req.body.email);
    if (user.rowCount != 0) {
      reason = 'Email already exists!';
      valid = false;
    } else {
      valid = super.isEmail(req.body.email);
      if (!valid) {
        reason = 'Email is wrong format!';
      }
    }
    return { valid, reason };
  }
  static async isRegisterUsername(req) {
    let reason = '';
    let valid = true;

    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const number = /[0-9]/;
    const specialChars = /[^a-zA-Z\d]/;

    const match_uppercase = uppercase.test(req.body.username);
    const match_lowercase = lowercase.test(req.body.username);
    const match_number = number.test(req.body.username);
    const match_specialChars = specialChars.test(req.body.username);

    let user = await User.get('username', 'username', req.body.username);
    if (user.rowCount != 0) {
      reason = 'Username already exists!';
      valid = false;
    } else {
      valid = super.isString(req.body.username);
      if (!valid) {
        reason = 'empty';
      } else if (req.body.username.length > 20) {
        reason = 'Too long username! Max. 20 character!';
        valid = false;
      } else if (req.body.username.length < 3) {
        reason = 'Too short username! Min. 3 character!';
        valid = false;
      } else if ((match_uppercase || match_lowercase) && !match_number && !match_specialChars) {
        valid = true;
        return { valid, reason };
      } else {
        valid = false;
        reason =
          'Should be between 3 and 20 characters, cant contain numbers or special characters!';
        return { valid, reason };
      }
    }
    return { valid, reason };
  }

  static isUsername(req) {
    let valid = super.isString(req.body.username);
    let reason = '';
    if (!valid) {
      reason = 'empty';
    } else if (req.body.username.length > 99) {
      reason = 'too long';
      valid = false;
    }
    return { valid, reason };
  }

  static isLoginPassword(req) {
    let valid = super.isString(req.body.password);
    let reason = '';
    if (!valid) {
      reason = 'Please add your password!';
    }
    return { valid, reason };
  }

  static isPreference(req) {
    let reason = '';
    let valid = super.isString(req.body.preference);

    if (!valid) {
      reason = 'Please add your preference type!';
    } else {
      const choices = { preference: ['male', 'female', 'both'] };
      valid = super.isPartOfChoices(req, 'preference', choices);
      if (!valid) {
        reason = 'only male, female or both';
      }
    }
    const result = { valid, reason };
    return result;
  }

  static isGender(req) {
    let reason = '';
    let valid = super.isString(req.body.gender);

    if (!valid) {
      reason = 'Please add your gender type!';
    } else {
      const choices = { gender: ['male', 'female'] };
      valid = super.isPartOfChoices(req, 'gender', choices);
      if (!valid) {
        reason = 'only male or female';
      }
    }
    const result = { valid, reason };
    return result;
  }

  static isPassword(req) {
    let password = req.body.password;
    let valid = super.isString(password);
    let reason = '';
    if (!valid) {
      reason = 'Password field is empty!';
    } else {
      const uppercase = /[A-Z]/;
      const lowercase = /[a-z]/;
      const number = /[0-9]/;
      const specialChars = /[^a-zA-Z\d]/;

      const match_uppercase = uppercase.test(password);
      const match_lowercase = lowercase.test(password);
      const match_number = number.test(password);
      const match_specialChars = specialChars.test(password);

      if (
        match_uppercase &&
        match_lowercase &&
        match_number &&
        match_specialChars &&
        password.length > 8 &&
        password.length < 20
      ) {
        valid = true;
      } else {
        valid = false;
        reason =
          'Password should be between 8 - 20 characters, contain upper, lowercase, number and symbol!';
      }
    }
    return { valid, reason };
  }

  static isId(req) {
    let reason = '';
    let valid = false;
    let id = '';
    if (req.params?.id) {
      id = req.params.id;
    } else if (req.body?.id) {
      id = req.body.id;
    } else if (req.body.user_id) {
      id = req.body.user_id;
    } else {
      f;
      reason = 'no id';
      return { valid, reason };
    }

    if (typeof id == 'string') {
      if (!super.isPositiveNumber(id)) {
        reason = 'Not a positive number';
      } else {
        valid = true;
      }
    }

    if (typeof id == 'number') {
      if (!super.isPositiveNumber(id.toString())) {
        reason = 'Not a positive number';
      } else {
        valid = true;
      }
    }
    return { valid, reason };
  }

  static isName(req) {
    let name = '';
    if (req.body?.firstname) {
      name = req.body.firstname;
    } else if (req.body?.lastname) {
      name = req.body.lastname;
    }
    let valid = false;
    let reason = '';
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const number = /[0-9]/;
    const specialChars = /[^a-zA-Z\d]/;
    const match_uppercase = uppercase.test(name);
    const match_lowercase = lowercase.test(name);
    const match_number = number.test(name);
    const match_specialChars = specialChars.test(name);
    if (
      (match_uppercase || match_lowercase) &&
      !match_number &&
      !match_specialChars &&
      name.length < 20
    ) {
      valid = true;
      return { valid, reason };
    }
    reason = 'Should be between 1 and 20 characters, cant contain numbers or special characters!';
    return { valid, reason };
  }

  static isLatitude(req) {
    let reason = '';
    let valid = false;
    if (!req.body.latitude) {
      return { valid, reason };
    }
    let re = new RegExp(
      '^(\\+|-)?(?:90(?:(?:.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:.[0-9]{1,})?))$',
      'g'
    );
    valid = re.test(req.body.latitude);
    if (!valid) {
      reason = 'latitude not in right format';
    }
    return { valid, reason };
  }

  static isLongitude(req) {
    let reason = '';
    let valid = false;
    if (!req.body.longitude) {
      return { valid, reason };
    }
    let re = new RegExp(
      '^(\\+|-)?(?:180(?:(?:.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:.[0-9]{1,})?))$',
      'g'
    );
    valid = re.test(req.body.longitude);
    if (!valid) {
      reason = 'longitude not in right format';
    }
    return { valid, reason };
  }

  static isBirthDate(req) {
    const birthdateSql = req.body.birthdate;
    let reason = '';
    let valid = true;
    valid = super.isDate(req.body.birthdate);
    if (!valid) {
      reason = 'not correct date format';
    }
    if (valid) {
      const birthdatesplit = birthdateSql.split('-');
      const birthdate = new Date(birthdatesplit[2], birthdatesplit[1], birthdatesplit[0]);
      const today = new Date();
      var diff = new Date(today.getTime() - birthdate.getTime());
      if (diff.getUTCFullYear() - 1970 > 16) {
        valid = true;
      } else {
        valid = false;
        reason = 'under age of 16';
      }
    }
    return { valid, reason };
  }
  static async isActive(req) {
    const username = req.body.username;
    const user = await User.get('active', 'username', username);
    const active = user.rows[0].active;
    let reason = '';
    if (!active) {
      reason = 'Your account is not activated!';
    }
    return { valid, reason };
  }

  static isBio(req) {
    let reason = '';
    let valid = false;
    if (!super.isString(req.body.bio)) {
      reason = 'not string';
    } else if (req.body.bio.lenght > 500) {
      reason = 'Your bio is too long!';
    } else {
      valid = true;
    }
    return { valid, reason };
  }
}
module.exports = UserValidator;
