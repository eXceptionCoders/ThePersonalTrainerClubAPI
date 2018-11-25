'use strict';

const express = require('express')
  ,router = express.Router()
  ,mongoose = require('mongoose')
  ,jwt = require('../../../lib/jwtAuth')

const { check, body, validationResult } = require('express-validator/check')
const User = require('../../../models/User')
const Sport = require('../../../models/Sport')

router.get('/user', jwt(), (req, res, next) => {
  User.findById(req.userId)
    .populate('sports', 'name')
    .exec(function(err, findUser){
    if (err) {
      // Tenemos que definir este error por que en principio
      // no se puede producir
      return next(err);
    }
    res.ptcDataResponse({
      "_id": fndUser._id,
      "coach": findUser.coach,
      "name": findUser.name,
      "lastname": fndUser.lastname,
      "email": findUser.email,
      "gender": findUser.gender,
      "thumbnail": findUser.thumbnail,
      "sports": findUser.sports,
      "locations": findUser.locations
    })
  })
})

router.post('/sport', jwt(), (req, res, next) => {
  const arraySport = req.body.listsport.split(',')
  Sport.find({name: {$in: arraySport}})
    .exec( function (errData, dataSport) {
    if(!errData && dataSport.length == arraySport.length) {
      const arrayIdSport = dataSport.map((element) => {
        return (new mongoose.Types.ObjectId(element._id))
      })
      User.findByIdAndUpdate(req.userId, {sports: arrayIdSport})
        .exec(function(err, data) {
        if (err) {
          return next(err);
        }
        res.ptcResponse();
      })
    } else {
      const err = new Error('INCORRECT_DATA_LIST_SPORTS');
      return next(err);
    }
  })
})

module.exports = router