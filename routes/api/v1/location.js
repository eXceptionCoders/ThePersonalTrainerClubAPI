'use strict';

const express = require('express')
  ,router = express.Router()
  ,mongoose = require('mongoose')
  ,jwt = require('../../../lib/jwtAuth')

const { check, validationResult } = require('express-validator/check')
const Location = require('../../../models/Location')
const User = require('../../../models/User')

/**
 * POST /
 * Save a location.
 * Query params:
 *  - description: Required. Example: Gimnasio People
 *  - coordinates: Required. Example: -3.6827461,40.4893538
**/
router.post('/add', jwt()
  ,[check('description').isAlphanumeric().isLength({min: 3, max: 1024}).withMessage('DESCRIPTION_NECESSARY')]
  ,[check('longitude').isFloat({min: -180, max: 180}).withMessage('COORDINATES_INVALID')]
  ,[check('latitude').isFloat({min: -90, max: 90}).withMessage('COORDINATES_INVALID')]
  ,async(req, res, next) => {
  try {
    validationResult(req).throw();
    const data = {}
    data.description = req.body.description
    data.location = {'type': "Point", "coordinates": [req.body.longitude, req.body.latitude]}
    data.user = req.userId
    const newLocation = new Location(data)
    newLocation.save((err, locationSaved) => {
      if (err) {
        return next(err)
      }
      res.ptcResponse()
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
  ,[check('id').isNumeric().withMessage('ID_NECESSARY')]
  ,async (req, res, next) => {
  try {
    console.log ('Estamos', req.body.idLocation)

    Location.findOneAndRemove({_id: req.body.idLocation}, function(err){
      if (!err) {
        res.ptcResponse({"ok": "delete"})
      }      
    })
  } catch (err) {
    return next(err);
  }
})

// TODO Ver que hacemos con esto
router.get('/find', jwt()
  ,async (req, res, next) => {
  try {
    Location.find({location: {$nearSphere: {$geometry: {type: "Point", coordinates: [40.357182, -1.182673]}, $maxDistance: 33000}}})
    .exec(function(err, findUser){
      if (!err) {
        res.ptcDataResponse()
      }
    })   
    //.near({ near: { type: [10, 10]}, spherical: true, distanceField: '1000' }).exec();

  } catch (err) {

  }
})


module.exports = router