const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const database = {
  users: [
    {
      name: 'Sarah',
      email: 'sarah@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    }, {
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

app.post('/signin', (req, res) => {
  if (databaseContains(req.body)) {
    res.json('success');
  } else {
    res.status(404).json('error loggin in');
  }
});

app.get('/', (req, res) => {
  res.send('this is working!');
});

app.listen(3000, () => {
  console.log('app running on port 3000');
});
