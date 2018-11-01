'use strict';

const mongoose = require('mongoose');

const SportSchema = mongoose.Schema({
  type: { type: String, default: 'sport' },
  name: { 
    type: String, 
    required: [true, 'NAME_REQUIRED'], 
    index: true,
    unique: true
  },
  catefory: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'CATEGORY_REQUIRED'],
    index: true
  },
}, { collection: 'category', timestamps: true }); // si no se indica collections tomara el nombre
                                                    // del model en minuscula y 

//#region Static Methods
//#endregion

//#region Hooks
//#endregion

const Sport = mongoose.model('Category', SportSchema);

module.exports = Sport;