'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('../../../lib/jwtAuth')
const { check, body, validationResult } = require('express-validator/check');

const User = require('../../../models/User');

router.use(jwt());

router.use('/', (req, res, next) => {
  User.findOne({"_id": req.userId}, function(err, findUser){
    if (err) {
      next(err);
      return;
    }
    res.ptcDataResponse({
      "coach": findUser.coach,
      "name": findUser.name,
      "lastname": findUser.lastname,
      "thumbnail": findUser.thumbnail,
      "sport": findUser.sports,
      "classes": findUser.classes
    })
  })
})

module.exports = router