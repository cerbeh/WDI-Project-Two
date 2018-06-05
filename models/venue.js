const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({

  name: {type: String, required: true},
  capacity: {type: Number, required: true},
  location: {type: String, required: true},
  image: String,
  description: String,
  ageLimit: {type: Number, require: true},
  comments: [{
    content: { type: String, required: true }
  }],
  events: [],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
},{
  timestamps: true
});

module.exports = mongoose.model('Venue', venueSchema);
