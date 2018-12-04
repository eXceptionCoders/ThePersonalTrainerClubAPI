'use strict';

const mongoose = require('mongoose');
const {calculatePeriodDates} = require('../lib/dateInterval')
const DURATION = [30, 45, 60, 90, 120]

const ClassSchema = mongoose.Schema({
  type: { type: String, default: 'class' },
  instructor: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'USER_CREATOR_REQUIRED'],
    index: true
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Sport",
    required: [true, 'SPORT_REQUIRED'],
    index: true
  },
  place: {
    type: String,
    maxLength: [1024, 'DESCRIPTION_TOO_LONG'],
    required: [true, 'DESCRIPTION_PLACE_NECESSARY'],
    index: true 
  },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  duration: {
    type: Number,
    enum: [DURATION, 'UNKNOWN_DURATION'],
    required: true, 
    index: true 
  },
  price: {
    type: Number,
    min: [0, 'PRICE_GTE_0'],
    max: [50, 'PRICE_LTE_50'],
    required: true,
    index: true
  },
  registered: {
    type: Number,
    default: 0,
    index: true
  },
  description: { 
    type: String,
    maxLength: [2048, 'DESCRIPTION_TOO_LONG'] 
  },
  maxusers: {
    type: Number,
    min: [1, 'MAXUSER_GTE_1'],
    max: [50, 'MAXUSER_LTE_50'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    //required: true,
    index: true
  },
  time: {
    type: Number,
    min: [6, 'TIME_GTE_6'],
    max: [24, 'TIME_LTE_24'],
    //required: true,
    index: true
  }
}, { collection: 'classes', timestamps: true });

ClassSchema.index({ location: "2dsphere" });

/**
 * Returns class list.
 *  - price: 0-50
 *  - sport: id_sport
 *  - longitude: -180 | 180, latitude: -90 | 90, distance: number
 *  - timetable: | 0 (6:00-12:00) | 1 (12:00-16:00) | 2 (16:00-20:00) | 3 (20:00-24:00) |
 *  - date: | today | tomorrow | week | moth | 
 */
ClassSchema.statics.list = async function (filters) {
  const query = Class.find({})
  const limitFind = 20

  if (filters.sport) {
    query.where('sport', filters.sport);
  }

  if (filters.longitude && filters.latitude && filters.distance) {
    query.where({ location: { $near: {
      $maxDistance: filters.distance,
      $geometry: { type: "Point", coordinates: [filters.longitude, filters.latitude]}
      }}
    });
  }

  if (filters.timetable) {
    const tableOftimetable = [[6,12], [12,16], [16,20], [20,24]]
    const mintime = tableOftimetable[filters.timetable][0]
    const maxtime = tableOftimetable[filters.timetable][1]
    query.where({time: {$gt: mintime, $lt: maxtime}});
  }

  if (filters.date) {
    const period = await calculatePeriodDates(filters.date)
    query.where({date: {$gt: period[0], $lt: period[1]}});
  }

  /*
  if (filters.price) {query.where('price').lte(filters.price)}
  //if (filters.instructor) {query.where('instructor', filters.instructor)}
  //if (filters.duration) {query.where('duration', filters.duration)}
  */

  query.limit(limitFind);
  query.sort({date: 1})
  return (query
    .populate({path: 'instructor', select: ['name', 'lastname', 'thumbnail']})
    .populate({path: 'sport', select: ['name']})
    .exec());
}

const Class = mongoose.model('Class', ClassSchema);

module.exports = Class;