'use strict'

const mongoose = require('mongoose')
const Category = require('../../models/Category')

async function saveDataCategory(data) {
  for (var i = 0; i < data.length; i++) {
    var category = data[i];

    await Category.create(category);
  }
}

module.exports = saveDataCategory