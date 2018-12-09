'use strict';

const express = require('express')
  ,router = express.Router()
  ,jwt = require('../../../lib/jwtAuth');

const multer = require('multer')
  , inMemoryStorage = multer.memoryStorage()
  , uploadStrategy = multer({ storage: inMemoryStorage }).single('image')
  
  , azureStorage = require('azure-storage')
  , blobService = azureStorage.createBlobService()

  , getStream = require('into-stream');

const User = require('../../../models/User');
const Class = require('../../../models/Class');
const Booking = require('../../../models/Booking');
 
/**
 * GET /
 * Return data user and dataClass of this user.
 * Query params:
**/
router.get('/', jwt(),
async (req, res, next) => {
  try {
    const instructorClass = await Class.find({instructor: req.userId})
      .populate('sport', '_id name icon category')
      .populate('instructor', '_id name lastname thumbnail')
      .exec();

    const userClass = await Booking.find({user: req.userId})
      // .populate('user') not necesary
      .populate({ 
        path: 'class',
        populate: [
          { path: 'sport', select: '_id name icon category' },
          { path: 'instructor', select: '_id name lastname thumbnail' },
        ]
      })
      .exec();

    User.findById(req.userId)
      .populate('sports', '_id name icon category')
      .exec(function(err, findUser) {
        if (err) {
          // Tenemos que definir este error por que en principio
          // no se puede producir
          return next(err);
        }

        res.ptcDataResponse({
          _id: findUser._id,
          coach: findUser.coach,
          name: findUser.name,
          lastname: findUser.lastname,
          email: findUser.email,
          gender: findUser.gender,
          thumbnail: findUser.thumbnail,
          sports: findUser.sports,
          locations: findUser.locations, 
          classes: instructorClass, 
          activeBookings: (userClass || []).map(booking => booking.class)
        });
      });
  } catch (err) {
    return next(err);
  }
});

router.post('/thumbnail', jwt(), uploadStrategy,
async (req, res, next) => {
  const
   blobName = `${req.userId}-${req.file.originalname}`
  ,stream = getStream(req.file.buffer)
  ,streamLength = req.file.buffer.length;

  const containerName = process.env.AZURE_USERS_THUMBNAILS_CONTAINER;

  blobService.createContainerIfNotExists(containerName, {
    publicAccessLevel: 'blob'
  }, function(err, result, response) {
    if (err) {
      next(err);
      return;
    }

    blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, err => {
      if (err) {
        next(err);
        return;
      }

      const thumbnail = process.env.AZURE_CDN + '/' + containerName + '/' + blobName;
      await User.findByIdAndUpdate(req.userId, { thumbnail: thumbnail } );

      res.ptcResponse();
    });
  });
});


module.exports = router;