const Event = require('../models/event');

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

function eventCreate(req, res) {
  Event
    .create(req.body)
    .then((event) => {
      res.redirect(`events/${event._id}`);
    });
}

function eventShow(req, res) {
  Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      res.render('events/show', {event});
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


module.exports = {
  index: eventIndex,
  new: eventNew,
  create: eventCreate,
  show: eventShow,
  createComment: commentCreate,
  deleteComment: commentDelete
};
