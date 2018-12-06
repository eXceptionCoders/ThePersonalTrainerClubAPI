'use strict';

const express = require('express')
  ,router = express.Router()
  ,jwt = require('../../../lib/jwtAuth');

const { check, body, validationResult } = require('express-validator/check');
const Sport = require('../../../models/Sport');
const Category =  require('../../../models/Category');

/**
 * GET /
 * Return sports
**/
router.get('/', jwt()
  ,async (req, res, next) => {
  try {
    const dataSport = await Sport.find({})
      //.populate('category')
    res.ptcDataResponse(dataSport)
  } catch (err) {
    const error = new Error ('CAN_NOT_LIST_SPORTS')
    return next(error);
  }
})

/**
 * GET /
 * Return category
**/
router.get('/category', jwt()
  ,async (req, res, next) => {
  try {
    const dataCategory = await Category.find({})
    res.ptcDataResponse(dataCategory)
  } catch (err) {
    const error = new Error ('CAN_NOT_LIST_CATEGORY')
    return next(error);
  }
})

/**
 * POST /
 * Change sports of the user.
 * Query params:
 *  - sports: Required. List of sport identifiers.
**/
router.post('/update', jwt(), [
  check('sports').isArray().withMessage('INCORRECT_DATA_LIST_SPORTS'),
], async (req, res, next) => {
  try {
    validationResult(req).throw()

    const arraySport = req.body.sports
    
    await User.findByIdAndUpdate(req.userId, { sports: arraySport })
    res.ptcResponse()
  } catch (err) {
    const error = new Error('CAN_NOT_UPDATE_SPORTS')
    return next(error);
  }
});

module.exports = router