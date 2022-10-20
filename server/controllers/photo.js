const DIR = './public/';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const Photo = require('../models/Photo');
const Conversation = require('../models/Conversation');
const path = require('path');
const IdValidator = require('../validators/Form/IdValidator');
const verifyToken = require('../middleware/verifyToken');
const Notification = require('../models/Notification');

module.exports = () => {
  router.delete('/:id', IdValidator.validate, verifyToken, async (request, response) => {
    const photo = await Photo.getAllWhere(
      '',
      'num=' + request.params.id + ' AND user_id=' + request.user.id
    );

    // console.log(photo.rows[0]);
    if (photo.rows[0].user_id != request.user.id) {
      response.status(401).json({
        status: 'fail',
      });
      return;
    }
    Photo.delete('id', photo.rows[0].id);
    if (photo.rows[0].path != null) {
      fs.unlink(path.join(DIR, photo.rows[0].path), (err) => {
        if (err) throw err;
      });
    }
    // if (request.file.originalname === '0') {
    const user1 = photo.rows[0].user_id1;
    const user2 = photo.rows[0].user_id2;
    let u = 1;
    if (request.user.id == user1) {
      u = 1;
    } else {
      u = 2;
    }

    Conversation.updatePics('', request.user.id, u);
    Notification.updatePics('', request.user.id);
    // }
    response.status(200).json({
      status: 'success',
    });
  });

  router.get('/:id', verifyToken, IdValidator.validate, errorLogger, async (request, response) => {
    const results = await Photo.getPhotoFromUser(request.params.id);
    response.status(200).json({
      status: 'success',
      data: { photos: results },
    });
  });

  const storage = multer.diskStorage({
    fieldNameSize: 50,
    limits: { fileSize: 1048576 },

    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuidv4() + '-' + fileName);
    },
  });

  // const fileSize = parseInt(req.headers['content-length']);
  // if (fileSize > 1048576) {
  //   return callback(new Error('...'));
  // }

  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg' ||
        file.fileSize < '1048576'
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        // return cb(
        //   new Error('Only .png, .jpg and .jpeg format allowed! Filesize must be under 10MB')
        // );
      }
    },
  });

  router.post('/upload', verifyToken, upload.single('profileImg'), (request, response) => {
    // console.log(request.file);
    try {
      if (request.file.size > 1048576) {
        // console.log('too big file');
        return response.send('Filesize must be under 10MB');
      }
      if (request.file.mimetype !== 'image/jpeg' && request.file.mimetype !== 'image/png') {
        // console.log('wrong file type');
        return response.send('Only .png, .jpg and .jpeg format allowed!');
      }
      const url = `${request.protocol}://${request.get('host')}`;
      response.status(201).json({
        status: 'success',
      });
      const uri = 'http://localhost:3000/public/' + request.file.filename;
      const path = request.file.filename;
      const user_id = request.user.id;
      Conversation.updatePics(uri, user_id);
      Notification.updatePics(uri, user_id);
      // console.log('blaa1');
      Photo.createPhoto({ uri, path, user_id, num: request.file.originalname });
      // console.log('blaa');
    } catch (err) {
      if (err) console.log(`There has been an error: ${err}`);
    }
  });

  return router;
};
