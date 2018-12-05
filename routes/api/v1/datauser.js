'use strict';

const express = require('express')
  ,router = express.Router()
  ,jwt = require('../../../lib/jwtAuth');

const { check, body, validationResult } = require('express-validator/check');

const User = require('../../../models/User');
const Sport = require('../../../models/Sport');
const Class = require('../../../models/Class');
const Booking = require('../../../models/Booking');
 
/**
 * GET /
 * Return data user and dataClass of this user.
 * Query params:
**/
router.get('/', jwt()
  ,async (req, res, next) => {
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

/**
 * POST /
 * Change sports of the user.
 * Query params:
 *  - listsport: Required. Example: tenis,futbol
**/
router.post('/sport', jwt(), [
  check('listsports').isString().withMessage('INCORRECT_DATA_LIST_SPORTS'),
], async (req, res, next) => {
  try {
    validationResult(req).throw()

    const arraySport = req.body.listsports.split(',')
    const dataSport = await Sport.find({name: {$in: arraySport}})
    if(dataSport.length == arraySport.length) {
      await dataSport.forEach(async function(data, i){
        dataSport[i] = data._id
      })
      await User.findByIdAndUpdate(req.userId, {sports: dataSport})
      res.ptcResponse()
    } else {
      throw new Error()
    }
  } catch (err) {
    const error = new Error('CAN_NOT_UPDATE_SPORTS')
    return next(error);
  }
});

module.exports = router;