'use strict';

const mongoose = require('mongoose');

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
  location: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Location",
    required: [true, 'LOCATION_REQUIRED'],
    index: true
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
  registered: {
    type: Number,
    default: 0,
    index: true
  },
  description: { 
    type: String,
    maxLength: [2048, 'DESCRIPTION_TOO_LONG'] 
  }
}, { collection: 'classes', timestamps: true })

ClassSchema.statics.list = function (filter) {
  const query = Class.find({})

  if(filter.price) { query.where('price').lte(filter.price)}
  if(filter.duration) {query.where('duration', filter.duration)}
  
  return (query
    .populate({path: 'instructor', select: ['name', 'lastname', 'thumbnail']})
    .populate({path: 'sport', select: 'name'})
    .exec())
}

//#region Indexes

// Full text search index
//ClassSchema.index({ name: 'text', description: 'text' });

// spatial index
//ClassSchema.index({ location: "2dsphere" });

//#endregion

//#region Static Methods

/**
 * Returns class list.
 * @param filters
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
ClassSchema.statics.list = async (filters, page, per_page, sort, fields) => {
  // Remove undefine filters
  for (let key in filters) {
    if (!filters[key]) {
      delete filters[key];
      continue;
    }

    switch (key) {
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

      case 'name':
        filters[key] = new RegExp('^' + filters[key], 'i');
        break;

      case 'location':
        // https://medium.com/@galford151/mongoose-geospatial-queries-with-near-59800b79c0f6
        // In our query, “$maxDistance” is the distance in meters from the longitude and latitude values
        const coordinates = filters[key].split('-');
        const long = coordinates[0];
        const latt = coordinates[1];
        filters[key] = {
          $near: {
            $maxDistance: 20000,
            $geometry: {
              type: "Point",
              coordinates: [long, latt]
            }
          }
        };
        break;

      //case 'tags':
        //filters[key] = { $in: filters[key].split(',') };
        //delete filters[key];
        //break;
    }
  }

  const count = await Ad.find(filters).count();
  const query = Ad.find(filters);

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