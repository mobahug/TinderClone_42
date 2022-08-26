const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/User');
const geoip = require('geoip-lite');

// const validInfo = require('../middleware/validInfo');

const router = express.Router();

function jwtGenerator(username, id) {
  const payload = {
    username,
    id,
  };

  return jwt.sign(payload, 'secretsauce', { expiresIn: '1h' });
}

// eslint-disable-next-line no-unused-vars
module.exports = (params) => {
  // router.post('/', async (request, response) => {
  //   const { username, password } = request.body;

  //   const user = await User.getUserByName(username);
  //   if (!user) return false;
  //   if (!username) return false;
  //   if (!password) return false;
  //   const pw = '$2b$10$hCCI81evzr1Bk2sgviOZ0.FVhlE6PQM1PKVvlmSwQgpRPonj3UC02';
  //   // if (!user.password) return false;
  //   // const passwordCorrect = user === null ? false : await bcrypt.compare(password, pw);

  //   const passwordCorrect = await bcrypt.compare(password, pw);

  //   // const passwordCorrect = await Password.verifyPassword(password, user.password);
  //   console.log(passwordCorrect);
  //   if (!(user && passwordCorrect)) {
  //     return response.status(401).json({
  //       error: 'invalid username or password',
  //     });
  //   }

  //   const userForToken = {
  //     username: user.username,
  //     id: user.id,
  //   };
  //   const token = jwt.sign(userForToken, 'adsadaq24');

  //   response.status(200).send({ token, username: user.username, id: user.id });

  //   return true;
  // });

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data);
    setIP(res.data.IPv4)
  }



  router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.getUserByName(username);
      if (!user) {
        res.status(401).json('Invalid Credential');
      }
     User.updateIpLocation(user.id, req.body.ipLatitude, req.body.ipLongitude);
     User.updateLoggedIn(user.id)

      const validPassword = await bcrypt.compare(password, user.password);
      console.log(validPassword);
      if (!validPassword) {
        res.status(401).json('Invalid Credential');
      }
      // if (!user.active) {
      //   res.status(401).json('User is not active');
      // }

      const jwtToken = jwtGenerator(user.username, user.id);
      res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      // res.status(500).send('Server error');
    }
  });

  return router;
};
