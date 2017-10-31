// import Passport for Google OAuth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// import Keys
// Seperate Keys - ../config/keys.js
// clientID =
// clientSecret =
const keys = require('../config/keys');

// Set Strategy
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback",
  },
  // There are 4 data from Google.
  (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
  }
));
