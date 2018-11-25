'use strict';

const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
  type: { type: String, default: 'Point' },
  description: {
    type: String,
    required: [true, 'DESCRIPTION_REQUIRED']
  },
  coordinates: {
    type: [Number],
    index: '2dsphere',
    required: [true, 'COORDINATES_REQUIRED']
  },
}, { collection: 'location', timestamps: true });

//#region Static Methods
//#endregion

//#region Hooks
//#endregion

// const Location = mongoose.model('Location', LocationSchema);

module.exports = LocationSchema;