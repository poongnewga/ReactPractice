// commonJS - Node.js support commonJS
// cf. React support ES2015 import module
const express = require('express');
const app = express();

// Make Route handler - Node 8 support Arrow Func.
app.get('/', (req,res) => {
  // respond with a simple JSON
  res.send({hi: 'there'});
});


// Dynamic Port Binding using
// environment variable on HEROKU
// If there is no ENV, use 5000.
const PORT = process.env.PORT || 5000;
app.listen(PORT);













//
