const DIR = './public/';
const express = require('express');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const errorLogger = require('../middleware/errorLogger');
const IdValidator = require('../validators/Form/IdValidator');
const ChatFormValidator = require('../validators/Form/ChatFormValidator');

module.exports = () => {
  /* get conversation messages */
  router.post('/log', verifyToken, IdValidator.validate, errorLogger, async (request, response) => {
    try {
      const results = await Message.getMessages(request.body.id);
      // console.log(results);
      response.status(200).json({
        status: 'success',
        data: {
          log: results.rows,
        },
      });
    } catch (err) {
      // console.log(err);
    }
  });

  /* get one conversation */

  router.post(
    '/room',
    verifyToken,
    IdValidator.validate,
    errorLogger,
    async (request, response) => {
      try {
        const results = await Conversation.getConversationById(request.body.id);
        // console.log(results.rows);
        if (results.rows[0].id1 == request.user.id) {
          response.status(200).json({
            status: 'success',
            data: {
              conversation: {
                match_id: results.rows[0].id2,
                match_username: results.rows[0].u2_name,
                username: results.rows[0].username,
                match_uri: results.rows[0].user1_pic,
                own_uri: results.rows[0].user2_pic,
                conversation_id: results.rows[0].conversation_id,
              },

              user_id: request.user.id,
            },
          });
        } else {
          response.status(200).json({
            status: 'success',
            data: {
              conversation: {
                match_id: results.rows[0].id1,
                match_username: results.rows[0].username,
                username: results.rows[0].u2_name,
                match_uri: results.rows[0].user2_pic,
                own_uri: results.rows[0].user1_pic,
                conversation_id: results.rows[0].conversation_id,
              },

              user_id: request.user.id,
            },
          });
        }
      } catch (err) {
        // console.log(err);
      }
    }
  );

  /* get all conversations */

  router.get('/', verifyToken, async (request, response) => {
    try {
      const results = await Conversation.getConversationsFromUser(request.user.id);
      // console.log(results.rows);
      results.rows.forEach((element) => {
        if (element.id1 == request.user.id) {
          element.match_username = element.username;
          element.match_uri = element.user1_pic;
          element.match_id = element.id2;
        } else {
          element.match_username = element.u2_name;
          element.match_uri = element.user2_pic;
          element.match_id = element.id1;
        }
      });
      response.status(200).json({
        status: 'success',
        data: {
          conversations: results.rows,
        },
      });
    } catch (err) {
      // console.log(err);
    }
  });

  return router;
};

router.post(
  '/',
  verifyToken,
  ChatFormValidator.validate,
  errorLogger,
  async (request, response) => {
    request.body.user_id = request.user.id;
    const conversation = await Conversation.getAllFields('id', request.body.conversation_id);
    if (conversation.rows.length == 0) {
      response.status(401).json({
        status: 'fail',
        reason: 'user closed the conversation',
      });
      return;
    }
    if (
      conversation.rows[0].user_id1 != request.user.id &&
      conversation.rows[0].user_id2 != request.user.id
    ) {
      response.status(401).json({
        status: 'fail',
      });
      return;
    }
    try {
      Conversation.update('last_message', request.body.message, 'id', request.body.conversation_id);
    } catch (err) {
      // console.log(err);
    }
    try {
      const results = await Message.insert(request.body);
      response.status(201).json({
        status: 'success',
        data: { user_id: request.user.id },
      });
    } catch (err) {
      // console.log(err);
    }
  }
);
