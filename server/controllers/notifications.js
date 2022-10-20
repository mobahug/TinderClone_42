const DIR = './public/';
const express = require('express');
const Notification = require('../models/Notification');
const jwt = require('jsonwebtoken');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

// Don't neeed validation
module.exports = () => {
  router.get('/', verifyToken, async (request, response) => {
    const results = await Notification.getNotificationFromUser(request.user.id);
    // console.log(results);
    response.status(200).json({
      status: 'success',
      data: { notifications: results },
    });
  });

  router.get('/unread', verifyToken, async (request, response) => {
    const results = await Notification.getCountUnread(request.user.id);
    //console.log(results);
    response.status(200).json({
      status: 'success',
      data: { notifications: results.count },
    });
  });

  router.post('/setread', verifyToken, async (request, response) => {
    const results = await Notification.setRead(request.user.id);
    // console.log('resullts: ' + results);
    response.status(201).json({
      status: 'success',
    });
  });

  router.post('/clear', verifyToken, async (request, response) => {
    const results = await Notification.delete('user_id', request.user.id);
    // console.log('resullts: ' + results);
    response.status(201).json({
      status: 'success',
      data: results,
    });
  });
  return router;
};
