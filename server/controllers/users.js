const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');
const Block = require('../models/Blocked');
const Conversation = require('../models/Conversation');
const VisitHistory = require('../models/VisitHistory');
const Like = require('../models/Like');
const mailer = require('../util/Mailer');
const verifyToken = require('../middleware/verifyToken');
const errorLogger = require('../middleware/errorLogger');
const RequestNewPwFormValidator = require('../validators/Form/RequestNewPwFormValidator');
const ChangePw = require('../validators/Form/ChangePw');
const IdValidator = require('../validators/Form/IdValidator');
const bcrypt = require('bcrypt');
const PatchValidator = require('../validators/Form/PatchValidator');
const VisitHistoryValidator = require('../validators/Form/VisitHistoryValidator');
const LikeValidator = require('../validators/Form/LikeValidator');

module.exports = () => {
  router.post(
    '/visit/',
    verifyToken,
    VisitHistoryValidator.validate,
    errorLogger,
    async (request, response) => {
      await VisitHistory.createVisitHistory(request.body.user_id, request.user.id);
      response.status(201).json({
        status: 'success',
      });
    }
  );

  // add photo and tags to update too?
  router.patch(
    '/',
    verifyToken,
    PatchValidator.validate,
    errorLogger,
    async (request, response) => {
      if (Object.keys(request.body).length !== 0) {
        User.updateUser(request.body, request.user.id);
      }
      response.status(200).json({
        status: 'success',
      });
    }
  );

  router.patch(
    '/password',
    verifyToken,
    PatchValidator.validate,
    errorLogger,
    async (request, response) => {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const encrypted_password = bcrypt.hashSync(String(request.body.password), salt);
      // console.log('=========');
      // console.log(String(request.body.password));
      // console.log('=========');

      User.update('password', encrypted_password, 'id', request.user.id);
      response.status(200).json({
        status: 'success',
      });
    }
  );
  // Dont need validation
  router.get('/profile', verifyToken, async (request, response) => {
    //let results = await User.getUser(request.user.id);
    let results = await User.getUserNoTags(request.user.id);
    // console.log(results);
    if (results.rows.length === 0) {
      results = await User.getAllFields('id', request.user.id);
    }
    // console.log('results');
    // console.log(results.rows[0]);
    // console.log('results');
    response.status(200).json({
      status: 'success',
      // results: results.rows.length,
      data: {
        user: results.rows[0],
      },
    });
  });
  //IdValidator.validate, errorLogger,
  router.post('/get', verifyToken, async (request, response) => {
    const results = await User.getUserWithDistance(
      request.body.id,
      request.body.latitude,
      request.body.longitude
    );
    // console.log(results.rows[0]);
    response.status(200).json({
      status: 'success',
      // results: results.rows.length,
      data: {
        users: results.rows[0],
      },
    });
  });

  router.get(
    '/activate/:id/:activation_key',

    /*   ActivationKeyValidator.validate,
    errorLogger, */

    async (request, response) => {
      // console.log(request.params);
      if (!request.params.id || !request.params.activation_key) {
        return;
      }
      try {
        User.setActive(request.params.id, request.params.activation_key);
        response.status(201).json({
          status: 'success',
        });
      } catch (err) {
        // console.log(err.request);
      }
    }
  );

  router.post(
    '/requestpw',
    RequestNewPwFormValidator.validate,
    errorLogger,
    async (request, response) => {
      try {
        const results = await User.getAllFields('username', request.body.username);
        if (results.rowCount == 0) {
          response.status(401).json({
            status: 'fail',
            reason: 'User not found!',
          });
          return;
        } else if (results.rows[0].email != request.body.email) {
          response.status(401).json({
            status: 'fail',
            reason: 'Email and user not match!',
          });
          return;
        }
        mailer(
          request.body.email,
          'Change your password',
          'Change your passwword at: http://localhost:3001/changepw/ with key:' +
            results.rows[0].lost_password_code
        );
        response.status(201).json({
          status: 'success',
        });
      } catch (err) {
        // console.log(err);
      }
    }
  );

  router.post(
    '/changepw',
    // ChangePw.validate,
    // errorLogger,

    async (request, response) => {
      let user = '';
      const key = request.body.key;
      const username = request.body.username;

      user = await User.getAllWhere(
        '',
        "username='" + username + "' AND " + "lost_password_code='" + key + "'"
      );

      if (user.rows.length == 0) {
        response.status(401).json({
          status: 'fail',
          reason: 'Wrong key or username',
        });
        return;
      }
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(request.body.password, salt);
      request.body.password = bcryptPassword;
      try {
        await User.update('password', request.body.password, 'id', user.rows[0].id);
        response.status(201).json({
          status: 'success',
        });
      } catch (err) {
        // console.log(err);
      }
    }
  );

  router.post('/report', verifyToken, IdValidator.validate, errorLogger, (request, response) => {
    try {
      mailer(
        process.env.ADMIN_MAIL,
        'Report on user ' + request.body.id,
        'User []  has made report on user' + request.body.id
      );
      response.status(201).json({
        status: 'success',
      });
    } catch (err) {
      // console.log(err);
    }
  });

  router.post('/block', verifyToken, LikeValidator.validate, errorLogger, (request, response) => {
    try {
      Block.createBlocked(request.body.user_id, request.user.id);
      Conversation.deleteConversation(request.body.user_id, request.user.id);
      response.status(201).json({
        status: 'success',
      });
    } catch (err) {
      // console.log(err);
    }
  });
  // Removes the likes, conversation and blocks both users so wont show in anymore
  //todo add conversation_id for validation
  router.post('/unlike', verifyToken, IdValidator.validate, (request, response) => {
    try {
      Like.delete('liker_id', request.user.id);
      Like.delete('liker_id', request.body.user_id);
      Conversation.delete('id', request.body.conversation_id);
      Block.createBlocked(request.body.user_id, request.user.id);
      Block.createBlocked(request.user.id, request.body.user_id);
      response.status(201).json({
        status: 'success',
      });
    } catch (err) {
      // console.log(err);
    }
  });

  router.post(
    '/like',
    verifyToken,
    LikeValidator.validate,
    errorLogger,
    async (request, response) => {
      try {
        const match = await Like.createLike(request.body.user_id, request.user.id);
        // console.log('MATCH+++++');
        // console.log(match);
        // console.log('MATCH+++++');
        response.status(201).json({
          status: 'success',
          match,
        });
      } catch (err) {
        // console.log(err);
      }
    }
  );

  function jwtGenerator(username, id, expiresIn) {
    const payload = {
      username,
      id,
    };
    return jwt.sign(payload, process.env.SECRET, { expiresIn });
  }

  router.post(
    '/refresh',
    (handleRefreshToken = async (req, res) => {
      // console.log(req.body);
      if (!req.body?.refresh) return res.sendStatus(401);
      const refreshToken = req.body.refresh;
      // console.log(refreshToken);
      let user = await User.getAllFields('refreshtoken', refreshToken);
      user = user.rows[0];
      // console.log(user);
      if (!user) return res.sendStatus(403); //Forbidden
      // evaluate jwt
      jwt.verify(refreshToken, process.env.SECRET, (err, decoded) => {
        if (err || user.username !== decoded.username) return res.sendStatus(403);

        const jwtToken = jwtGenerator(user.username, user.id, '360d');

        res.json({ jwtToken });
      });
    })
  );

  router.post('/haveliked', verifyToken, IdValidator.validate, async (request, response) => {
    const user_id = request.body.user_id;
    let like = await Like.getAllWhere(
      'id',
      'user_id=' + user_id + ' AND ' + 'liker_id' + '=' + request.user.id
    );
    response.status(201).json({
      status: 'success',
      canlike: like.rows,
    });
  });

  router.post('/haveblocked', verifyToken, IdValidator.validate, async (request, response) => {
    const user_id = request.body.user_id;
    let blocks = await Block.getAllWhere(
      'id',
      'user_id=' + request.user.id + ' AND ' + 'blocked_id' + '=' + user_id
    );
    // console.log(blocks.rows);
    response.status(201).json({
      status: 'success',
      canblock: blocks.rows,
    });
  });

  router.post('/isblock', verifyToken, IdValidator.validate, async (request, response) => {
    let blocks = await Block.getAllWhere(
      'id',
      'user_id=' + request.user.id + ' AND ' + 'blocked_id' + '=' + request.body.user_id
    );
    let canblock = false;
    if (blocks.rows.length != 0) {
      canblock = true;
    }
    response.status(201).json({
      status: 'success',
      canblock,
    });
  });
  return router;
};
