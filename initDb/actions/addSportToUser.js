'use strict'

const mongoose = require('mongoose')
const User = require('../../models/User')
const Sport = require('../../models/Sport')

async function addSportToUser(data) {
  for (var i = 0; i < data.length; i++) {
    const element = data[i];
    const sport = await Sport.findOne({ name: element.sport }).exec();

    if (!sport) {
      console.log ('error save sport don´t find sport') 
    }

    await User.findOneAndUpdate({ name: element.name }, {$push: {sports: sport._id}}).exec();
  };
}

module.exports = addSportToUser