'use strict';

const express = require('express')
  ,router = express.Router()
  ,mongoose = require('mongoose')
  ,jwt = require('../../../lib/jwtAuth')

const { check, query, validationResult } = require('express-validator/check')
const Class = require('../../../models/Class')
const Sport = require('../../../models/Sport')
const Location = require('../../../models/Location')

router.post('/add', jwt(), (req, res, next) => {
  const data = req.body
  const sport = {name: req.body.sport}
  Sport.findOne(sport, function (errSport, dataSport) {
    if (!errSport && dataSport != null) {
      data.sport = new mongoose.Types.ObjectId(dataSport._id)
      data.instructor = new mongoose.Types.ObjectId(req.userId)
      const newClass = new Class(data)
      newClass.save((err, classSaved ) => {
        if (err) {
          return next(err);
        }
        res.ptcResponse();
      });
    } else {
      const err = new Error('INCORRECT_DATA_SPORTS');
      err.status = 401;
      return next(err);
    }
  })
})

router.get('/find', jwt(),
  [
  // TODO realizar expresiones regulares para las validaciones en matches()
  query('sport').optional().matches().withMessage('SPORT_NOT_VALID'),
  query('price').optional().matches().withMessage('PRICE_RANGE_NOT_VALID'),
  query('duration').optional().matches().withMessage('DURATION_RANGE_NOT_VALID'),
  query('longitude').optional().matches().withMessage('LONGITUDE_NOT_VALID'),
  query('latitude').optional().matches().withMessage('LATITUDE_NOT_VALID'),
  query('distance').optional().matches().withMessage('DISTANCE_NOT_VALID'),
  ],
  async (req, res, next) => {
  try {
    validationResult(req).throw();
    const filters = req.body
    //filters.idPlace = [] //['5bfbfc9e8a31150c2e44f82a']
    //filters.idPlace = ['5bfbfc9e8a31150c2e44f828']
    filters.idPlace = ['5bfbfc9e8a31150c2e44f82a', '5bfbfc9e8a31150c2e44f828']
    if (filters.longitude && filters.latitude && filters.distance) {
      await Location.find({
        location: {$nearSphere:
          {$geometry:
            {type: "Point"
            ,coordinates: [filters.longitude, filters.latitude]}
            ,$maxDistance: filters.distance
            }
          }
      })
      .exec( function (errFindLocation, dataFindLocation) {
        if (!errFindLocation) {
          dataFindLocation.map((element, i) => {
            filters.idPlace[i] = element._id
          })
        }
      }) 
    }
    const classes = await Class.list(filters)
    res.ptcDataResponse(classes)  
  } catch (err) {
    return next(err);
  }
})
    //const e = await User.find({$text: {$search: "Manuel Rodriguez Soriano"}}).exec(function(err, doc) {
    //  console.log (doc, err)
    //})
  

    //const e = await User.findUser(req.body.instructor)

    
    //validationResult(req).throw();

    //const page = parseInt( req.query.page );
    //const per_page = parseInt( req.query.per_page );
    
    //const sort = req.query.sort;
    //const fields = req.query.fields;
  
    //const result = await Class.find();
  
    //const result = await Class.list(req.body)

    //res.ptcPaginatedResponse( result.rows, result.total );
    //res.ptcPaginatedResponse( e );



/**
 * GET /
 * Returns class list.
 * Query params:
 *  - location: Required. Example: location=-3.6827461;40.4893538
 *  - page: Required. Musts be 0 or greater.
 *  - for_sale: Optional. Example: for_sale=false | for_sale=true
 *  - price: Optional. Example: price=0-50 | price=10- | price=-50 | price=50
 *  - name: Optional.
 *  - per_page: Optional. Musts be 1 or greater.
 */
/*
router.get('/', [
  query('for_sale').optional().isBoolean().withMessage('FOR_SALE_MUST_BE_BOOLEAN'),
  query('price').optional().matches(/^(\d+(\.\d+)?|-\d+(\.\d+)?|\d+(\.\d+)?-|\d+(\.\d+)?-\d+(\.\d+)?)$/).withMessage('PRICE_RANGE_NOT_VALID'),
  query('page').isInt({ min: 0 }).withMessage('PAGE_MUST_BE_NUMERIC'),
  query('per_page').optional().isInt({ min: 1 }).withMessage('PER_PAGE_MUST_BE_NUMERIC')
], async (req, res, next) => {
  try {
    validationResult(req).throw();

    const filter = {
      location: req.query.location,
      name: req.query.name,
      tags: req.query.tags,
      forSale: req.query.for_sale,
      price: req.query.price
    };
    
    const page = parseInt( req.query.page );
    const per_page = parseInt( req.query.per_page );
    
    const sort = req.query.sort;
    const fields = req.query.fields;

    const result = await Class.list(filter, page, per_page, sort, fields);

    res.ptcPaginatedResponse( result.rows, result.total );
  } catch (err) {
      next(err);
  }
});
*/
module.exports = router