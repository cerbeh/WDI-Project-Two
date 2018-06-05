const User = require('../models/user');

function newSession(req, res) {
  res.render('sessions/new');
}

function createSession(req, res) {
  User
    .findOne({email: req.body.email})
    .then(user => {
      console.log(user);
      if(!user || !user.validatePassword(req.body.password)){
        return res.status(401).render('sessions/new', {message: 'Unrecognised Credentials'});
      }
      req.session.userId = user.id;
      return res.redirect('/');
    });
}

module.exports = {
  new: newSession,
  create: createSession
};
