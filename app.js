const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

(async() => {
  try {
    await mongoose.connect(process.env.MONGO_DEV_URI);
    console.log('Conecto a MongoDB');
  } catch (error) {
    console.log(error);
    console.log('No conecto a MongoDB');
  }
})();

// Rutas fronted
app.use('/', express.static(path.resolve(__dirname, 'views', 'home')));
app.use('/components', express.static(path.resolve(__dirname, 'views', 'components')));
app.use('/signup', express.static(path.resolve(__dirname, 'views', 'signup')));
app.use('/styles', express.static(path.resolve(__dirname, 'views', 'styles')));
app.use('/imas', express.static(path.resolve(__dirname, 'views', 'imas')));

//Rutas Nackend

module.exports = app;