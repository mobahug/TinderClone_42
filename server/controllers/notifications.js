const DIR = './public/';
const express = require('express');
const Notification = require('../models/Notification');
const jwt = require('jsonwebtoken');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

module.exports = () => {




    router.get('/', verifyToken,  async (request, response) => {
        const results = await Notification.getNotificationFromUser(request.user.id);
        console.log(request.user.id)
        response.status(200).json({
          status: 'success',
          data: { notifications: results },
        });
      });

      router.get('/unread', verifyToken,  async (request, response) => {
        const results = await Notification.getCountUnread(request.user.id);
        console.log("resullts: " +results)
        response.status(200).json({
          status: 'success',
          data: { messages: results.count },
        });
      });

    return router;
};
