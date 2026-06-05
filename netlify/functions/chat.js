'use strict';

/* ── M&O Chatbot — Claude Haiku via Anthropic API ───────
   Miljøvariabel: ANTHROPIC_API_KEY (sett i Netlify Dashboard)
──────────────────────────────────────────────────────── */

const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM = `Du er M&O-assistenten, en vennlig og kunnskapsrik kundeservice-assistent for M&O (Mountain & Outdoor) — en norsk nettbutikk for fjellklær og friluftsutstyr.

## Om M&O
Nettbutikk som selger kvalitetsfjellklær, både splitter nytt og pent brukt, opptil 60% under vanlig butikkpris. Alle brukte varer er vasket, kvalitetskontrollert og ærlig beskrevet.

## Produkter (utvalg)
**Nytt sortiment:**
- Norrøna Falketind Gore-Tex Jacket — 2 490 kr (orig. 3 299 kr), størrelser S/M/L/XL
- Bergans Fløyen Insulated Pants — 890 kr (orig. 1 199 kr), XS–XL
- Helly Hansen Odin Fleece Midlayer — 649 kr (orig. 899 kr), S–XXL
- Kari Traa Rose Wool Base Layer — 399 kr (orig. 549 kr), XS–L
- Mammut Convey Tour HS Hooded Jacket — 3 100 kr (orig. 4 499 kr), S–XL
- Black Diamond Crag Pants — 1 100 kr (orig. 1 599 kr), 28–34
- Fjällräven Keb Eco-Shell Jacket — 2 800 kr (orig. 3 999 kr), XS–XL
- Salomon Outline Prism GTX Shoes — 1 390 kr (orig. 1 799 kr), EU 39–45

**Brukt sortiment:**
- Arc'teryx Beta AR Jacket str. M — 2 100 kr (orig. 5 499 kr), Topptrim
- Patagonia R1 TechFace Hoody str. L — 549 kr (orig. 1 799 kr), Turerfaren
- Salomon X Ultra 4 GTX str. 43 — 850 kr (orig. 1 749 kr), Topptrim
- Norrøna Bitihorn Dri1 Pants str. S — 299 kr (orig. 1 099 kr), Arbeidshest
- Helly Hansen Odin 9 Worlds Jacket str. XL — 1 600 kr (orig. 4 499 kr), Topptrim
- Bergans Trollhetta Jacket str. S — 750 kr (orig. 2 299 kr), Turerfaren
- Kari Traa Tikse Tights str. M — 180 kr (orig. 599 kr), Turerfaren
- Black Diamond Stance Beanie — 80 kr (orig. 299 kr), Topptrim

## Standbeskrivelser
- **Topptrim**: Brukt 1–3 ganger eller aldri. Ingen synlige bruksmerker. Som ny.
- **Turerfaren**: Noe pilling eller lett misfarging. Full teknisk funksjon og ser fine ut.
- **Arbeidshest**: Tydelig slitasje, men tett og varm. Alle glidelåser og membraner fungerer. Pris deretter.

## Viktig informasjon
- **Returrett**: 14 dager, OGSÅ på brukte varer. Ingen spørsmål stilles.
- **Frakt**: 69 kr standard (1–3 virkedager). GRATIS over 999 kr.
- **Betaling**: Vipps, Klarna, Visa, Mastercard, American Express
- **Merker**: Arc'teryx, Norrøna, Patagonia, Bergans, Helly Hansen, Salomon, Kari Traa, Mammut, Black Diamond, Fjällräven
- **Størrelsesveiledning**: Tilgjengelig i produktvisningen for jakker, mellomlag, bukser og sko

## Atferdsregler
1. Svar alltid på norsk, med mindre kunden skriver på engelsk — da svarer du på engelsk
2. Vær kort og presis. Maks 2–3 setninger for enkle spørsmål.
3. Bruk aldri priser eller produkter du ikke er sikker på finnes i sortimentet over
4. For komplekse ordresaker: henvis til kontaktskjemaet i footeren
5. Vær varm og personlig — du representerer et lite, lidenskapelig selskap`;

/* ── Rate limiting ──────────────────────────────────── */
const rateMap = new Map();
const RATE_WINDOW = 60_000;
const RATE_MAX    = 20;

function isRateLimited(ip) {
  const now = Date.now();
  let r = rateMap.get(ip);
  if (!r || now > r.e) r = { n: 0, e: now + RATE_WINDOW };
  r.n++;
  rateMap.set(ip, r);
  if (rateMap.size > 500) {
    for (const [k, v] of rateMap) if (Date.now() > v.e) rateMap.delete(k);
  }
  return r.n > RATE_MAX;
}

/* ── Handler ─────────────────────────────────────────── */
exports.handler = async function(event) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
  if (event.httpMethod !== 'POST')   return { statusCode: 405, headers, body: JSON.stringify({ content: 'Ikke tillatt' }) };

  const ip = (event.headers['x-forwarded-for'] || 'x').split(',')[0].trim();
  if (isRateLimited(ip)) {
    return { statusCode: 429, headers, body: JSON.stringify({ content: 'Du sender for mange meldinger. Vent litt og prøv igjen.' }) };
  }

  let messages;
  try {
    ({ messages } = JSON.parse(event.body || '{}'));
    if (!Array.isArray(messages)) throw new Error();
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ content: 'Ugyldig forespørsel' }) };
  }

  /* Sanitér og begrens */
  const safe = messages
    .filter(m => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map(m => ({ role: m.role, content: m.content.slice(0, 800) }))
    .slice(-10); /* kun siste 10 meldinger for kontekst */

  if (!safe.length) {
    return { statusCode: 400, headers, body: JSON.stringify({ content: 'Ingen melding å behandle' }) };
  }

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 350,
      system: SYSTEM,
      messages: safe,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ content: response.content[0].text }),
    };
  } catch (err) {
    console.error('[Chat] Claude error:', err.type, err.message);
    return {
      statusCode: 200, /* 200 slik at frontend viser fallback-tekst, ikke feilhåndtering */
      headers,
      body: JSON.stringify({ content: 'Beklager, assistenten er ikke tilgjengelig akkurat nå. Ta kontakt via skjemaet i footeren — vi svarer raskt! 😊' }),
    };
  }
};
