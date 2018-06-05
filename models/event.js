const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

  name: {type: String, required: true},
  venue: {type: mongoose.Schema.ObjectId, ref: 'Venue'},
  description: {type: String, required: true},
  image: String,
  attendees: [],
  comments: [{
    content: { type: String, required: true }
  }]

});

module.exports = mongoose.model('Event', eventSchema);
