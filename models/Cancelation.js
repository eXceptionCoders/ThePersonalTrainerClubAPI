'use strict';

const mongoose = require('mongoose');

const CancelationSchema = mongoose.Schema({
  type: { type: String, default: 'cancelation' },
  active: {
    type: Boolean,
    default: true
  },
  description: { 
    type: String, 
    required: [true, 'DESCRIPTION_REQUIRED'], 
    maxLength: [2048, 'DESCRIPTION_TOO_LONG'] 
  },
  hoursForCancelation: {
    type: Number,
    require: true,
    min: [0, 'HOURS_GTE_0'],
  },
  repurse: {
    type: Number,
    require: true,
    min: [0, 'DISCOUNT_GTE_0'],
    max: [100, 'DISCOUNT_LTE_100'],
  }
}, { collection: 'cancelation', timestamps: true }); 

//#region Static Methods
//#endregion

//#region Hooks
//#endregion

const Cancelation = mongoose.model('Cancelation', CancelationSchema);

module.exports = Cancelation;