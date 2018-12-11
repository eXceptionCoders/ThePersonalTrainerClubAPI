'use strict';

const express = require('express')
  ,router = express.Router()
  ,jwt = require('../../../lib/jwtAuth');

const { check, validationResult } = require('express-validator/check')
const Class = require('../../../models/Class')
const Booking = require('../../../models/Booking')

/**
 * GET /
 * Find booking for a user
**/
router.get('/find', jwt(),
async (req, res, next) => {
  try {
    const dataBooking = await Booking.find({user: req.userId})
      .populate('class')
      .populate('user')
    res.ptcDataResponse(dataBooking)  
  } catch (err) {
    return next(err)
  }
});

/**
 * POST /
 * Save a booking.
 * Query params:
 *  - class: Example: 5bfd92e8ec9a1509496809455 (id_class)
**/
router.post('/check', jwt(), [
  check('class').isAlphanumeric().withMessage('CLASS_NECESSARY'),
], async (req, res, next) => {
  try {
    validationResult(req).throw();

    // TODO
    // const placeTrue = await Class.findById(req.body.class)
    //if (placeTrue.registered > placeTrue.maxusers) { 
    //  throw new Error();
    //}

    const booking = {
      class: req.body.class,
      user: req.userId
    };

    await Class.findOneAndUpdate({ _id: booking.class }, { $inc: { registered: 1 }});
    const newBooking = new Booking(booking);
    newBooking.save((err) => {
      if (err) {
        next(err);
        return;
      }
      
      res.ptcResponse();
    });
  } catch (err) {
    return next(err);
  }
});

/**
 * Delete /
 * Return class
**/
router.delete('/:id', jwt(),
async (req, res, next) => {
  try {

    Booking.deleteMany({ class: req.params.id }, function (err) {
      if (err) {
        next(err);
        return;
      }

      res.ptcResponse();
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router