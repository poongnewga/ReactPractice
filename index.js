// commonJS - Node.js support commonJS
// cf. React support ES2015 import module
const express = require('express');
// mongoose for mongodb
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./model/User');
// import source code from another file.
require('./services/passport');



mongoose.connect(keys.mongoURI);

const app = express();

// Use body-parser middleware
app.use(bodyParser.json());

app.use(
  cookieSession({
    // set Expire duration - 30days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // use for cookie encryption. Should be Array
    keys: [keys.cookieKey]
  })
);

// Make passport to use cookie
app.use(passport.initialize());
app.use(passport.session());


// import function from another file and call immediately.
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// Dynamic Port Binding using
// environment variable on HEROKU
// If there is no ENV, use 5000.
const PORT = process.env.PORT || 5000;
app.listen(PORT);













//
