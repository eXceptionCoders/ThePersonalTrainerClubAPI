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
<<<<<<< HEAD
  location: {
    type: {type: String},
    coordinates: []
  }
}, { collection: 'locations', timestamps: true });
=======
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
>>>>>>> 68e96df68d9cb06c7119b257c3f3a5ff178c12f8

// const Location = mongoose.model('Location', LocationSchema);

module.exports = LocationSchema;