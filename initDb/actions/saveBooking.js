'use strict'

const mongoose = require('mongoose')
const Booking =  require('../../models/Booking')
const Class = require('../../models/Class')
const User = require('../../models/User')

async function saveDataBooking(data) {
  for (var i = 0; i < data.length; i++) {
    const bookingData = data[i];

    const price = Number(bookingData.class);
    const classData = await Class.findOneAndUpdate({price: price}, {$inc: {registered: 1}}).exec();

    if (!classData) {
      console.log ('error save booking don´t find class')
    }

    const user = await User.findOne({name: bookingData.name}).exec();

    if (!user) {
      console.log ('error save booking don´t find user')
    }

    let booking = {}
    booking.class = classData._id;
    booking.user = user._id;

    await Booking.create(booking);
  }
}

module.exports = saveDataBooking