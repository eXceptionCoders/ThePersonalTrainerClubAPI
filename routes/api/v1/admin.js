'use strict';

const express = require('express')
  , router = express.Router()
  , jwt = require('../../../lib/jwtAuth');

const User = require('../../../models/User');

/**
 * GET /
 * Return sports
**/
router.get('/users', jwt()
  , async (req, res, next) => {
    try {
      const dataUser = await User.find({})
      res.ptcDataResponse(dataUser)
    } catch (err) {
      const error = new Error('CAN_NOT_LIST_USERS')
      return next(error);
    }
  })

module.exports = router