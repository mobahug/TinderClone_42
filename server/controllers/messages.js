const DIR = './public/';
const express = require('express');
const Message = require('../models/Message');
const jwt = require('jsonwebtoken');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const errorLogger = require('../middleware/errorLogger');
const IdValidator = require('../validators/Form/IdValidator');

module.exports = () => {
  // Don't need validation
  router.post('/unread', verifyToken, async (request, response) => {
    const results = await Message.getCountUnread(request.user.id);
    // console.log('results: ' + results);
    response.status(200).json({
      status: 'success',
      data: { messages: results.rows[0].count },
    });
  });

  router.post(
    '/unread_conversation',
    verifyToken,
    IdValidator.validate,
    errorLogger,
    async (request, response) => {
      const results = await Message.getCountUnread(request.user.id, request.body.id);
      // console.log('results: ' + results);
      response.status(200).json({
        status: 'success',
        data: { messages: results.rows[0].count },
      });
    }
  );

  router.post(
    '/setread',
    verifyToken,
    IdValidator.validate,
    errorLogger,
    async (request, response) => {
      const results = Message.setRead(request.body.id, request.user.id);
      // console.log('resullts: ' + results);
      response.status(201).json({
        status: 'success',
      });
    }
  );

  return router;
};
