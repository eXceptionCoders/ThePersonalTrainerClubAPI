'use strict';

const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  type: { type: String, default: 'category' },
  name: { 
    type: String, 
    required: [true, 'NAME_REQUIRED'], 
    unique: true,
    index: true,
  },
}, { collection: 'category', timestamps: true });

//#region Static Methods
//#endregion

//#region Hooks
//#endregion
const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;