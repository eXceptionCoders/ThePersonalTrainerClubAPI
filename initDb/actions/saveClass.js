'use strict'

const mongoose = require('mongoose')
const Class = require('../../models/Class')
const Sport =  require('../../models/Sport')
const User = require('../../models/User')

async function saveDataClass(data) {
  for (var i = 0; i < data.length; i++) {
    const classData = data[i];

    const user = await User.findOne({name: classData.instructor}).exec();

    if (!user) {
      console.log('error save class don´t find instructor') 
    }

    const sport = await Sport.findOne({name: classData.sport}).exec();

    if (!sport) {
      console.log('error save class don´t find sport') 
    }

    classData.instructor = user._id;
    classData.sport = sport._id;
    await Class.create(classData);
  }
}

module.exports = saveDataClass