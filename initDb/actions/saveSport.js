'use strict'

const mongoose = require('mongoose')
const Sport =  require('../../models/Sport')
const Category = require('../../models/Category')

async function saveDataSport(data) {
  for (var i = 0; i < data.length; i++) {
    const sport = data[i];
    const category = await Category.findOne({name: sport.category}).exec();

    if (!category) {
      console.log('error save sport don´t find category') 
    }

    sport.category = category._id;
    await Sport.create(sport);
  }
}

module.exports = saveDataSport