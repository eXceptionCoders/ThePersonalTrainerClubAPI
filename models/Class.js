'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FREQUENCY = ['unique', 'diary', 'weekly', 'monthly'];

const ClassSchema = mongoose.Schema({
  type: { type: String, default: 'class' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { 
    type: String, 
    required: [true, 'NAME_REQUIRED'], 
    minLength: [3, 'NAME_TOO_SHORT'], 
    maxLength: [255, 'NAME_TOO_LONG'], 
    index: true, 
    trim: true 
  },
  freeCoupon: { type: Boolean, default: false },
  description: { 
    type: String, 
    required: [true, 'DESCRIPTION_REQUIRED'], 
    maxLength: [2048, 'DESCRIPTION_TOO_LONG'] 
  },
  forSale: { type: Boolean, default: true },
  price: { type: Number, min: [1, 'PRICE_GTE_0'] },
  photo: { type: String },
  startDate: { type: Date, required: [true, 'STARTDATE_REQUIRED'] },
  endDate: { type: Date },
  time: { 
    hour: { type: Number, required: [true, 'HOUR_REQUIRED'], min: [0, 'HOUR_GTE_0'], max: [23, 'HOUR_LTE_23'] },
    minute: { type: Number, required: [true, 'MINUTE_REQUIRED'], min: [0, 'MINUTE_GTE_0'], max: [59, 'MINUTE_LTE_59'] }
  },
  duration: { type: Number, min: [0.5, 'DURATION_GTE_0'] },
  frecuency: {type: String, enum: { values: FREQUENCY, message: 'UNKNOWN_FREQUENCY'} },
  quota: { type: Number, required: [true, 'QUOTA_REQUIRED'], default: 10 },
  location: {
    type: { type: String, default: 'Point' },
    description: { type: String },
    coordinates: []
  },
  activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
}, { collection: 'classes', timestamps: true }); // si no se indica collections tomara el nombre
                                                 // del model en minuscula y pluralizado

//#region Indexes

// Full text search index
ClassSchema.index({ name: 'text', description: 'text' });

// spatial index
ClassSchema.index({ location: "2dsphere" });

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

const Class = mongoose.model('Class', ClassSchema);

module.exports = Class;