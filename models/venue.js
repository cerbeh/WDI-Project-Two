const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({

  name: String,
  capacity: Number,
  location: String,
  image: String,
  description: String

});

module.exports = mongoose.model('Venue', venueSchema);
