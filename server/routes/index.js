const express = require('express');

const loginRoute = require('../controllers/login');
const usersRoute = require('../controllers/users');
const registerRoute = require('../controllers/register');
const photoRoute = require('../controllers/photo');
const tagRoute = require('../controllers/tag');
const notificationRoute = require('../controllers/notifications');
const conversationRoute = require('../controllers/conversations');
const filterRoute = require('../controllers/filter');
const messageRoute = require('../controllers/messages');

const router = express.Router();

module.exports = (params) => {
  router.get('/', (request, response) => {
    response.render('layout', { pageTitle: 'Matcha', template: 'index' });
  });
  router.use('/login', loginRoute(params));
  router.use('/users', usersRoute(params));
  router.use('/filter', filterRoute(params));
  router.use('/register', registerRoute(params));
  router.use('/photo', photoRoute(params));
  router.use('/tag', tagRoute(params));
  router.use('/notifications', notificationRoute(params));
  router.use('/messages', messageRoute(params));
  router.use('/conversations', conversationRoute(params));

  return router;
};
