const registration = (db, bcrypt) => (req, res) => {
  const {name, email, password} = req.body;

  if (!name || !email || !password)
    return res.status(400).json('invalid form submission');

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
};

module.exports = {
  registration: registration
};
