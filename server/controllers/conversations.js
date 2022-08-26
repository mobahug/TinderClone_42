const DIR = './public/';
const express = require('express');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const jwt = require('jsonwebtoken');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

module.exports = () => {


  router.post('/log', async(request, response) => {
    console.log('log ');
    try {
      console.log(request.body)
      const results = await Message.getMessages(request.body.conversation_id);
      response.status(200).json({
        status: 'success',
        data: {
          log: results,
        },
      });
    } catch (err) {
      console.log(err);
    }
  });

  router.post('/room', async(request, response) => {
    console.log('conversations ');
    try {

      const results = await Conversation.getConversation(request.body.id);
      response.status(200).json({
        status: 'success',
        data: {
          conversation: results.rows[0],
        },
      });
    } catch (err) {
      console.log(err);
    }
  });

  router.post('/', async(request, response) => {
    console.log('conversations ');
    try {
      const results = await Message.createMessage(request.body);
      console.log(results)
      response.status(200).json({
        status: 'success',
      });
    } catch (err) {
      console.log(err);
    }
  });

  return router;
};
