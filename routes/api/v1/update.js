'use strict';

const express = require('express')
  ,router = express.Router()
  ,jwt = require('../../../lib/jwtAuth')
  ,mongoose = require ('mongoose')
  ,{ check, body, validationResult, checkSchema } = require('express-validator/check');

const User = require('../../../models/User');

router.post('/sport', jwt(), async (req, res, next) => {
  try {
    const arraySports = JSON.parse(req.body.listsports);
    console.log (arraySports)
    User.findOneAndUpdate({"_id": req.userId}, {sports: arraySports}).exec(function (err, resp) {
      if (err) {
        next(err);
        return (err);
      }
      res.ptcDataResponse();
    })
  } catch (err) {
    err = new Error('INCORRECT_DATA_LIST_SPORTS');
    return next(err);
  }
})

module.exports = router