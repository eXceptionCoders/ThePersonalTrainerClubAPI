'use strict';

const express = require('express')
  ,router = express.Router()
  ,jwt = require('../../../lib/jwtAuth');

const { check, query, validationResult } = require('express-validator/check');
const Class = require('../../../models/Class');

/**
 * POST /
 * Save a class.
 * Query params:
 *  - instructor: Required.
 *  - description: Required. Example: Entrenamiento para iniciantes
 *  - sport: Required. Example: 5bfd92e8ec9a1509496809455 (is_sport)
 *  - coordinates: Required: Example: 5bfd92e8ec9a1509496809455 (id_location)
 *  - duration: Required. Example: 60
 *  - price: Required. Example: 12
 *  - maxusers: Required. Example: 10
 *  - dateInitial: Required. Example: 2018-01-20
 *  - dateEnd: Required. Example: 2018-01-30
 *  - interval: REquired: Example: 7 ; |0|1|7|30|
 *  - time: Required: Exmple: 10
 **/
router.post('/add', jwt(), [
  check('instructor').isString().withMessage('INSTRUCTOR_IS_NECESSARY'),
  check('description').isString().withMessage('DESCRIPTION_IS_NECESSARY'),
  check('sport').isString().withMessage('SPORT_IS_NECESSARY'),
  // check('coordinates').isString().withMessage('LOCATION_IS_NECESSARY'),
  check('location').isString().withMessage('LOCATION_IS_NECESSARY'),
  check('duration').isNumeric({min: 30, max: 120}).withMessage('DURATION_RANGE_NOT_VALID'),
  check('price').isNumeric({min: 0, max: 50}).withMessage('PRICE_RANGE_NOT_VALID'),
  check('maxusers').isNumeric({min: 1, max: 50}).withMessage('MAXUSERS_RANGE_NOT_VALID'),
  // check('dateInitial').isISO8601('YYYY-MM-DD').withMessage('DATA_NOT_VALID'),
  // check('dateEnd').isISO8601('YYYY-MM-DD').withMessage('DATA_NOT_VALID'),
  // check('interval').isNumeric({min: 1, max: 31}).withMessage('TIME_RANGE_NOT_VALID'),
  // check('time').isNumeric({min: 6, max: 24}).withMessage('TIME_RANGE_NOT_VALID')
], async (req, res, next) => {
    try {
      const data = req.body
      // const location = await Location.findById(data.coordinates).exec()
      // data.instructor = req.userId
      // data.location = location.location
      data.place = data.location.description;
      delete data.location.description;
      const newClass = new Class(data);
      newClass.save((errClass, dataClass ) => {
        if (!errClass) {
          res.ptcResponse();
        }
      });
    } catch (error) {
      const err = new Error('INCORRECT_DATA_CLASS')
      err.status = 401;
      return next(err);
    }
    /*
    try {
      validationResult(req).throw()
      
      const data = req.body
      const arrayDateValid = await calculateValidDates(data.dateInitial, data.dateEnd, data.interval)
      const location = await Location.findById(data.coordinates)
      data.place = location.description
      data.location = location.location
      await Sport.findById(data.sport)
      data.instructor = req.userId
      await arrayDateValid.forEach(async function(currentData, i){
        data.date = currentData
        const newClass = new Class(data);
        await newClass.save()
      })
      res.ptcResponse()
    } catch (err) {
      const error = new Error('INCORRECT_DATA_CLASS')
      return next(error);
    }
    */
});

/**
 * GET /
 * Find class.
 * Query params:
 *  - sport: Example: 5bfd92e8ec9a1509496809455 (id_sport)
 *  - longitude: Example: 50.456734
 *  - latitude: Example: -1.345678
 *  - distance: Example: 100
 *  - timetable: Example: 2 |0 (6:00-12:00)|1 (12:00-16:00)|2 (16:00-20:00)|3 (20:00-24:00)|
 *  - date: Example: 2 |0 hoy|1 mañana|2 semana|3 mes|
 *  - price: Example: 0-50 | 10- | -50 | 50
**/
router.get('/find', jwt(), [
  query('sport').optional().isString().withMessage('SPORT_NOT_VALID'),
  query('longitude').optional().isNumeric({min: -90, max: 90}).withMessage('LONGITUDE_NOT_VALID'),
  query('latitude').optional().isNumeric({min: -180, max: 180}).withMessage('LATITUDE_NOT_VALID'),
  query('distance').optional().isInt({min: 0, max: 20000}).withMessage('DISTANCE_NOT_VALID'),
  query('timetable').optional().isInt({min: 0, max: 3}).withMessage('TIMETABLE_NOT_VALID'),
  query('date').optional().isString().withMessage('DATE_NOT_VALID'),
  query('price').optional().isInt({min: 0, max: 50}).withMessage('PRICE_RANGE_NOT_VALID'),
  query('page').isInt({ min: 0 }).withMessage('PAGE_MUST_BE_NUMERIC'),
  query('per_page').optional().isInt({ min: 1 }).withMessage('PER_PAGE_MUST_BE_NUMERIC')
], async (req, res, next) => {
    try {
      validationResult(req).throw();

      const filter = {
        sport: req.query.sport,
        longitude: req.query.longitude,
        latitude: req.query.latitude,
        distance: req.query.distance,
        timetable: req.query.timetable,
        date: req.query.date,
        price: req.query.price
      };

      const page = parseInt( req.query.page ) || 0;
      const per_page = parseInt( req.query.per_page ) || 10;
      
      const sort = req.query.sort || 'date';

      const result = await Class.list(filter, page, per_page, sort);
      res.ptcPaginatedResponse( result.rows, result.total );
    } catch (err) {
      return next(err);
    }
});

module.exports = router