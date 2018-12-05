'use strict'

const mongoose = require('mongoose')
const Cancelation = require('../../models/Cancelation')

async function saveDataCancelation(data) {
  for (var i = 0; i < data.length; i++) {
    const category = data[i];

    await Cancelation.create(category);
  }
}

module.exports = saveDataCancelation