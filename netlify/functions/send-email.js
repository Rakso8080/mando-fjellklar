'use strict';

/* ── M&O — E-posttjeneste via Resend ─────────────────────
   Miljøvariabler (Netlify Dashboard):
     RESEND_API_KEY   — re_...  (resend.com)
     SHOP_EMAIL       — e-posten til butikken (f.eks. post@mando.no)
──────────────────────────────────────────────────────── */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SHOP_EMAIL     = process.env.SHOP_EMAIL || 'post@mando.no';
const FROM_EMAIL     = 'M&O <no-reply@mando-fjellklar.netlify.app>';

async function sendEmail(payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + RESEND_API_KEY,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Resend feil: ' + res.status);
  return res.json();
}

function orderConfirmHTML(data) {
  const rows = (data.items || []).map(function(i) {
    return '<tr><td style="padding:8px 0;border-bottom:1px solid #e4e2da;font-size:13px;color:#38372f">' + i.name + ' · ' + i.size + '</td><td style="padding:8px 0;border-bottom:1px solid #e4e2da;text-align:right;font-size:13px;color:#2d3a2a;font-weight:500">' + (i.price * i.qty).toLocaleString('no') + ' kr</td></tr>';
  }).join('');
  return `<!DOCTYPE html><html lang="no"><body style="margin:0;padding:0;background:#f4f8f3;font-family:'DM Sans',Helvetica,sans-serif">
<div style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.06)">
  <div style="background:#2d3a2a;padding:32px 36px;text-align:center">
    <p style="font-family:Georgia,serif;font-size:28px;font-weight:600;letter-spacing:.18em;color:#fff;margin:0">M&amp;O</p>
    <p style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-top:4px">Mountain &amp; Outdoor</p>
  </div>
  <div style="padding:36px">
    <h1 style="font-family:Georgia,serif;font-size:22px;font-weight:500;color:#2d3a2a;margin-bottom:8px">Takk for bestillingen! 🎉</h1>
    <p style="font-size:14px;color:#7a786f;margin-bottom:24px">Vi har mottatt din bestilling og behandler den nå. Forventet levering: 1–3 virkedager.</p>
    <div style="background:#f4f8f3;border-radius:10px;padding:20px;margin-bottom:20px">
      <p style="font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#a8a59b;font-weight:600;margin-bottom:14px">Ordresammendrag</p>
      <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
      <div style="display:flex;justify-content:space-between;margin-top:14px;padding-top:14px;border-top:2px solid #e4e2da">
        <span style="font-size:15px;font-weight:500;color:#38372f">Total</span>
        <span style="font-family:Georgia,serif;font-size:18px;color:#2d3a2a;font-weight:600">${data.total} kr</span>
      </div>
    </div>
    <p style="font-size:12px;color:#a8a59b;text-align:center">Ordrenummer: <strong style="color:#7a786f">${data.orderNum}</strong></p>
    <div style="margin-top:28px;padding-top:24px;border-top:1px solid #e4e2da;font-size:12.5px;color:#a8a59b;line-height:1.7">
      <strong style="color:#7a786f">Spørsmål?</strong> Svar på denne e-posten eller besøk <a href="https://mando-fjellklar.netlify.app/faq.html" style="color:#4a6741">mando-fjellklar.netlify.app</a>
    </div>
  </div>
</div>
</body></html>`;
}

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Not allowed' };
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY mangler — e-post ikke sendt');
    return { statusCode: 200, body: JSON.stringify({ ok: true, note: 'no-key' }) };
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); }
  catch { return { statusCode: 400, body: JSON.stringify({ error: 'Ugyldig body' }) }; }

  try {
    if (body.type === 'order-confirm' && body.email) {
      await sendEmail({
        from: FROM_EMAIL,
        to: [body.email],
        subject: 'Bestilling bekreftet — ' + (body.orderNum || ''),
        html: orderConfirmHTML(body),
      });
    } else if (body.type === 'contact-seller') {
      await sendEmail({
        from: FROM_EMAIL,
        to: [SHOP_EMAIL],
        reply_to: body.from,
        subject: 'Spørsmål om: ' + (body.product || ''),
        html: '<p><strong>Fra:</strong> ' + body.fromName + ' (' + body.from + ')</p>' +
              '<p><strong>Produkt:</strong> ' + body.product + '</p>' +
              '<p><strong>Melding:</strong><br>' + body.message.replace(/\n/g, '<br>') + '</p>',
      });
    }
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch(err) {
    console.error('send-email error:', err.message);
    return { statusCode: 200, body: JSON.stringify({ ok: true, note: 'email-failed' }) };
  }
};
