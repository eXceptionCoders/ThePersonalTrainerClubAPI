'use strict';

const express = require('express')
  ,router = express.Router()
  ,mongoose = require('mongoose')
  ,jwt = require('../../../lib/jwtAuth')

const User = require('../../../models/User')
const Sport = require('../../../models/Sport')
const Class = require('../../../models/Class')
const Booking = require('../../../models/Booking')
 
/**
 * GET /
 * Return data user and dataClass of this user.
 * Query params:
**/
router.get('/user', jwt()
  ,async (req, res, next) => {
  try {
    const intructorClass = await Class.find({instructor: req.userId})
    .populate('sport', ['name', 'icon'])
    .exec()
    const userClass = await Booking.find({user: req.userId})
    .populate('user')
    .populate('class')
    .exec(function (errUserClass, userClasse){
      userClasse.populate('instructor', 'name')
    })
    User.findById(req.userId)
    .populate('locations', ['location', 'description'])
    .populate('sports')
    //.populate('sports', '_id name icon category')
    .exec(function(err, findUser){
      res.ptcDataResponse({findUser, intructorClass, userClass, })
    })
  } catch (err) {
    return next(err);
  }
})

/**
 * POST /
 * Change sports of the user.
 * Query params:
 *  - listsport: Required. Example: tenis,futbol
**/
router.post('/sport', jwt()
  , async (req, res, next) => {
  try {
    const arraySport = req.body.listsports.split(',')
    Sport.find({name: {$in: arraySport}})
    .exec( function (errData, dataSport) {
    if(!errData && dataSport.length == arraySport.length) {
      const arrayIdSport = dataSport.map((element) => {
        return (new mongoose.Types.ObjectId(element._id))
      })
      User.findByIdAndUpdate(req.userId, {sports: arrayIdSport})
        .exec(function(errUser, dataUser) {
        if (!errUser) {
          res.ptcResponse();
          }
        })
      }
    })
  } catch (err) {
    const error = new Error('INCORRECT_DATA_LIST_SPORTS');
    return next(error);
  }
})

module.exports = router