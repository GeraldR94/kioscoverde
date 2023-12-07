const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const usersRouter = require('./controllers/users');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const loginRouter = require('./controllers/login');
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

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Rutas fronted
app.use('/', express.static(path.resolve(__dirname, 'views', 'home')));
app.use('/components', express.static(path.resolve(__dirname, 'views', 'components')));
app.use('/signup', express.static(path.resolve(__dirname, 'views', 'signup')));
app.use('/login', express.static(path.resolve(__dirname, 'views', 'login')));
app.use('/styles', express.static(path.resolve(__dirname, 'views', 'styles')));
app.use('/imas', express.static(path.resolve(__dirname, 'views', 'imas')));
app.use('/verify/:id/:token', express.static(path.resolve(__dirname, 'views', 'verify')));

app.use(morgan('tiny'));

//Rutas Backend

app.use('/api/users' , usersRouter);
app.use('/api/login' , loginRouter);

module.exports = app;