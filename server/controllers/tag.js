const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UsersTag = require('../models/UsersTag');
const verifyToken = require('../middleware/verifyToken');
const errorLogger = require('../middleware/errorLogger');
const router = express.Router();
const IdValidator = require('../validators/Form/IdValidator');
const TagFormValidator = require('../validators/Form/TagFormValidator');

const Tag = require('../models/Tag');

module.exports = () => {
  router.post(
    '/',
    verifyToken,
    TagFormValidator.validate,
    errorLogger,
    async (request, response) => {
      let tags = [...new Set(request.body.tags)];
      tags.forEach(async (element) => {
        let tag = await Tag.getTagName(element);

        // if (element.length > 30) {
        //   response.status(401).json({
        //     status: 'fail',
        //   });
        // }
        if (!tag) {
          tag = await Tag.insert({ name: element });
          UsersTag.insert({ user_id: request.user.id, tag_id: tag.rows[0].id });
        } else {
          let newtag = await UsersTag.getAllWhere(
            'id',
            'tag_id=' + tag.id + ' AND user_id=' + request.user.id
          );
          // console.log(newtag.rows.length);
          if (newtag.rows.length === 0) {
            UsersTag.insert({ user_id: request.user.id, tag_id: tag.id });
          }
        }
      });

      response.status(201).json({
        status: 'success',
      });
    }
  );

  router.delete(
    '/:id',
    verifyToken,
    IdValidator.validate,
    errorLogger,
    async (request, response) => {
      UsersTag.delete('tag_id', request.params.id);
    }
  );

  router.post('/search', verifyToken, async (request, response) => {
    try {
      const results = await Tag.searchTag(request.body.name);
      // console.log(results);
      response.status(200).json({
        status: 'success',
        data: {
          tags: results,
        },
      });
    } catch (err) {
      // console.log(err);
    }
  });

  router.get('/:id', verifyToken, IdValidator.validate, errorLogger, async (request, response) => {
    try {
      const results = await UsersTag.getTags(request.params.id);
      response.status(200).json({
        status: 'success',
        data: {
          tags: results.rows,
        },
      });
    } catch (err) {
      // console.log(err);
    }
  });

  router.post('/userstag', verifyToken, async (request, response) => {
    try {
      const results = await UsersTag.getTags(request.user.id);
      response.status(200).json({
        status: 'success',
        data: {
          tags: results.rows,
        },
      });
    } catch (err) {
      // console.log(err);
    }
  });

  router.post('/toptags', verifyToken, async (request, response) => {
    try {
      const results = await Tag.getTopTags();
      response.status(200).json({
        status: 'success',
        data: {
          tags: results.rows,
        },
      });
    } catch (err) {
      // console.log(err);
    }
  });

  router.post('/all', verifyToken, async (request, response) => {
    try {
      const results = await Tag.getAll();
      response.status(200).json({
        status: 'success',
        data: {
          tags: results.rows,
        },
      });
    } catch (err) {
      // console.log(err);
    }
  });

  return router;
};
