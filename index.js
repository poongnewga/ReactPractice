// commonJS - Node.js support commonJS
// cf. React support ES2015 import module
const express = require('express');
const app = express();

// Make Route handler - Node 8 support Arrow Func.
app.get('/', (req,res) => {
  // respond with a simple JSON
  res.send({hi: 'there'});
});

// listen at port 5000
app.listen(5000);













//
