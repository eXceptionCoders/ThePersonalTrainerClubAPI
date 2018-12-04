'use strict';

const express = require('express')
  ,router = express.Router()
  ,jwt = require('jsonwebtoken');

const { check, body, validationResult } = require('express-validator/check');
const User = require('../../../models/User');

/**
 * POST /
 * Create a new user.
 * Query params:
 *  - name: Required. Example: Daniel
 *  - lastname: Required. Example: Garcia Gonzalez
 *  - email: Required. Example: test@test.com
 *  - coach: Required. Example: true
 *  - password: Required. Example: 1234
**/
router.post('/signup', [
  check('name').isString().withMessage('NAME_NOT_VALID'),
  check('lastname').isString().withMessage('LASTNAME_NOT_VALID'),
  check('email').isEmail().withMessage('EMAIL_NOT_VALID'),
  check('coach').isBoolean().withMessage('COACH_NOT_VALID')
  ]
  ,(req, res, next) => {
  const newUser = new User(req.body);
  newUser.save((err, userSaved ) => {
    if (err) {
      next(err);
      return;
    }
    res.ptcResponse();
  });
});

/**
 * POST /
 * Login user.
 * Query params:
 *  - email: Required. Example: test@test.com
 *  - password: Required. Example: 1234
**/
router.post('/login', [
  body('email').isEmail().withMessage('EMAIL_NOT_VALID')
  ], async (req, res, next) => {
  try {
    validationResult(req).throw();

    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email }).exec();

    if (!user || !await User.comparePassword(password, user.password)) {
      const err = new Error('INCORRECT_USER_OR_PASS');
      err.status = 401;
      return next(err);
    }

    jwt.sign(
      {user_id: user._id}, process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRESIN},
      (err, token) => {
        if (err) {
          next(err);
          return;
        }
        res.ptcDataResponse({ token });
      }
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;