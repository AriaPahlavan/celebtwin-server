const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const signin = require('./controllers/SignIn.js');
const register = require('./controllers/Register');
const profile = require('./controllers/Profile');
const image = require('./controllers/Image');

const dbname = 'emojifydb';
const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'ariapahlavan',
    password : '',
    database : dbname
  }
});

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/profile/:id', (req, res) => profile.retreive(req, res, db));

app.post('/signin', (req, res) => signin.signIn(req, res, db, bcrypt));

app.post('/register', (req, res) => register.registration(req, res, db, bcrypt));

app.put('/image', (req, res) => image.incrementEntry(req, res, db));

app.listen(3000);
