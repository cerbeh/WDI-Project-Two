const User = require('../models/user');

function userIndex(req, res) {
  User
    .find()
    .exec()
    .then((users) => {
      res.render('users/index', {users});
    });
}

function userShow(req, res) {
  User
    .findById(req.params.id)
    .populate('venues')
    .populate('eventsAttending')
    .exec()
    .then(user => {
      res.render('users/show', {user});
    });
}

function userEdit(req, res) {
  const template = User.schema.obj;
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      return res.render('users/edit', {template, user});
    });
}

function userUpdate(req, res) {
  User
    .findById(req.params.id)
    .update(req.body)
    .exec()
    .then(() => {
      return res.redirect(`/users/${req.params.id}`);
    });
}

function userDelete(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      user.remove();
      return res.redirect('/users');
    });
}

module.exports = {
  index: userIndex,
  show: userShow,
  edit: userEdit,
  update: userUpdate,
  delete: userDelete
};
