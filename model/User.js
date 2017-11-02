const mongoose = require('mongoose');
// ES6 destructuring
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);
