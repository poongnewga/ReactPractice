const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  app.post('/api/stripe', async (req,res) => {
    // check if user exists
    if (!req.user) {
      return res.status(401).send({error: "You Must Login!"});
    }

    // with bodyparser, req.body is usable
    // console.log(req.body);
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });
    // console.log(charge);

    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
