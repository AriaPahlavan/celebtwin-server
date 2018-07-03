const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const signin = require('./controllers/SignIn');
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

app.get('/profile/:id', profile.retreive(db));

app.post('/signin', signin.signIn(db, bcrypt));

app.post('/register', register.registration(db, bcrypt));

app.put('/image', image.incrementEntry(db));

app.listen(3000);
