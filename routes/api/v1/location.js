'use strict'

const express = require('express')
  ,router = express.Router()
  ,jwt = require('../../../lib/jwtAuth')

const { check, validationResult } = require('express-validator/check');
const Location = require('../../../models/Location');
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
    
    const data = req.body
    const newDataLocation = {
      'user': req.userId,
      'description': data.description,
      'location': {'type': "Point", "coordinates": [data.longitude, data.latitude]}
    }
    const newLocation = await new Location(newDataLocation)
    const createLocation = await newLocation.save()
    await User.findOneAndUpdate({_id: req.userId}, {$push: {locations: createLocation._id}})
    res.ptcResponse()
  } catch (err) {
    const error = new Error('LOCATION_ERROR_CREATE')
    return next(error);
  }
})

/**
 * POST /
 * Delete a location.
 * Query params:
 * - id: Required. Example: 5bfc1a6440dbed0d99ed5755 (id_location)
**/
router.post('/delete', jwt(), [
  check('id').isString().withMessage('ID_NECESSARY')
], async (req, res, next) => {
  try {
    validationResult(req).throw()
    
    const data = req.body
    const dataLocation = await Location.findOneAndRemove({_id: data.id})  
    await User.findByIdAndUpdate({_id: req.userId}, {$pull: {locations: dataLocation._id}})
    res.ptcResponse()
  } catch (err) {
    const error = new Error('LOCATION_ERROR_DELETE')
    return next(error);
  }
})

module.exports = router;