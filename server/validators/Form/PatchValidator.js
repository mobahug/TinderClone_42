const FormValidator = require('./FormValidator');
const User = require('../Model/UserValidator');

class PatchValidator extends FormValidator {
  constructor() {
    super('Patch');
    this.validate = this.validate.bind(this);
  }

  createFunctions(req) {
    const functions = {};
    // console.log(req.body);
    if (req.body?.username) {
      functions.username = User.isRegisterUsername;
    }
    if (req?.body?.email) {
      functions.email = User.isRegisterEmail;
    }
    if (req.body?.password) {
      functions.password = User.isPassword;
    }
    if (req.body?.firstname) {
      functions.firstname = User.isName;
    }
    if (req.body?.lastname) {
      functions.lastname = User.isName;
    }

    if (req.body?.preference) {
      functions.preference = User.isPreference;
    }

    if (req.body?.gender) {
      functions.gender = User.isGender;
    }

    if (req.body?.latitude) {
      functions.latitude = User.isLatitude;
    }

    if (req.body?.longitude) {
      functions.longitude = User.isLongitude;
    }

    if (req.body?.birthdate) {
      functions.birthdate = User.isBirthDate;
    }

    if (req.body?.bio) {
      functions.bio = User.isBio;
    }
    this.functions = functions;
  }

  validate = async (req, res, next) => {
    this.createFunctions(req);
    let results = {};
    let fResult = {};
    results.passed = true;
    for (const [column, func] of Object.entries(this.functions)) {
      fResult = await func(req);
      results[column] = fResult;
      if (fResult.valid == false) {
        results.passed = false;
      }
    }
    req.validationResult = results;
    if (req.validationResult.passed == false) {
      // console.log(results);
      // console.log(req.body);
      res.status(400).json({
        status: 'fail',
        validation: req.validationResult,
        results: req.validationResult,
      });
      return;
    }
    next();
  };
}
module.exports = new PatchValidator();
