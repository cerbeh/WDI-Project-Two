const Venue = require('../models/venue');

function venueIndex(req, res) {
  console.log('hello');
  Venue
    .find()
    .exec()
    .then(res.render('venues/index'));
}

module.exports = {
  index: venueIndex
};
