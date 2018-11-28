'use strict';

const mongoose = require('mongoose');

const SportSchema = mongoose.Schema({
  type: { type: String, default: 'sport' },
  name: { 
    type: String, 
    required: [true, 'NAME_REQUIRED'], 
    unique: true
  },
  icon: {
    type: String,
    required: [true, 'ICON_REQUIRED']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, 'CATEGORY_REQUIRED']
  },
}, { collection: 'sports', timestamps: true });

const Sport = mongoose.model('Sport', SportSchema);

module.exports = Sport;
