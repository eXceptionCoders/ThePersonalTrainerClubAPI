'use stric'

require('dotenv').config();
require('../lib/mongooseConnection')


async function waitToDeleteDb() {
  console.log('Deleting db');
  await require('../models/Cancelation').remove({});
  await require('../models/Booking').remove({});
  await require('../models/Review').remove({});
  await require('../models/Class').remove({});
  await require('../models/User').remove({});
  await require('../models/Sport').remove({});
  await require('../models/Category').remove({});
}

async function saveCancelation() {
  console.log('Creating cancelation');
  dataCancelation = require('./data/cancelation.json');
  createNewCancelation = require('./actions/saveCancelation');
  await createNewCancelation(dataCancelation);
}

async function saveCategory() {
  console.log('Creating category');
  dataCategory = require('./data/category.json');
  createNewCategory = require('./actions/saveCategory');
  await createNewCategory(dataCategory);
}

async function saveSport() {
  console.log ('Creating sport');
  dataSport = require('./data/sport.json');
  createNewSport = require('./actions/saveSport');
  await createNewSport(dataSport);
}

async function saveUser() {
  console.log ('Creating user');
  dataUser = require('./data/user.json');
  createNewUser = require('./actions/saveUser');
  await createNewUser(dataUser);
}

async function saveAddSportToUser() {
  console.log ('Add sport in users');
  dataAddSport = require('./data/addSportToUser.json');
  addSportToUser = require('./actions/addSportToUser');
  await addSportToUser(dataAddSport);
}

async function saveClass() {
  console.log ('Creating class');
  dataClass = require('./data/class.json');
  createNewClass = require('./actions/saveClass');
  await createNewClass(dataClass);
}

async function saveBooking() {
  console.log ('Creating booking');
  dataBooking = require('./data/booking.json');
  createNewBooking = require('./actions/saveBooking');
  await createNewBooking(dataBooking);
}

async function main () {
  await waitToDeleteDb()
  await saveCancelation()
  await saveCategory()
  await saveSport()
  await saveUser()
  await saveAddSportToUser()
  await saveClass()
  await saveBooking()
  console.log ("Fin")
  process.exit(0);
}

main ()