const Venue = require('../models/venue');

function venueIndex(req, res) {
  console.log('hello');
  Venue
    .find()
    .exec()
    .then(res.render('venues/index', {
      name: 'The Flying Murray',
      capacity: 25,
      location: 'Flat One',
      image: 'https://www.fillmurray.com/400/300'
    }));
}

function venueNew(req, res) {
  res.render('venues/new');
}

function venueCreate(req, res) {
  Venue
    .create(req.body)
    .then((venue) => {
      res.redirect(`venues/${venue._id}`);
    });
}

module.exports = {
  index: venueIndex,
  new: venueNew,
  create: venueCreate
};
