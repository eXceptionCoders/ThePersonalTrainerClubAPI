'use strict';

const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
  type: {type: String, default: 'location' },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'USER_CREATOR_REQUIRED']
  },
  description: {
    type: String,
    minLegth: [3, 'DESCRIPTION_TOO_SHORT'],
    maxLength: [1024, 'DESCRIPTION_TOO_LONG'],
    required: [true, 'DESCRIPTION_REQUIRED']
  },
  location: {
    type: {type: String},
    coordinates: []
  }
}, { collection: 'locations', timestamps: true });

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;