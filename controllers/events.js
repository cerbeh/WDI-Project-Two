const Event = require('../models/event');
const Venue = require('../models/venue');

function eventIndex(req, res) {
  Event
    .find()
    .exec()
    .then((events) => {
      res.render('events/index', {events});
    });
}

function eventNew(req, res) {
  const template = Event.schema.obj;
  res.render('events/create', {template});
}

function eventCreate(req, res, next) {
  const eventData = req.body;
  eventData['creator'] = res.locals.currentUser.id;

  Event.create(eventData)
    .then((event) => {
      Venue
        .findById(event.venue)
        .then((venue) =>{
          venue.events.push(event.id);
          venue.save();
          next();
        });
      res.redirect(`events/${event._id}`);
    });
}

function eventShow(req, res) {
  Event
    .findById(req.params.id)
    .populate('venue')
    .populate('attendees')
    .populate('creator')
    .exec()
    .then((event) => {
      res.render('events/show', {event});
    });
}

function eventDelete(req, res) {
  Event
    .findById(req.params.id)
    .exec()
    .then(event => {
      event.remove();
      return res.redirect('/events');
    });
}

/*
##########################
###Comments Controllers###
##########################
*/

function commentCreate(req, res, next) {
  Event
    .findById(req.params.id)
    .then(event => {
      event.comments.push(req.body);
      return event.save();
    })
    .then(event=> res.redirect(`/events/${event._id}`))
    .catch(next);
}

function commentDelete(req, res, next) {
  Event
    .findById(req.params.id)
    .then(event => {
      const comment = event.comments.id(req.params.commentId);
      comment.remove();
      return event.save();
    })
    .then(event => res.redirect(`/events/${event._id}`))
    .catch(next);
}

function eventAttending(req, res) {
  Event
    .findById(req.params.id)
    .then(event => {
      const user = res.locals.currentUser;
      event.attendees.push(res.locals.currentUser);
      event.save();
      user.eventsAttending.push(event);
      user.save();
      res.redirect(`/events/${event._id}`);
    });
}

module.exports = {
  index: eventIndex,
  new: eventNew,
  create: eventCreate,
  show: eventShow,
  delete: eventDelete,
  createComment: commentCreate,
  deleteComment: commentDelete,
  attend: eventAttending
};
