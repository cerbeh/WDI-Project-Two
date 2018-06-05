const Venue = require('../models/venue');

function venueIndex(req, res) {
  Venue
    .find()
    .exec()
    .then((venues) => {
      res.render('venues/index', {venues});
    });
}

function venueNew(req, res) {
  const template = Venue.schema.obj;
  res.render('venues/new', {template});
}

function venueCreate(req, res) {
  const venueData = req.body;
  venueData['creator'] = res.locals.currentUser.id;
  Venue
    .create(req.body)
    .then((venue) => {
      res.redirect(`venues/${venue._id}`);
    });
}

function venueShow(req, res) {
  Venue
    .findById(req.params.id)
    .populate('creator')
    .exec()
    .then((venue) => {
      res.render('venues/show', {venue});
    });
}

function venueEdit(req, res) {
  Venue
    .findById(req.params.id)
    .exec()
    .then((venue) => {
      res.render('venues/edit', {venue});
    });
}

function venueUpdate(req, res) {
  Venue
    .findById(req.params.id)
    .update(req.body)
    .exec()
    .then(() => {
      return res.redirect(`/venues/${req.params.id}`);
    });
}

function venueDelete(req, res) {
  Venue
    .findById(req.params.id)
    .exec()
    .then(venue => {
      venue.remove();
      return res.redirect('/venues');
    });
}

/*
##########################
###Comments Controllers###
##########################
*/

function commentCreate(req, res, next) {
  Venue
    .findById(req.params.id)
    .then(venue => {
      venue.comments.push(req.body);
      return venue.save();
    })
    .then(venue=> res.redirect(`/venues/${venue._id}`))
    .catch(next);
}

function commentDelete(req, res, next) {
  Venue
    .findById(req.params.id)
    .then(venue => {
      const comment = venue.comments.id(req.params.commentId);
      comment.remove();
      return venue.save();
    })
    .then(venue => res.redirect(`/venues/${venue._id}`))
    .catch(next);
}

module.exports = {
  index: venueIndex,
  new: venueNew,
  create: venueCreate,
  show: venueShow,
  edit: venueEdit,
  update: venueUpdate,
  delete: venueDelete,
  createComment: commentCreate,
  deleteComment: commentDelete
};
