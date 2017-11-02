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
  },
  // There are 4 data from Google.
  (accessToken, refreshToken, profile, done) => {
    // Check Existing ID
    User.findOne({ googleId: profile.id })
        .then((existUser) => {
          if (existUser) {
            // console.log('yes');
            done(null, existUser);
          } else {
            // console.log('no');
            // Add new User
            new User({googleId: profile.id})
              .save()
              .then(user => done(null, user));
          }
        });
  }
));
