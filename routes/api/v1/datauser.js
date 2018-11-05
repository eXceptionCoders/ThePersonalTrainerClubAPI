'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('../../../lib/jwtAuth')
const { check, body, validationResult } = require('express-validator/check');

const User = require('../../../models/User');

router.use(jwt());

router.use('/',(req, res, next) => {
  console.log(req.userId)
  User.findOne({"_id": req.userId}, function(err, findUser){
    if (err) {
      next(err);
      return;
    }
    res.json({
      "name": findUser.name,
      "lastname": findUser.lastname,
      "coach": findUser.coach,
      "thumbnail": findUser.thumbnail
    })
  })
})

module.exports = router