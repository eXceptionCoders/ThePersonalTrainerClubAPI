'use strict';

const express = require('express');
const router = express.Router();

const { check, query, validationResult } = require('express-validator/check');

const jwtAuth = require('../../../lib/jwtAuth');
const Class = require('../../../models/Class');

// Protected routes
router.use(jwtAuth());

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

module.exports = router;