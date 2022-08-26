const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const express = require('express');
const User = require('../models/User');
const mailer = require('../util/Mailer');

const router = express.Router();

module.exports = () => {
  router.post('/', async (request, response) => {
    console.log(request.body);
    request.body.activation_code = 'asdasdasd';
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(request.body.password, salt);
    request.body.password = bcryptPassword;
    request.body.activation_code = crypto.randomBytes(20).toString("hex");
    
    const newUser = await User.createUser(request.body);
    mailer(request.body.email, 'Please activate your account!', 'Please activate your account at: http://localhost:3000/users/activate/' + newUser.rows[0].id+'/' + request.body.activation_code)
    console.log(newUser.rows[0].id);
    // const jwtToken = jwtGenerator(newUser.rows[0].id);
    response.status(200).json({
      status: 'success',
      // jwtToken,
    });
  });

  return router;
};
