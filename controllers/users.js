const User = require('../models/user');

function userIndex(req, res) {
  User
    .find()
    .exec()
    .then((users) => {
      res.render('users/index', {users});
    });
}

module.exports = {
  index: userIndex
};
