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
 * @param page
 * @param per_page
 */
ClassSchema.statics.list = async function (filters, page, per_page) {
  for (let key in filters) {
    if (!filters[key]) {
        delete filters[key];
        continue;
    }

    switch (key) {
      case 'sport':
        break;
      case 'timetable':
        const tableOftimetable = [[6,12], [12,16], [16,20], [20,24]]
        const mintime = tableOftimetable[filters.timetable][0]
        const maxtime = tableOftimetable[filters.timetable][1]
        filters[key] = { time: {$gt: mintime, $lt: maxtime} };
        break;
      case 'date':
        const period = await calculatePeriodDates(filters.date)
        query.where({date: {$gt: period[0], $lt: period[1]}});
        break;
      case 'price':
        const range = filters[key].split('-');
        if (range.length == 1) {
            filters[key] = range[0];
        } else if (!range[0]) {
            filters[key] = { $lte: range[1] };
        } else if (!range[1]) {
            filters[key] = { $gte: range[0] };
        } else {
            filters[key] = { $gte: range[0], $lte: range[1] };
        }
        break;
    }
  }

  if (filters.longitude && filters.latitude && filters.distance) {
    // $near sorts documents by distance
    filters['location'] = {
      $near: {
        $maxDistance: filters.distance,
        $distanceField: 'distance',
        $geometry: { type: 'Point', coordinates: [filters.longitude, filters.latitude]}
      }
    };
  }

  delete filters.longitude;
  delete filters.latitude;
  delete filters.distance;

  const count = await Class.find(filters).count();
  const query = Class.find(filters);

  query.skip(page);
  query.populate({path: 'instructor', select: ['_id', 'name', 'lastname', 'thumbnail']})
  query.populate({path: 'sport', select: ['_id', 'name', 'icon', 'category']})
  query.limit(per_page);
  // query.sort(sort);
  // query.select(fields);

  return { total: count, rows: await query.exec() };
}

const Class = mongoose.model('Class', ClassSchema);

module.exports = Class;