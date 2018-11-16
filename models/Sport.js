'use strict';

const mongoose = require('mongoose');

const SportSchema = mongoose.Schema({
  type: { type: String, default: 'sport' },
  name: { 
    type: String, 
    required: [true, 'NAME_REQUIRED'], 
    unique: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
}, { collection: 'sport', timestamps: true });

//#region Static Methods
//#endregion

//#region Hooks
//#endregion

const Sport = mongoose.model('Sports', SportSchema);

module.exports = Sport;