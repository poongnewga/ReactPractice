// commonJS - Node.js support commonJS
// cf. React support ES2015 import module
const express = require('express');

// import source code from another file.
require('./services/passport');

const app = express();
// import function from another file and call immediately.
require('./routes/authRoutes')(app);

// Dynamic Port Binding using
// environment variable on HEROKU
// If there is no ENV, use 5000.
const PORT = process.env.PORT || 5000;
app.listen(PORT);













//
