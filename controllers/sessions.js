const User = require('../models/user');

function newSession(req, res) {
  res.render('sessions/new');
}

function createSession(req, res) {
  User
    .findOne({email: req.body.email})
    .then((user) => {
      console.log(user.id);
      if(!user || !user.validatePassword(req.body.password)){
        return res.status(401).render('sessions/new', {message: 'Incorrect Email or Password'});
      }
      req.session.userId = user.id;
      return res.redirect(`/users/${user.id}`);
    });
}

function deleteSession(req, res) {
  return req.session.regenerate(() => res.redirect('/login'));
}

module.exports = {
  new: newSession,
  create: createSession,
  delete: deleteSession
};
