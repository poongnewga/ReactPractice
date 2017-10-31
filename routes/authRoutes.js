const passport = require('passport');

// Simple trick for app variable by using function
// It will be called with 'app' in index.js
module.exports = app => {
  // // Make Route handler - Node 8 support Arrow Func.
  // app.get('/', (req,res) => {
  //   // respond with a simple JSON
  //   res.send({bye: 'buddy'});
  // });
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  // use 'code' from google server
  app.get('/auth/google/callback', passport.authenticate('google'));
};
