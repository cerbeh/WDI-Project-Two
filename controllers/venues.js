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
  Venue
    .create(req.body)
    .then((venue) => {
      res.redirect(`venues/${venue._id}`);
    });
}

function venueShow(req, res) {
  Venue
    .findById(req.params.id)
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
    .then((venue) => {
      return res.redirect(`/venues/${venue._id}`);
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

module.exports = {
  index: venueIndex,
  new: venueNew,
  create: venueCreate,
  show: venueShow,
  edit: venueEdit,
  update: venueUpdate,
  delete: venueDelete
};
