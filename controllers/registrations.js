const User = require('../models/user');

function userNew(req, res) {
  res.render('registration/new');
}

function userCreate(req, res){
  User
    .create(req.body)
    .then((user)=>{
      console.log(user);
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  new: userNew,
  create: userCreate
};
