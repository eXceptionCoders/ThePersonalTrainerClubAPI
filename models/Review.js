'use strict';

const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
  type: { type: String, default: 'review' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  stars: { 
    type: Number, 
    required: [true, 'STARS_REQUIRED'],
    min: [1, 'STAR_GTE_1'],
    max: [5, 'STAR_LTE_5']
  },
  comment: { 
    type: String, 
    required: [true, 'COMMENT_REQUIRED'], 
    maxLength: [2048, 'COMMENT_TOO_LONG'] 
  },
}, { collection: 'reviews', timestamps: true }); // si no se indica collections tomara el nombre
                                                 // del model en minuscula y pluralizado
                                                 
//#region Static Methods
//#endregion

//#region Hooks
//#endregion

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;