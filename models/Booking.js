'use strict';

const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
  type: {type: String, default: 'booking' },
  class: { 
    type: Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  resgistered: {
    type: number,
    default: 0
  }
}, { collection: 'bookings', timestamps: true });

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;