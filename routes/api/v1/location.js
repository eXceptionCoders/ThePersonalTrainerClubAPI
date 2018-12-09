'use strict'

const express = require('express')
  ,router = express.Router()
  ,jwt = require('../../../lib/jwtAuth')

const { check, validationResult } = require('express-validator/check');
const User = require('../../../models/User');

/**
 * POST /
 * Save a location.
 * Query params:
 *  - description: Required. Example: Gimnasio People
 *  - longitude: Required. Example : 40.783451 |-180 to 180|
 *  - latitude: Required. Example: -1.234567 |-90 to 90|
**/
router.post('/add', jwt(), [
  check('description').isString().isLength({min: 3, max: 1024}).withMessage('DESCRIPTION_NECESSARY'),
  check('longitude').isFloat({min: -180, max: 180}).withMessage('COORDINATES_INVALID'),
  check('latitude').isFloat({min: -90, max: 90}).withMessage('COORDINATES_INVALID')
], async(req, res, next) => {
  try {
    validationResult(req).throw();
    
    const data = req.body;
    const newLocation = {
      'type': "Point",
      'description': data.description,
      'coordinates': [ data.longitude, data.latitude ]
    };
    await User.findOneAndUpdate({_id: req.userId}, { $push: { locations: newLocation }});
    res.ptcResponse();
  } catch (err) {
    return next(err);
  }
})

/**
 * POST /
 * Delete a location.
 * Query params:
 *  - description: Required. Example: Gimnasio People
 *  - longitude: Required. Example : 40.783451 |-180 to 180|
 *  - latitude: Required. Example: -1.234567 |-90 to 90|
**/
router.post('/delete', jwt(), [
  check('description').isString().isLength({min: 3, max: 1024}).withMessage('DESCRIPTION_NECESSARY'),
  check('longitude').isFloat({min: -180, max: 180}).withMessage('COORDINATES_INVALID'),
  check('latitude').isFloat({min: -90, max: 90}).withMessage('COORDINATES_INVALID')
], async (req, res, next) => {
  try {
    validationResult(req).throw()
    
    const data = req.body
    const location = {
      'type': "Point",
      'description': data.description,
      'coordinates': [ data.longitude, data.latitude ]
    };

    await User.findByIdAndUpdate(
      { _id: req.userId }, 
      { $pull: { locations: location } }
    );
    res.ptcResponse();
  } catch (err) {
    return next(err);
  }
})

module.exports = router;