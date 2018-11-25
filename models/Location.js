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
    required: [true, 'DESCRIPTION_REQUIRED']
  },
  coordinates: {
    type: [Number],
    index: '2dsphere',
    required: [true, 'COORDINATES_REQUIRED']
  }
}, { collection: 'location', timestamps: true });

//#region Static Methods
//#endregion

//#region Hooks
//#endregion

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;