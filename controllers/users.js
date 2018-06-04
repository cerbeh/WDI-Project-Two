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
    .populate('profile')
    .exec()
    .then(user => {
      res.render('users/show', {user});
    });

}

module.exports = {
  index: userIndex,
  show: userShow
};
