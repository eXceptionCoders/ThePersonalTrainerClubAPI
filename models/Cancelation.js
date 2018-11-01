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
    required: [false, 'DESCRIPTION_REQUIRED'], 
    maxLength: [2048, 'DESCRIPTION_TOO_LONG'] 
  },
  hoursForCancelation: {
    type: number,
    require: true,
    default: 0,
    min: [0, 'HOURS_GTE_0'],
  },
  discount: {
    type: number,
    require: true,
    default: 0,
    min: [0, 'DISCOUNT_GTE_0'],
    max: [100, 'DISCOUNT_LTE_100'],
  }
}, { collection: 'cancelation', timestamps: true }); // si no se indica collections tomara el nombre
                                                    // del model en minuscula y 

//#region Static Methods
//#endregion

//#region Hooks
//#endregion

const Cancelation = mongoose.model('Cancelation', CancelationSchema);

module.exports = Cancelation;