'use strict';

const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
  type: { type: String, default: 'activity' },
  name: { 
    type: String, 
    required: [true, 'NAME_REQUIRED'], 
    minLength: [3, 'NAME_TOO_SHORT'], 
    maxLength: [255, 'NAME_TOO_LONG'], 
    trim: true, 
    index: true 
  },
  category: { type: String, required: [true, 'CATEGORY_REQUIRED'] },
  thumbnail: { type: String, required: [true, 'THUMBNAIL_REQUIRED'] },
  description: { type: String }
}, { collection: 'activities', timestamps: true }); // si no se indica collections tomara el nombre
                                                    // del model en minuscula y pluralizado

//#region Static Methods
//#endregion

//#region Hooks
//#endregion

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;