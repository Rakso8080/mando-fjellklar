'use strict';

/* ── M&O — Stripe Webhook handler ────────────────────────
   Oppsett:
   1. Stripe Dashboard → Developers → Webhooks → Add endpoint
   2. URL: https://mando-fjellklar.netlify.app/.netlify/functions/stripe-webhook
   3. Events: checkout.session.completed
   4. Kopier "Signing secret" → Netlify env: STRIPE_WEBHOOK_SECRET
──────────────────────────────────────────────────────── */

const stripe = require('stripe')(process.env.STRIPE_RESTRICTED_KEY, {
  apiVersion: '2026-05-27.dahlia',
});

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sig     = event.headers['stripe-signature'];
  const secret  = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret) {
    console.error('STRIPE_WEBHOOK_SECRET mangler — webhook avvist');
    return { statusCode: 500, body: JSON.stringify({ error: 'Server misconfigured' }) };
  }

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, secret);
  } catch(err) {
    console.error('Webhook signatur-feil:', err.message);
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid signature' }) };
  }

  switch (stripeEvent.type) {
    case 'checkout.session.completed': {
      const session = stripeEvent.data.object;
      console.log('Betaling fullført:', {
        id:        session.id,
        total:     session.amount_total,
        email:     session.customer_details?.email,
        name:      session.customer_details?.name,
      });
      /* Her kan du: sende bekreftelse-e-post, oppdatere lager, notifisere admin */
      break;
    }
    case 'checkout.session.expired': {
      console.log('Checkout utløpt:', stripeEvent.data.object.id);
      break;
    }
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
