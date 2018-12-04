'use strict';

const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
  type: { type: String, default: 'Point' },
  description: {
    type: String,
    minLegth: [3, 'DESCRIPTION_TOO_SHORT'],
    maxLength: [1024, 'DESCRIPTION_TOO_LONG'],
    required: [true, 'DESCRIPTION_REQUIRED']
  },
  coordinates: {
    type: [Number],
    required: [true, 'COORDINATES_REQUIRED']
  },
}, { collection: 'location', timestamps: true });

// const Location = mongoose.model('Location', LocationSchema);

module.exports = LocationSchema;