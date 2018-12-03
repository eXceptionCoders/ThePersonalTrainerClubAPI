'use strict';

const express = require('express')
  ,router = express.Router()
  ,jwt = require('../../../lib/jwtAuth')
  ,moment = require('moment')

const { check, validationResult } = require('express-validator/check')
const Class = require('../../../models/Class')
const Location = require('../../../models/Location')

/**
 * POST /
 * Save a class.
 * Query params:
 *  - description: Required. Example: Entrenamiento para iniciantes
 *  - sport: Required. Example: Futbol
 *  - duration: Required. Example: 60
 *  - price: Required. Example: 12
 *  - place(id): Required: Example: 5bfd92e8ec9a1509496809455 (id_location)
**/
router.post('/add', jwt(), 
  async (req, res, next) => {
    try {
      const data = req.body
      const location = await Location.findById(data.coordinates).exec()
      data.instructor = req.userId
      data.place = location.description
      data.location = location.location
      const newClass = new Class(data);
      newClass.save((errClass, dataClass ) => {
        if (!errClass) {
          res.ptcResponse()
        }
      })
    } catch (error) {
      const err = new Error('INCORRECT_DATA_CLASS')
      err.status = 401;
      return next(err);
    }
})

/**
 * GET /
 * Save a class.
 * Query params:
 *  - sport: Example: 5bfd92e8ec9a1509496809455 (id_sport)
 *  - instructor: Example: 5bfd92e8ec9a15094968095677 (id_user)
 *  - price: Example: 12
 *  - duration: Example: 60
 *  - longitude: Example: 50.456734
 *  - latitude: Example: -1.345678
 *  - distance: Example: 100
**/
router.get('/find', jwt(), [
  check('sport').optional().isAlphanumeric().withMessage('SPORT_NOT_VALID'),
  check('instructor').optional().isAlphanumeric().withMessage('INTRUCTOR_NOT_VALID'),
  check('price').optional().isInt({min: 0, max: 50}).withMessage('PRICE_RANGE_NOT_VALID'),
  check('duration').optional().isNumeric({min: 30, max: 120}).withMessage('DURATION_RANGE_NOT_VALID'),
  check('longitude').optional().isNumeric({min: -90, max:90}).withMessage('LONGITUDE_NOT_VALID'),
  check('latitude').optional().isNumeric({min: -180, max: 180}).withMessage('LATITUDE_NOT_VALID'),
  check('distance').optional().isInt({min: 0, max: 20000}).withMessage('DISTANCE_NOT_VALID'),
  ],
  async (req, res, next) => {
    try {
      validationResult(req).throw();
      const filters = req.body
      const classes = await Class.list(filters)
      res.ptcDataResponse(classes)  
    } catch (err) {
      return next(err);
    }
})

router.get('/nana', (req, res, next) => {
  moment().format('YYYYMMDD')
  const initialDate = moment('2018-01-01', 'YYYY-MM-DD')
  const endDate = moment('2018-04-30', 'YYYY-MM-DD')
  const interval = 7
  const arrayOfDates = []
  var currentDate = initialDate
  while (moment(currentDate).isBefore(endDate)){
    currentDate.add(interval, 'day')
    console.log (currentDate.year())
  }
  res.ptcDataResponse({'ok':'ok'})  
})

module.exports = router