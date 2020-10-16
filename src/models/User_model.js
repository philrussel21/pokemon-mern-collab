const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Define the User Schema
const User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    // this would send it to mongoose-bcrypt which would then add
    // methods to encrypt and decrpyt.
    bcrypt: true
  }
})
// encrypts the password
User.plugin(require('mongoose-bcrypt'));
module.exports = mongoose.model('User', User)