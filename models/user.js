const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: { type: String, unique: true, required: true},
  password: { type: String, required: true },
  profile: {
    firstName: String,
    secondName: String,
    DOB: Date,
    interests: String,
    image: { type: String, patter: /^https?:\/\/.+/}
  }
},{
  eventCreator: {type: Boolean},
  timestamps: true
});

userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', function(next){
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function(next){
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('password');
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
