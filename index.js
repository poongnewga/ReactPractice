// commonJS - Node.js support commonJS
// cf. React support ES2015 import module
const express = require('express');
// import Passport for Google OAuth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// import Keys
const keys = require('./config/keys');



const app = express();

// Seperate Keys - config/keys.js
// clientID =
// clientSecret =

// Set Strategy
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback",
  },
  (accessToken) => {
    console.log(accessToken);
  }
));


// // Make Route handler - Node 8 support Arrow Func.
// app.get('/', (req,res) => {
//   // respond with a simple JSON
//   res.send({bye: 'buddy'});
// });


app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));



// Dynamic Port Binding using
// environment variable on HEROKU
// If there is no ENV, use 5000.
const PORT = process.env.PORT || 5000;
app.listen(PORT);













//
