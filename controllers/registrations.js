const User = require('../models/user');

function userNew(req, res) {
  const template = User.schema.obj;
  res.render('registration/new', {template});
}

function userCreate(req, res){
  User
    .create(req.body)
    .then((user)=>{
      console.log(user);
      res.redirect('/users');
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  new: userNew,
  create: userCreate
};
