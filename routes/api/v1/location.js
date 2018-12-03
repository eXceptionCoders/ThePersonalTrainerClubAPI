'use strict';

const express = require('express')
  ,router = express.Router()
  ,jwt = require('../../../lib/jwtAuth')

const mongoose = require('mongoose')

const { check, validationResult } = require('express-validator/check')
const Location = require('../../../models/Location')
const User = require('../../../models/User')

/**
 * POST /
 * Save a location.
 * Query params:
 *  - description: Required. Example: Gimnasio People
 *  - longitude: Required. Example : 40.783451
 *  - latitude: Required. Example: -1.234567
**/
router.post('/add', jwt()
  ,[check('description').isString().isLength({min: 3, max: 1024}).withMessage('DESCRIPTION_NECESSARY')]
  ,[check('longitude').isFloat({min: -180, max: 180}).withMessage('COORDINATES_INVALID')]
  ,[check('latitude').isFloat({min: -90, max: 90}).withMessage('COORDINATES_INVALID')]
  ,async(req, res, next) => {
  try {
    validationResult(req).throw();
    const data = req.body
    const user = req.userId
    const newDataLocation = {
      'user': user,
      'description': data.description,
      'location': {'type': "Point", "coordinates": [data.longitude, data.latitude]}
    }
    const newLocation  = new Location(newDataLocation)
    newLocation.save((errLocation, createLocation ) => {
      if (!errLocation) {
        createLocation.id = new mongoose.Types.ObjectId()
        createLocation.save()
        User.findOneAndUpdate({_id: user}, {$push: {locations: createLocation._id}}).exec(function(errUser, data) {
          if (!errUser && errUser != null) {
            res.ptcResponse()
          } else {
            const error = new Error('LOCATION_ERROR')
            return next(error)
          }
        })
      }
    })
  } catch (err) {
    return next(err);
  }
})

/**
 * POST /
 * Delete a location.
 * Query params:
 * - id: Required. Example: 5bfc1a6440dbed0d99ed5755
**/
router.post('/delete', jwt()
  ,[check('id').isString().withMessage('ID_NECESSARY')]
  ,async (req, res, next) => {
  try {
    validationResult(req).throw();
    Location.findOneAndRemove({_id: req.body.id}, function(errLocation, dataLocation){
      if (!errLocation && errLocation != null) {
        User.findOneAndUpdate({_id: user}, {$pop: {locations: dataLocation._id}}).exec(function(errUser, data) {
          if (!errUser && errUser != null) {
            res.ptcResponse()
          } else {
            const error = new Error('LOCATION_ERROR')
            return next(error)
          }
        })
      } else {
        const error = new Error('ID_NOT_VALID')
        return next(error); 
      }
    })
  } catch (err) {
    return next(err);
  }
})

module.exports = router