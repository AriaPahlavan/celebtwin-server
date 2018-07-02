const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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

app.use(bodyParser.json());


const databaseContains = (body) => {
  for (let i = 0; i < database.users.length; i++) {
    const user = database.users[i];
    if (body.email === user.email &&
        body.password === user.password)
          return true;
  }

  return false;
};

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

app.post('/signin', (req, res) => {
  if (databaseContains(req.body)) {
    res.json('success');
  } else {
    res.status(404).json('error loggin in');
  }
});

app.get('/', (req, res) => {
  res.json(database.users);
});

app.listen(3000, () => {
  console.log('app running on port 3000');
});
