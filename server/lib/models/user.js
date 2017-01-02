const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({

  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  location: String,
  ghaccess: String, 
  github: { type: {} },
  linkedIn: { type: {} },
  twitter: { type: {} }

});


userSchema.methods.generateHash = function( password ) {
  return this.password = bcrypt.hashSync( password, 10 );
};

userSchema.methods.compareHash = function( password ) {
  return bcrypt.compareSync( password, this.password );
};


module.exports = mongoose.model('User', userSchema);

