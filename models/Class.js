'use strict';

const mongoose = require('mongoose');
const LocationSchema = require('./Location');

const DURATION = [30, 45, 60, 90, 120]
//const FREQUENCY = 'unique diary weekly monthly'.split();

const ClassSchema = mongoose.Schema({
  type: { type: String, default: 'class' },
  instructor: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'USER_CREATOR_REQUIRED']
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
  },
  location: {
    type: LocationSchema,
    required: [true, 'LOCATION_REQUIRED']
  },
  duration: {
    type: Number,
    enum: [DURATION, 'UNKNOWN_DURATION'],
    required: true
  },
  price: {
    type: Number,
    min: [0, 'PRICE_GTE_0'],
    max: [50, 'PRICE_LTE_50'],
    required: true,
    index: true
  },
  quota: { type: Number, required: [true, 'QUOTA_REQUIRED'], default: 10 },
  description: { 
    type: String,
    maxLength: [2048, 'DESCRIPTION_TOO_LONG'] 
  }
}, { collection: 'classes', timestamps: true })

ClassSchema.index({ location: "2dsphere" })

/**
 * Returns class list.
 * @param filterss
 *  - duration: 30 | 45 | 60| 90 | 120
 *  - price: 0-50
 *  - sport: id_sport
 *  - instructor: id_instructor
 *  - longitude: -180 | 180
 *  - latitude: -90 | 90
 *  - distance: number
 * @param page
 * @param per_page
 * @param sort
 * @param fields
 */
ClassSchema.statics.list = function (filters) {
  const query = Class.find({})
 
  if (filters.sport) {query.where('sport', filters.sport)}
  if (filters.instructor) {query.where('instructor', filters.instructor)}
  if (filters.price) {query.where('price').lte(filters.price)}
  if (filters.duration) {query.where('duration', filters.duration)}
  if (filters.longitude && filters.latitude && filters.distance) {
    query.where({ location: { $near: {
      $maxDistance: filters.distance,
      $geometry: { type: "Point", coordinates: [filters.longitude, filters.latitude]}
      }}
    })
  }

  return (query
    .populate({path: 'instructor', select: ['name', 'lastname', 'thumbnail']})
    .populate({path: 'sport', select: ['name']})
    .exec())
}

/**
 * Returns class list.
 * @param filterss
 *  - forSale: false | true
 *  - price: 0-50 | 10- | -50 | 50
 *  - name: Regex /^name/i
 *  - location: long;latt
 * @param page
 * @param per_page
 * @param sort
 * @param fields
 */
/*
ClassSchema.statics.list = async (filterss, page, per_page, sort, fields) => {

  const count = await Ad.find(filterss).count();
  const query = Ad.find(filterss);

  query.skip(page);
  query.limit(per_page);
  query.sort(sort);
  query.select(fields);

  return { total: count, rows: await query.exec() };
};

//#endregion

//#region Hooks

ClassSchema.pre('save', function(next) {
  // var ad = this;
  // TODO: remove duplicate tags

  next();
});

//#endregion
*/

const Class = mongoose.model('Class', ClassSchema);

module.exports = Class;