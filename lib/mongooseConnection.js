/**
 * @description Mongoose connection.
 * @author David López Rguez
 */

'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;

conn.on('error', err => {
  console.log('Error', err);
  process.exit(1);
});

conn.once('open', () => {
  console.log(`Conectado a MongoDB en ${mongoose.connection.name}`);
});

mongoose.connect(process.env.MONGODB_CONNECTIONSTRING, {
  useCreateIndex: true,
  useNewUrlParser: true
})

mongoose.Promise = global.Promise;

module.exports = conn;