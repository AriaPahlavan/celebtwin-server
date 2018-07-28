// clarifai api setup
const clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: process.env.CLARIFAI
});


// celebrity detection model ID
const modelId = 'e466caa0619f444ab97497640cefc4dc';

const detectionApiCall = (req, res) => {
  const imageUrl = req.body.imageUrl;

  app.models
     .predict(modelId, imageUrl)
     .then(response => res.json(response))
     .catch(err => res.status(400).json('API call error'));
};


const incrementEntry = db => (req, res) => {
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
  detectionApiCall : detectionApiCall,
  incrementEntry: incrementEntry
};
