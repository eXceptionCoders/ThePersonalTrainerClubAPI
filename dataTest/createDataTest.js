'use strict';

const Category = require('../models/Category')
const Sport = require('../models/Sport')
const Cancelation = require('../models/Cancelation')
const User = require('../models/User')

const dataTest = require('./data.json')
const conn = require ('../lib/mongooseConnection')

function insert(element){
  element.save((err, rest) => {
    if (err) {
      console.log('Error al crear elementos');
    } else {
      console.log('Elemento creado');
    }
  })
}

function createDataUser() {
  dataTest.users.forEach(element => {
    var newUser = new User(element)
    insert(newUser)
  })
}

function createDataCancelation() {
  conn.dropCollection('cancelation')
  dataTest.cancelation.forEach(element => {
    var newCancelation = new Cancelation(element)
    insert(newCancelation)
  })
  createDataUser()
}

function createDataSport() {
  dataTest.sport.forEach(element => {
    Category.findOne({"name": element.category}, function(err, idCategory){
      var newSport = new Sport(element)
      newSport.category = idCategory
      insert(newSport);
    })
  })
  createDataCancelation()
}

function createDataCategoty() {
  dataTest.category.forEach(element => {
    const newCategory = new Category(element)
    insert(newCategory)
  })
  createDataSport()
}

function deleteAllCategory() {
  conn.dropCollection('cancelation')
  conn.dropCollection('category')
  conn.dropCollection('classes')
  conn.dropCollection('sport')
  conn.dropCollection('users');
  createDataCategoty()
}

function createData() {
  deleteAllCategory()

}

module.exports = createData;
