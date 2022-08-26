const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Block = require('../models/Blocked');
const VisitHistory = require('../models/VisitHistory');
const Like = require('../models/Like');
const mailer = require('../util/Mailer');
const { request, response } = require('express');

const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

module.exports = () => {
  // router.get('/', (request, response) => {
  //   console.log(token.getTokenFrom(request));

  //   User.getUser(5).then((data) => {
  //     response.render('layout', {
  //       pageTitle: 'users',
  //       template: 'users',
  //       users: JSON.stringify(data),
  //     });
  //   });
  // });
  // User.getAll().then((data)) => {
  //   response.status(404).json({
  //     status: "success",
  //     users: JSON.stringify(data)
  //   });



  router.get('/getall', verifyToken, async (request, response) => {
    const results = await User.getAll();
    response.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: { users: results.rows },
    });
  });

  router.post('/visit/', async(request, response) => {
    await VisitHistory.createVisitHistory(request.body);
    response.status(200).json({
      status: 'success'
    });
  });

  router.get('/users/getallfilter', verifyToken, async (request, response) => {
    console.log(request.user.id);
    const results = await User.getAllFilter();
    response.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: { users: results.rows },
    });
  });

  router.get('/get/profile', verifyToken, async (request, response) => {
    console.log(request.user.id);
    const results = await User.getUser(request.user.id);
    response.status(200).json({
      status: 'success',
      data: { users: results },
    });
  });

  router.post('/users/adddetail', verifyToken, async (request, response) => {
    console.log(request.body.id);
    const newPreference = User.update('preference', request.body.preference, 'id', request.user.id);
    const newGender = User.update('gender', request.body.gender, 'id', request.user.id);
    const newLatitude = User.update('latitude', request.body.latitude, 'id', request.user.id);
    const newLongitude = User.update('longitude', request.body.longitude, 'id', request.user.id);

    const newBirthdate = User.update('birthdate', request.body.birthdate, 'id', request.user.id);
    const newBio = User.update('bio', request.body.bio, 'id', request.user.id);

    console.log('HERE');
    console.log(newPreference);
    console.log(newGender);
    console.log(newLatitude);
    console.log(newLongitude);

    console.log(newBirthdate);
    console.log(newBio);

    response.status(200).json({
      status: 'success',
    });
  });

  router.get('/get/:id', async (request, response) => {
    const results = await User.getUser(request.params.id);
    response.status(200).json({
      status: 'success',
      // results: results.rows.length,
      data: {
        users: results,
      },
    });
  });

  router.get('/ip', (request, response) => {
    let now = new Date();
    let nowUnix = +new Date()/1000;
    let ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    console.log(ip)
    //replace with your own database query
    // const serviceLimits = await db.getGeoLimitExpiry();

  });

  router.get('/activate/:id/:activation_key', async (request, response) => {
    try {
      console.log(
        'activating: user' + request.params.id + ' with ' + request.params.activation_key
      );
      User.setActive(request.params.id, request.params.activation_key);
      response.status(201).json({
        status: 'success',
      });
    } catch (err) {
      console.log(err);
    }
  });

  router.get('/requestpw', async (request, response) => {
    try {
      console.log('request pw');
      // User.setActive(request.params.id, request.params.activation_key);
      // username = request.body.username;
      const results = await User.getUserByName(request.params.username);
      mailer(
        request.body.email,
        'Change your password',
        'Change your passwword at: http://localhost:3001/changepw/' +
          results.rows[0].lost_password_code
      );
      response.status(201).json({
        status: 'success',
      });
    } catch (err) {
      console.log(err);
    }
  });

  router.get('/changepw/:id', async (request, response) => {
    try {
      console.log('change pw');
      // User.setActive(request.params.id, request.params.activation_key);
      await User.update('password', request.body.password, 'id', request.body.id);
      response.status(201).json({
        status: 'success',
      });
    } catch (err) {
      console.log(err);
    }
  });

  router.get('/report/:id', (request, response) => {
    console.log('report ');
    console.log(request.params.id);
    try {
      mailer(
        'vilniemi@gmail.com',
        'Report on user ' + request.params.id,
        'User []  has made report on user' + request.params.id
      );
      response.status(201).json({
        status: 'success',
      });
    } catch (err) {
      console.log(err);
    }
  });

  router.get('/block', (request, response) => {
    console.log('block ');
    try {
      Block.createBlock(request.body);
      response.status(201).json({
        status: 'success',
      });
    } catch (err) {
      console.log(err);
    }
  });

  router.post('/like', (request, response) => {
    console.log('like ' +request.body);
    try {
      Like.createLike(request.body);
      response.status(201).json({
        status: 'success',
      });
    } catch (err) {
      console.log(err);
    }
  });

  router.post('/unlike', (request, response) => {
    console.log('unlike ' +request.body);
    try {
      Like.unLike(request.body);
      response.status(201).json({
        status: 'success',
      });
    } catch (err) {
      console.log(err);
    }
  });

  router.get('/tags/:id', async(request, response) => {
    console.log('tags ');
    console.log(request.params.id);
    try {
      const results = await User.getTags(request.params.id);
      console.log(results)
      response.status(200).json({
        status: 'success',
        data: {
          tags: results.rows,
        },
      });
    } catch (err) {
      console.log(err);
    }
  });

  router.get('/nextmatch/:id', async(request, response) => {
    console.log('nextmatch ');
    try {
      const results = await User.getNextMatch(request.params.id);
      response.status(200).json({
        status: 'success',
        data: {
          users: results.rows[0],
        },
      });
    } catch (err) {
      console.log(err);
    }
  });




  return router;
};
