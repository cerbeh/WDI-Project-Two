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


eventSchema.virtual('capacity')
  .get(function () {
    return this.venue.capacity;
  });

eventSchema.virtual('attending')
  .get(function () {
    return this.attendees.map(element => {
      return element.id;
    });
  });

// in the view you can call <% if(event.canAttend(user)){}%>

eventSchema.methods.canAttend = function(user){
  function getAge(DOB) {
    const today = new Date();
    const birthDate = new Date(DOB);
    return today.getFullYear() - birthDate.getFullYear();
  }
  console.log(this.attending);

  return !this.attending.includes(user.id) &&
  this.attendees.length < this.capacity &&
  getAge(user.profile['DOB']) > this.venue['ageLimit'];
};

module.exports = mongoose.model('Event', eventSchema);
