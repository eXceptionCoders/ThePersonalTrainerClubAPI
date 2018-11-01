'use strict';

const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
  type: {type: String, default: 'booking' },
  active: {
    type: Boolean,
    default: true
  },
  class: { 
    type: Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  resgistered: {
    type: number,
    default: 0
  },
  listUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  /*freeCoupon: { type: Boolean, default: false },
  date: { type: Date },
  payment: {
    sum: { type: Number },
    date: { type: Date }
  }*/
}, { collection: 'bookings', timestamps: true });// si no se indica collections tomara el nombre
                                                 // del model en minuscula y pluralizado

//#region Static Methods
//#endregion

//#region Hooks
//#endregion

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;