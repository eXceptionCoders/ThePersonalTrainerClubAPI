'use strict';

const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  type: { type: String, default: 'category' },
  name: { 
    type: String, 
    required: [true, 'NAME_REQUIRED'], 
    index: true,
    unique: true
  },
}, { collection: 'category', timestamps: true }); // si no se indica collections tomara el nombre
                                                    // del model en minuscula y pluralizado

//#region Static Methods
//#endregion

//#region Hooks
//#endregion
const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;