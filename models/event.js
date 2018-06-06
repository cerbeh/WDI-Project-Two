const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

  name: {type: String, required: true},
  venue: {type: mongoose.Schema.ObjectId, ref: 'Venue'},
  creator: { type: mongoose.Schema.ObjectId, ref: 'User' },
  description: {type: String, required: true},
  image: String,
  attendees: [ {type: mongoose.Schema.ObjectId, ref: 'User'}],
  comments: [{
    content: { type: String, required: true },
    creator: { type: mongoose.Schema.ObjectId, ref: 'User'}
  }]
},{
  timestamps: true
});

//There will be a pre-save here for checking age limits against venue age limit

module.exports = mongoose.model('Event', eventSchema);
