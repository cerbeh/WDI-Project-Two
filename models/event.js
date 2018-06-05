const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

  name: {type: String, required: true},
  venue: {type: mongoose.Schema.ObjectId, ref: 'Venue'},
  description: {type: String, required: true},
  attendees: []

});

module.exports = mongoose.model('Event', eventSchema);
