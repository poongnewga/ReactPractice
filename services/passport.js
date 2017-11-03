// import Passport for Google OAuth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
// import Keys
// Seperate Keys - ../config/keys.js
// clientID =
// clientSecret =
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  console.log("SERIALIZE!!");
  // MongoID shortcut, not googleID
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("DESERIALIZE!!");
  User.findById(id).then(user => {
      done(null, user);
    })
});

// Set Strategy
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback",
    proxy: true
  },
  // There are 4 data from Google.
  async (accessToken, refreshToken, profile, done) => {
    // Check Existing ID
    const existUser = await User.findOne({ googleId: profile.id });

    if (existUser) {
      // console.log('yes');
      return done(null, existUser);
    }

    // console.log('no');
    // Add new User
    const user = await new User({googleId: profile.id}).save();
    done(null, user);
    
  }
));
