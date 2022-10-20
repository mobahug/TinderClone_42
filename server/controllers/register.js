const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const express = require('express');
const User = require('../models/User');
const mailer = require('../util/Mailer');
const RegisterValidator = require('../validators/Form/RegisterFormValidator');
const errorLoger = require('../middleware/errorLogger');

const router = express.Router();

module.exports = () => {
  router.post('/', RegisterValidator.validate, errorLoger, async (request, response) => {
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(request.body.password, salt);
    request.body.password = bcryptPassword;
    request.body.activation_code = crypto.randomBytes(20).toString('hex');
    request.body.lost_password_code = crypto.randomBytes(20).toString('hex');

    const newUser = await User.insert(request.body);
    // console.log(newUser)
    mailer(
      request.body.email,
      'Please activate your account!',
      'Please activate your account at: http://localhost:3001/users/activate/' +
        newUser.rows[0].id +
        '/' +
        request.body.activation_code
    );
    response.status(201).json({
      status: 'success',
    });
  });

  return router;
};
