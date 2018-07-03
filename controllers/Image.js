const incrementEntry = (req, res, db) => {
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
};


module.exports = {
  incrementEntry: incrementEntry
};
