'use strict';

const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
  type: {type: String, default: 'booking' },
  class: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
    index: true 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, 
    index: true
  }
}, { collection: 'bookings', timestamps: true });

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;