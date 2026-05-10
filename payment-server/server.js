// Simple payment server — run with: node server.js
// Deploy free on: Railway, Render, or Fly.io
//
// Required env vars:
//   STRIPE_SECRET_KEY  — your sk_live_... key
//   ALLOWED_ORIGIN     — your frontend URL e.g. https://yoursite.com

const express = require('express');
const cors    = require('cors');
const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app    = express();
const PORT   = process.env.PORT || 3000;
const ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:4200';

app.use(cors({ origin: ORIGIN }));
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'eur', description = '' } = req.body;

    if (!amount || amount < 100) {
      return res.status(400).json({ error: 'Minimum amount is €1.00' });
    }

    const intent = await stripe.paymentIntents.create({
      amount,       // in cents — e.g. 5000 = €50.00
      currency,
      description,
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: intent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Payment server running on port ${PORT}`));
