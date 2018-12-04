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
      const error = new Error('BOOKING_ERROR')
      return next(error)
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

    const placeTrue = await Class.findById(req.body.class)
    if (placeTrue.registered > placeTrue.maxusers) throw new Error()
    await Class.findByIdAndUpdate(req.body.class, {$inc: {registered: 1}})
    req.body.user = req.userId
    const newBooking = await new Booking(req.body)
    await newBooking.save()
    res.ptcResponse()
  } catch (err) {
    const error = new Error ('DO_NOT_CREATE_CLASS')
    return next(error);
  }
});

module.exports = router