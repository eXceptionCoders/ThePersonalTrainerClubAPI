'use strict';

const express = require('express')
  ,router = express.Router()
  ,mongoose = require('mongoose')
  ,jwt = require('../../../lib/jwtAuth')

const User = require('../../../models/User')
const Sport = require('../../../models/Sport')
<<<<<<< HEAD
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
=======

router.get('/user', jwt(), (req, res, next) => {
  User.findById(req.userId)
    .populate('sports', '_id name icon category')
    .exec(function(err, findUser){
      if (err) {
        // Tenemos que definir este error por que en principio
        // no se puede producir
        return next(err);
      }
      res.ptcDataResponse({
        "_id": findUser._id,
        "coach": findUser.coach,
        "name": findUser.name,
        "lastname": findUser.lastname,
        "email": findUser.email,
        "gender": findUser.gender,
        "thumbnail": findUser.thumbnail,
        "sports": findUser.sports,
        "locations": findUser.locations
      });
    });
});
>>>>>>> 68e96df68d9cb06c7119b257c3f3a5ff178c12f8

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
<<<<<<< HEAD
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
=======
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
});
>>>>>>> 68e96df68d9cb06c7119b257c3f3a5ff178c12f8

module.exports = router