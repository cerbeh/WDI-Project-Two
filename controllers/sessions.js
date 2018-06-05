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
      console.log(req.session);
      req.session.userId = user.id;
      console.log(req.session.userId);
      return res.redirect(`/users/${user.id}`);
    });
}

function deleteSession(req, res) {
  return req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: newSession,
  create: createSession,
  delete: deleteSession
};
