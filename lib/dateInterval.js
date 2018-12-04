'use strict'

const moment = require('moment')
const PERIOD = ['today', 'tomorrow', 'week', 'moth']

module.exports.calculateValidDates = async function(initial, end, interval) {
  let actualDate = moment(initial)
  const endDate = moment(end)
  let arrayDateValid = [actualDate.format()]
  if (interval > 0) {
    while (endDate > actualDate) {
      actualDate.add(1, 'days')  
      arrayDateValid.push(actualDate.format())
    }
  }
  return arrayDateValid
}

module.exports.calculatePeriodDates = async function(period) {
  const actualDate = new Date()
  let minDate = moment(actualDate)
  let maxDate = moment(actualDate)
  minDate.add(1, 'days')
  switch (period) {
    case 'tomorrow':
      minDate.add(1, 'day')
      maxDate.add(1, 'day')
      break
    case 'week':
      maxDate.add(1, 'week')
      break
    case 'moth':
      maxDate.add(1, 'moth')
      break
    default:
      break
  }
  return [minDate.format(), maxDate.format()]
}