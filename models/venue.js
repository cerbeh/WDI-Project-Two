const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({

  name: {type: String, required: true},
  capacity: {type: Number, required: true},
  image: String,
  description: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  ageLimit: {type: Number, require: true},
  comments: [{
    content: { type: String, required: true }
  }],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
  location: {type: String, required: true}
},{
  timestamps: true
});

module.exports = mongoose.model('Venue', venueSchema);
