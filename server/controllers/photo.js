const DIR = './public/';
const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const Photo = require('../models/Photo');


const router = express.Router();

const verifyToken = require('../middleware/verifyToken');


module.exports = () => {
  // router.get('/:id', async (request, response) => {
  //   const results = await Photo.getPhotoFromUser(request.params.id);
  //   response.status(200).json({
  //     status: 'success',
  //     // results: results.rows.length,
  //     data: {
  //       photo: results,
  //     },
  //   });
  // });

    router.get('/picture/:id', async (request, response) => {
      const results = await Photo.getAllFields('photo', 'user_id', request.params.id);
      console.log('===================')
      if (results.rows[0].is_profile === false) {
        const updateResult = Photo.update('is_profile', true, 'id', results.rows[0].id)
        console.log(updateResult)
      }
      console.log('===================')
      response.status(200).json({
        status: 'success',
        results: results.rows.length,
        data: { users: results.rows },
      });
    });


    router.get('/deleteImage/:id', verifyToken, async (request, response) => {
      const results = Photo.deleteImage('id', request.params.id);
      response.status(200).json({
        status: 'success',
      });
    });

    // router.get('/chooseprofile/:id', async (request, response) => {
    //   const results = Photo.update('is_profile', request.body.check, 'id', request.params.id);
    //   console.log('=========REQUEST:BODY=========')
    //   console.log(request.user);
    //   console.log('=========REQUEST:BODY=========')

    //   response.status(200).json({
    //     status: 'success',
    //     results: results.rows.length,
    //     data: { users: results.rows },
    //   });

    // });






  // router.post('/', (request, response) => {
  //   console.log(request.query);
  //   try {
  //     Photo.createPhoto(request.query);
  //     response.status(201).json({
  //       status: 'success',
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuidv4() + '-' + fileName);
    },
  });

  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg'
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    },
  });

  router.post('/upload', verifyToken, upload.single('profileImg'), (request, response) => {
    try {
      const url = `${request.protocol}://${request.get('host')}`;
      console.log(url);
      console.log(request.file.filename);
      console.log(request.user.id);

      // console.log(request.body.user_id);
      // console.log(request.body);
      response.status(201).json({
        status: 'success',
      });
      const uri = 'http://localhost:3000/public/' + request.file.filename;
      const path = request.file.filename;
      // eslint-disable-next-line camelcase
      const user_id = request.user.id;
      // eslint-disable-next-line camelcase
      Photo.createPhoto({ uri, path, user_id });
    } catch(err) {
      if (err)
        console.log(`There has been an error: ${err}`)
    }
    // console.log(request.file.filename);
  });
  router.get('/getprofile/:id', async (request, response) => {
    if(request.params?.id) {
    const results = await Photo.getProfilePhotoFromUser(request.params.id);
    response.status(200).json({
      status: 'success',
      // results: results.rows.length,
      data: {
        photo: results,
      },
    });
    }
    else {
      response.status(401).json({
        status: 'fail',
        // results: results.rows.length,
      });
    }

  });

  return router;
};
