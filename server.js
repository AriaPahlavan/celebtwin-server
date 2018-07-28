const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const signin = require('./controllers/SignIn');
const register = require('./controllers/Register');
const profile = require('./controllers/Profile');
const image = require('./controllers/Image');

// setup query builder
const db = require('knex')({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
  }
});

const PORT = process.env.PORT || 3000;

express()
  .use(bodyParser.json()) // Req parser middleware
  .use(cors()) // Cors middleware
  .get('/', (req, res) => res.json(''))
  .get('/profile/:id', profile.retreive(db))
  .post('/signin', signin.signIn(db, bcrypt))
  .post('/register', register.registration(db, bcrypt))
  .post('/imageUrl', image.detectionApiCall)
  .put('/image', image.incrementEntry(db))
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
