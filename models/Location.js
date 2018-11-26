'use strict';

const mongoose = require('mongoose');

const geoSchema = mongoose.Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number]
  }
});

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
    type: geoSchema,
    required: [true, 'COORDINATES_REQUIRED']
  }
}, { collection: 'locations', timestamps: true });

LocationSchema.index({description: 1, location: 1});

//#region Static Methods

LocationSchema.static.list = function (longitude, latitude, distance) {
  const query = Location.find({
    location: {$nearSphere:
      {$geometry:
        {type: "Point"
        ,coordinates: [longitude, latitude]}
        ,$maxDistance: distance
        }
      }
    })
  return (query.exec())
}

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;