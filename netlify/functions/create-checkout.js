/* ── M&O — Stripe Checkout Session creator ──────────────
   Netlify serverless-funksjon med sikkerhetslag:
   - Rate limiting (5 req/min per IP)
   - CORS-sjekk
   - Input-validering og lengdebegrensning
   - Feilhåndtering som ikke lekker intern info

   Miljøvariabler (sett i Netlify Dashboard):
     STRIPE_RESTRICTED_KEY  — rk_live_... (checkout_sessions:write)
     ALLOWED_ORIGIN         — https://ditt-nettsted.no
──────────────────────────────────────────────────────── */

'use strict';

const stripe = require('stripe')(process.env.STRIPE_RESTRICTED_KEY, {
  apiVersion: '2026-05-27.dahlia',
});

/* ── Rate limiting (in-memory, per cold start) ──────── */
const rateLimits = new Map();
const RATE_WINDOW_MS = 60 * 1000; // 1 minutt
const RATE_MAX       = 5;          // maks 5 forespørsler per minutt per IP

function isRateLimited(ip) {
  const now = Date.now();
  let rec = rateLimits.get(ip);
  if (!rec || now > rec.expires) {
    rec = { count: 0, expires: now + RATE_WINDOW_MS };
  }
  rec.count++;
  rateLimits.set(ip, rec);
  /* Rydd opp gamle oppføringer (unngå minnelekkasje) */
  if (rateLimits.size > 1000) {
    for (const [k, v] of rateLimits) {
      if (Date.now() > v.expires) rateLimits.delete(k);
    }
  }
  return rec.count > RATE_MAX;
}

/* ── Validering ─────────────────────────────────────── */
const MAX_ITEMS       = 20;
const MAX_PRICE_NOK   = 50000;  // 50 000 kr per linje
const MAX_NAME_LEN    = 200;
const MAX_DESC_LEN    = 500;

function isValidUrl(str) {
  try {
    const u = new URL(str);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch { return false; }
}

function sanitizeStr(str, maxLen) {
  return String(str || '').slice(0, maxLen).replace(/[<>"']/g, '');
}

/* ── Handler ─────────────────────────────────────────── */
exports.handler = async function(event) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  const corsHeaders = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  /* Preflight */
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  /* CORS-sjekk */
  if (allowedOrigin !== '*') {
    const origin = event.headers.origin || event.headers.Origin || '';
    if (origin !== allowedOrigin) {
      return { statusCode: 403, headers: corsHeaders, body: JSON.stringify({ error: 'Forbidden' }) };
    }
  }

  /* Rate limiting */
  const ip = (event.headers['x-forwarded-for'] || 'unknown').split(',')[0].trim();
  if (isRateLimited(ip)) {
    return {
      statusCode: 429,
      headers: { ...corsHeaders, 'Retry-After': '60' },
      body: JSON.stringify({ error: 'For mange forespørsler. Vent litt og prøv igjen.' }),
    };
  }

  /* Parse body */
  let lineItems, successUrl, cancelUrl;
  try {
    const body = JSON.parse(event.body || '{}');
    lineItems  = body.lineItems;
    successUrl = body.successUrl;
    cancelUrl  = body.cancelUrl;
  } catch {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Ugyldig forespørsel' }) };
  }

  /* Valider linjeposter */
  if (!Array.isArray(lineItems) || lineItems.length === 0 || lineItems.length > MAX_ITEMS) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Ugyldig antall produkter' }) };
  }

  for (const item of lineItems) {
    if (typeof item.name !== 'string' || !item.name.trim()) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Manglende produktnavn' }) };
    }
    if (!Number.isFinite(item.price) || item.price <= 0 || item.price > MAX_PRICE_NOK) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Ugyldig pris' }) };
    }
    if (!Number.isInteger(item.qty) || item.qty < 1 || item.qty > 10) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Ugyldig antall' }) };
    }
  }

  /* Valider URL-er */
  if (!isValidUrl(successUrl) || !isValidUrl(cancelUrl)) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Ugyldig URL' }) };
  }

  /* Opprett Stripe Checkout Session */
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems.map(item => ({
        price_data: {
          currency: 'nok',
          product_data: {
            name: sanitizeStr(item.name, MAX_NAME_LEN),
            description: item.description ? sanitizeStr(item.description, MAX_DESC_LEN) : undefined,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.qty,
      })),
      success_url: successUrl,
      cancel_url: cancelUrl,
      shipping_address_collection: { allowed_countries: ['NO', 'SE', 'DK', 'FI'] },
      phone_number_collection: { enabled: true },
      locale: 'nb',
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    /* Logg fullt, men send generell feilmelding til klient */
    console.error('[Stripe]', err.type, err.message);
    return {
      statusCode: 502,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Betalingstjenesten er midlertidig utilgjengelig. Prøv igjen.' }),
    };
  }
};
