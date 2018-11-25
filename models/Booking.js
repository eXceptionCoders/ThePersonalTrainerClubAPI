'use strict';

const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
  type: {type: String, default: 'booking' },
  class: { 
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
    ref: 'User',
    required: true
  }],
}, { collection: 'bookings', timestamps: true });

//#region Static Methods
//#endregion

//#region Hooks
//#endregion

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;