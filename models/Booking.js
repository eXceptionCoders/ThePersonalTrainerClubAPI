'use strict';

const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
  type: {type: String, default: 'booking' },
  class: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, { collection: 'bookings', timestamps: true });

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;