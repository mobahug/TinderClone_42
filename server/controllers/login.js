const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/User');
const UsersTag = require('../models/UsersTag');
const Photo = require('../models/Photo');
const LoginValidator = require('../validators/Form/LoginFormValidator');
const router = express.Router();
require('dotenv').config();

function jwtGenerator(username, id, expiresIn) {
  const payload = {
    username,
    id,
  };
  return jwt.sign(payload, process.env.SECRET, { expiresIn });
}

module.exports = () => {
  router.post('/', LoginValidator.validate, errorLogger, async (req, res) => {
    const { username, password } = req.body;
    try {
      let resp = await User.getUserByName(username);
      let user = resp.rows[0];

      let withoutPicsOrTags = false;
      if (!user) {
        withoutPicsOrTags = true;
        resp = await User.getAllFields('username', username);
      }
      user = resp.rows[0];
      // console.log(user);
      if (!user) {
        // console.log('no user');
        res.status(401).json('Invalid Credentials');
        return;
      }
      const user_pw = await User.getPassword(user.id);
      const validPassword = await bcrypt.compare(password, user_pw);
      if (!validPassword) {
        // console.log('not valid pw');
        res.status(401).json('Invalid Credentials');
        return;
      }
      // console.log(user.active);
      if (!user.active) {
        // console.log('user not active');
        res.status(401).json('User is not active');
        return;
      }
      let tags = '';
      let photos = '';

      if (!withoutPicsOrTags) {
        let results = await UsersTag.getTags(user.id);
        tags = results.rows;
        results = await Photo.getPhotoFromUser(user.id);
        photos = results;
      }

      User.updateIpLocation(user.id, req.body.ipLatitude, req.body.ipLongitude);
      User.updateLoggedIn(user.id);
      const refreshtoken = jwtGenerator(user.username, user.id, '1d');
      User.update('refreshtoken', refreshtoken, 'id', user.id);
      const jwtToken = jwtGenerator(user.username, user.id, '1d');
      res.json({ jwtToken, user, refreshtoken, photos, tags });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  return router;
};
