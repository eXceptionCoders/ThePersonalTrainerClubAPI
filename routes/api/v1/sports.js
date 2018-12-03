'use strict';

const express = require('express')
  ,router = express.Router()
  ,jwt = require('../../../lib/jwtAuth')

const Sport = require('../../../models/Sport')

/**
 * GET /
 * Return sports.
 * Query params:
**/
router.get('/', jwt()
  ,async (req, res, next) => {
  try {
    Sport.find({})
    //.populate('category')
    .exec(function(errSport, dataSport){
      if (!errSport) {
        res.ptcDataResponse(dataSport)
      }
    })   
  } catch (err) {
    return next(err);
  }
})

module.exports = router