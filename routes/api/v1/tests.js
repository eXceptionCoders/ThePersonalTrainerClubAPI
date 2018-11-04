'use strict';

var express = require('express');
var router = express.Router();

const Test = require('../../../models/Test')
/* GET home page. */

router.get('/', (req, res, next) => {
  const nano = new Test ({name: 'Manuel', age: 48});

  nano.save((err, ok) => {
    if (err) {
      next (err);
      return;
    }
    console.log ('OK')
  })
});

module.exports = router;