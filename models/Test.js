'use strict';

const mongoose = require('mongoose');

var testSchema = mongoose.Schema({
  name: String,
  age: Number
});

const Test = mongoose.model('Test', testSchema)

module.exports = Test