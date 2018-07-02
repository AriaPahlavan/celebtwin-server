const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');

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

const database = {
  users: [
    {
      id: 1,
      name: 'Sarah',
      email: 'sarah@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    }, {
      id: 2,
      name: 'Joe',
      email: 'joe@yahoo.com',
      password: '1234',
      entries: 0,
      joined: new Date()
    }
  ]
}



const app = express();

app.use(bodyParser.json());
app.use(cors());

const databaseContains = (predicate, onPresent, onAbsent) => {
  for (let i = 0; i < database.users.length; i++) {
    const user = database.users[i];
    if (predicate(user))
          return onPresent(user);
  }

  return onAbsent();
};


app.get('/', (req, res) => {
  res.json(database.users);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({id})
    .then(user => {
      if (user.length>0) { res.json(user[0]); }
      else { res.status(400).json('no such user'); }
    })
    .catch(err => res.status(400).json('error getting user'));
});


app.post('/signin', (req, res) => {
  const {email, password} = req.body;


  db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        db.select('*')
          .from('users')
          .where('email', '=', email)
          .then(user => res.json(user[0]))
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('unable to get user');
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
});

app.post('/register', (req, res) => {
  const {name, email, password} = req.body;
  const hash = bcrypt.hashSync(password);

  db.transaction(trx => {
    trx.insert({ hash: hash, email: email })
       .into('login')
       .returning('email')
       .then(loginEmail => {
         return trx.insert({
              name: name,
              email: email,
              joined: new Date()
            })
            .into('users')
            .returning('*')
            .then(user => res.json(user[0]))
       })
       .then(trx.commit)
       .catch(trx.rollback);
  })
  .catch(err => res.status(400).json('unable to register'));
});


app.put('/image', (req, res) => {
  const {id} = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      if (entries.length>0) { res.json(entries[0]); }
      else { res.status(400).json('no such user'); }
    })
    .catch(err => res.status(400).json('no such user'));
});

app.listen(3000, () => {
  console.log('app running on port 3000');
});
