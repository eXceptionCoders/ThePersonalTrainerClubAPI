'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UserSchema = mongoose.Schema({
  type: { type: String, default: 'user' },
  coach: {
    type: Boolean,
    default: false
  },
  name: { 
    type: String,
    required: [true, 'NAME_REQUIRED'], 
    minLength: [3, 'NAME_TOO_SHORT'], 
    maxLength: [255, 'NAME_TOO_LONG'], 
    trim: true,
    index: true
  },
  lastname: {
    type: String, 
    required: [true, 'LASTNAME_REQUIRED'], 
    minLength: [3, 'LASTNAME_TOO_SHORT'], 
    maxLength: [255, 'LASTNAME_TOO_LONG'], 
    trim: true,
    index: true 
  },
  thumbnail: { 
    type: String,
    maxLength: [512],
  },
  email: { 
    type: String,
    required: [true, 'EMAIL_REQUIRED'], 
    validate: {
      validator: function(v) {
        return validator.isEmail(v);
      },
      message: 'EMAIL_NOT_VALID'
    },
    trim: true,
    unique: true,
    index: true, 
  },
  password: {
    type: String,
    required: [true, 'PASSWORD_REQUIRED']
  },
  description: { 
    type: String,
    maxLength: [1024, 'DESCRIPTION_TOO_LONG'] 
  },
  sports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sport"
  }],
  locations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location"
  }]
}, { collection: 'users', timestamps: true });

UserSchema.index({'lastname': 'text'})

//#region Static Methods

/**
 * Compares whether a password match with a given hash.
 * @param {string} password
 * @param {string} hash
 * @return {boolean}
 */
UserSchema.statics.comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

//#endregion

//#region Hooks

UserSchema.pre('save', function(next) {
  const user = this;
  
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(parseInt( process.env.SALT_WORK_FACTOR ), (err, salt) => {
    if (err) {
      return next(err);
    }

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    error.errors = {
      email : {
        message: 'USER_ALREADY_EXISTS'
      }
    };
    next( error );
  } else {
    next(error);
  }
});

UserSchema.methods.toJSON = function() {
  var obj = this.toObject()
  delete obj.password
  delete obj.email
  return obj
 }

const User = mongoose.model('User', UserSchema);

module.exports = User;