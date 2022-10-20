const express = require('express');
const Filter = require('../models/Filter');
const verifyToken = require('../middleware/verifyToken');
const FilterValidator = require('../validators/Form/FilterFormValidator');
const errorLogger = require('../middleware/errorLogger');
const router = express.Router();

module.exports = () => {
  router.post(
    '/',
    verifyToken,
    FilterValidator.validate,
    errorLogger,
    async (request, response) => {
      request.body.id = request.user.id;
      if (request.validationResult.passed == false) {
        response.status(422).json({
          status: 'fail',
          validation: request.validationResult,
        });
        return;
      }
      const results = await Filter.getFilterMatch(request.body);
      // console.log(results.rows);
      response.status(200).json({
        status: 'success',
        results: results?.rows?.length,
        data: { users: results?.rows },
      });
    }
  );

  return router;
};
