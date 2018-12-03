'use strict';

const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  type: { type: String, default: 'category' },
  name: { 
    type: String, 
    required: [true, 'NAME_REQUIRED'], 
    unique: true,
  },
}, { collection: 'categories', timestamps: true });

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;