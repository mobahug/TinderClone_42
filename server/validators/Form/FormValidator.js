class FormValidator {
  constructor(table) {
    this.table = table;
  }

  validate = async (req, res, next) => {
    let results = {};
    let fResult = {};
    results.passed = true;
    //console.log(this.functions);
    for (const [column, func] of Object.entries(this.functions)) {
      fResult = await func(req);
      results[column] = fResult;
      if (fResult.valid == false) {
        results.passed = false;
      }
    }
    // console.log(req.body);
    // console.log(results);
    req.validationResult = results;
    if (req.validationResult.passed == false) {
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

module.exports = FormValidator;
