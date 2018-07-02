const express = require('express');
const bodyParser = require('body-parser');

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

  databaseContains(
    user => user.id === Number(id),
    user => res.json(user),
    () => res.status(400).json('no such user')
  );

});

app.post('/signin', (req, res) => {
  const body = req.body;

  databaseContains(
    user => body.email === user.email && body.password === user.password,
    user => res.json('success'),
    () => res.status(404).json('error logging in')
  );
});
app.post('/register', (req, res) => {
  const {name, email, password} = req.body;

  database.users.push({
    id: 3,
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });

  res.json(database.users[database.users.length-1]);
});

app.put('/image', (req, res) => {
  const id = Number(req.body.id);

  databaseContains(
    user => user.id === id,
    user => {
      user.entries++;
      res.json(user.entries);
    },
    () => res.status(400).json('not such user')
  );
});

app.listen(3000, () => {
  console.log('app running on port 3000');
});
