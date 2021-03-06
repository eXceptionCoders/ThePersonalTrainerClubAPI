'use strict';

const express = require('express')
  , router = express.Router()
  , jwt = require('../../../lib/jwtAuth');

const User = require('../../../models/User');
const Class = require('../../../models/Class');

/**
 * GET /
 * Return all users
**/
router.get('/users', jwt(), 
async (req, res, next) => {
  try {
    const dataUser = await User.find({})
    res.ptcDataResponse(dataUser)
  } catch (err) {
    const error = new Error('CAN_NOT_LIST_USERS')
    return next(error);
  }
});

/**
* GET /
* Returns all classes
**/
router.get('/classes', jwt(), 
async (req, res, next) => {
  try {
    const dataClasses = await Class.find({})
    res.ptcDataResponse(dataClasses)
  } catch (err) {
    const error = new Error('CAN_NOT_LIST_CLASSES')
    return next(error);
  }
});

module.exports = router