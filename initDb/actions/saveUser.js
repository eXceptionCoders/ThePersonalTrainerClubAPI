'use strict'

const mongoose = require('mongoose')
const User = require('../../models/User')

async function saveDataUser(data) {
  for (var i = 0; i < data.length; i++) {
    const user = data[i];
    await User.create(user);
  }
}

module.exports = saveDataUser

