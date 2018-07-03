const registration = (req, res, db, bcrypt) => {
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
};

module.exports = {
  registration: registration
};
