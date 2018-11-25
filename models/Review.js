'use strict';

const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
  type: { type: String, default: 'review' },
  created: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  for: { 
    type:  mongoose.Schema.Types.ObjectId,
    required: true
  },
  stars: { 
    type: Number, 
    required: [true, 'STARS_REQUIRED'],
    min: [1, 'STAR_GTE_1'],
    max: [5, 'STAR_LTE_5']
  },
  comment: { 
    type: String, 
    required: [true, 'COMMENT_REQUIRED'], 
    maxLength: [1024, 'COMMENT_TOO_LONG'] 
  },
}, { collection: 'reviews', timestamps: true });
                                                 
//#region Static Methods
//#endregion

//#region Hooks
//#endregion

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;