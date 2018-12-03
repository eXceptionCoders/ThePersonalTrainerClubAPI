'use strict';

const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
  type: {type: String, default: 'booking' },
  class: { 
<<<<<<< HEAD
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
=======
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  resgistered: {
    type: Number,
    default: 0
  },
  user: [{
    type:  mongoose.Schema.Types.ObjectId,
>>>>>>> 68e96df68d9cb06c7119b257c3f3a5ff178c12f8
    ref: 'User',
    required: true
  },
}, { collection: 'bookings', timestamps: true });

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;