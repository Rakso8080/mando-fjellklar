/* ═══════════════════════════════════════════════════════
   M&O — app.js  (shared across all pages)
═══════════════════════════════════════════════════════ */

/* ── DATA ─────────────────────────────────────────────── */
var MO = window.MO || {};

MO.products = [
  {id:'n1',brand:'Norrøna',name:'Falketind Gore-Tex Jacket',price:2490,oldPrice:3299,sizes:['S','M','L','XL'],cat:'jakker',type:'nytt',features:['Gore-Tex 3-lags membran','Justerbar hette med visir','Ventilasjonslommer','Resirkulert materiale']},
  {id:'n2',brand:'Bergans',name:'Fløyen Insulated Pants',price:890,oldPrice:1199,sizes:['XS','S','M','L','XL'],cat:'bukser',type:'nytt',features:['PrimaLoft isolasjon','Slank passform','Sideglidelåser','Vannavstøtende overflate']},
  {id:'n3',brand:'Helly Hansen',name:'Odin Fleece Midlayer',price:649,oldPrice:899,sizes:['S','M','L','XL','XXL'],cat:'mellomlag',type:'nytt',features:['Polartec Power Stretch','Stretch-panel i sidene','Brystlomme','Kan brukes alene']},
  {id:'n4',brand:'Kari Traa',name:'Rose Wool Base Layer',price:399,oldPrice:549,sizes:['XS','S','M','L'],cat:'mellomlag',type:'nytt',features:['100% merinoull','Naturlig temperaturregulering','Luktresistent','GOTS-sertifisert']},
  {id:'n5',brand:'Mammut',name:'Convey Tour HS Hooded Jacket',price:3100,oldPrice:4499,sizes:['S','M','L','XL'],cat:'jakker',type:'nytt',features:['Mammut DRYtechnology','Integrert justerbar hette','Packable design','2.5-lags konstruksjon']},
  {id:'n6',brand:'Black Diamond',name:'Crag Pants',price:1100,oldPrice:1599,sizes:['28','30','32','34'],cat:'bukser',type:'nytt',features:['Stretch-nylon','Klatreoptimalisert passform','Kne-ledd','Gusseted crotch']},
  {id:'n7',brand:'Fjällräven',name:'Keb Eco-Shell Jacket',price:2800,oldPrice:3999,sizes:['XS','S','M','L','XL'],cat:'jakker',type:'nytt',features:['Eco-Shell membran','Resirkulerte materialer','3 utvendige lommer','Hette med stivt visir']},
  {id:'n8',brand:'Salomon',name:'Outline Prism GTX Shoes',price:1390,oldPrice:1799,sizes:['39','40','41','42','43','44','45'],cat:'sko',type:'nytt',features:['Gore-Tex membran','Contagrip XT sål','EnergyCell+ demping','Quicklace system']},
  {id:'b1',brand:"Arc'teryx",name:'Beta AR Jacket — Str. M',price:2100,oldPrice:5499,cond:'Topptrim',condDesc:'Brukt 2–3 ganger. Ingen synlige tegn på bruk.',sizes:['M'],cat:'jakker',type:'brukt',features:['Gore-Tex Pro 3-lags','N80p-X face fabric','WaterTight glidelåser','Magnetisk hette']},
  {id:'b2',brand:'Patagonia',name:'R1 TechFace Hoody — Str. L',price:549,oldPrice:1799,cond:'Turerfaren',condDesc:'Noe pilling på ermene. Full funksjon og vaskbar.',sizes:['L'],cat:'mellomlag',type:'brukt',features:['Polartec Power Stretch Pro','Svært stretchy og pustende','Integrert hette','Fair Trade-sertifisert']},
  {id:'b3',brand:'Salomon',name:'X Ultra 4 GTX — Str. 43',price:850,oldPrice:1749,cond:'Topptrim',condDesc:'Brukt én sesong. Lite skitt på såle, ellers som ny.',sizes:['43'],cat:'sko',type:'brukt',features:['Gore-Tex membran','Contagrip MA sål','OrthoLite innerssåle','Advanced Chassis']},
  {id:'b4',brand:'Norrøna',name:'Bitihorn Dri1 Pants — Str. S',price:299,oldPrice:1099,cond:'Arbeidshest',condDesc:'Tydelig slitasje på knær. Alle sting og glidelåser fungerer.',sizes:['S'],cat:'bukser',type:'brukt',features:['Norrøna Dri1-stoff','Pustende og lett','Glidelås i bena','Elastisk linning']},
  {id:'b5',brand:'Helly Hansen',name:'Odin 9 Worlds Jacket — XL',price:1600,oldPrice:4499,cond:'Topptrim',condDesc:'Brukt 3 ganger totalt. Som ny fra fabrikk.',sizes:['XL'],cat:'jakker',type:'brukt',features:['Helly Tech Pro 3L','Resirkulert nylon','Heldekkende glidelåser','Pakkes i egen pose']},
  {id:'b6',brand:'Bergans',name:'Trollhetta Insulated Jacket — S',price:750,oldPrice:2299,cond:'Turerfaren',condDesc:'Litt pilling innvendig. God isolasjon og tett.',sizes:['S'],cat:'jakker',type:'brukt',features:['PrimaLoft Gold isolasjon','Resirkulert face fabric','Packable i lomme','DWR-behandlet']},
  {id:'b7',brand:'Kari Traa',name:'Tikse Tights — M',price:180,oldPrice:599,cond:'Turerfaren',condDesc:'Vasket og klar. Noe pilling i skrittet.',sizes:['M'],cat:'bukser',type:'brukt',features:['Merinomix','God strekk','Bred linning','Reflekselement']},
  {id:'b8',brand:'Black Diamond',name:'Stance Beanie',price:80,oldPrice:299,cond:'Topptrim',condDesc:'Brukt 2 ganger. Ingen bruksmerker.',sizes:['One size'],cat:'tilbehor',type:'brukt',features:['Merino-blend','Stretch-passform','Kan brettes','Naturlig luktresistent']},
];

MO.findProduct = function(id) {
  return MO.products.find(function(p){ return p.id === id; }) || null;
};

/* ── CART ─────────────────────────────────────────────── */
MO.cart = JSON.parse(localStorage.getItem('mo_cart') || '[]');

MO.saveCart = function() {
  localStorage.setItem('mo_cart', JSON.stringify(MO.cart));
};

MO.addToCart = function(id, size) {
  var p = MO.findProduct(id);
  if (!p) return;
  var existing = MO.cart.find(function(i){ return i.id === id && i.size === size; });
  if (existing) { existing.qty++; }
  else { MO.cart.push({id:id, brand:p.brand, name:p.name, price:p.price, size:size, qty:1, type:p.type}); }
  MO.saveCart();
  MO.updateCartBadge();
  MO.toast(p.name.split(' ').slice(0,3).join(' ') + ' lagt i kurven');
};

MO.removeFromCart = function(id, size) {
  MO.cart = MO.cart.filter(function(i){ return !(i.id === id && i.size === size); });
  MO.saveCart();
  MO.updateCartBadge();
};

MO.cartTotal = function() {
  return MO.cart.reduce(function(s,i){ return s + i.price * i.qty; }, 0);
};

MO.updateCartBadge = function() {
  var count = MO.cart.reduce(function(s,i){ return s + i.qty; }, 0);
  document.querySelectorAll('.cart-badge').forEach(function(el){
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
};

/* ── WISHLIST ─────────────────────────────────────────── */
MO.wishlist = JSON.parse(localStorage.getItem('mo_wish') || '[]');

MO.toggleWish = function(id) {
  var idx = MO.wishlist.indexOf(id);
  var p = MO.findProduct(id);
  if (idx > -1) { MO.wishlist.splice(idx, 1); MO.toast('Fjernet fra favoritter'); }
  else { MO.wishlist.push(id); MO.toast((p ? p.name.split(' ').slice(0,3).join(' ') : 'Produkt') + ' lagt til favoritter'); }
  localStorage.setItem('mo_wish', JSON.stringify(MO.wishlist));
};

MO.isWished = function(id) { return MO.wishlist.indexOf(id) > -1; };

/* ── TOAST ─────────────────────────────────────────────── */
MO._toastTimer = null;
MO.toast = function(msg) {
  var t = document.getElementById('toast');
  if (!t) return;
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  clearTimeout(MO._toastTimer);
  MO._toastTimer = setTimeout(function(){ t.classList.remove('show'); }, 2800);
};

/* ── MODAL ─────────────────────────────────────────────── */
MO.openModal = function(title, html) {
  document.getElementById('gm-title').textContent = title;
  document.getElementById('gm-body').innerHTML = html;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
};
MO.closeModal = function() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
};

/* ── PRODUCT MODAL ─────────────────────────────────────── */
MO._selectedSize = {};
MO.openProduct = function(id) {
  var p = MO.findProduct(id);
  if (!p) return;
  var saving = Math.round((1 - p.price / p.oldPrice) * 100);
  var condHtml = p.cond ? '<span class="badge badge-' + (p.cond==='Topptrim'?'top':p.cond==='Turerfaren'?'mid':'low') + '" style="margin-bottom:8px;display:inline-flex">' + p.cond + '</span><br>' : '';
  var sizesHtml = p.sizes.map(function(s){
    return '<button class="pdm__sz" onclick="MO._selSz(this,\'' + id + '\',\'' + s + '\')">' + s + '</button>';
  }).join('');
  var featsHtml = (p.features||[]).map(function(f){
    return '<div class="pdm__feat"><span class="pdm__feat-dot"></span>' + f + '</div>';
  }).join('');
  var infoHtml =
    '<p class="pdm__brand">' + p.brand + '</p>' +
    '<h2 class="pdm__name">' + p.name + '</h2>' +
    (p.condDesc ? '<p class="pdm__cond">' + condHtml + p.condDesc + '</p>' : '') +
    '<div class="pdm__prices"><span class="pdm__price">' + p.price.toLocaleString('no-NO') + ' kr</span><span class="pdm__old">' + p.oldPrice.toLocaleString('no-NO') + ' kr</span><span class="pdm__save">–' + saving + '%</span></div>' +
    '<p class="pdm__lbl">Størrelse</p>' +
    '<div class="pdm__sizes">' + sizesHtml + '</div>' +
    '<button class="btn btn-primary btn-full btn-lg" style="margin-top:16px" onclick="MO._atcModal(\'' + id + '\')">Legg i handlekurv</button>' +
    '<button class="btn btn-ghost btn-full" style="margin-top:8px" onclick="MO.toggleWish(\'' + id + '\');MO.closePdm()">♡ Legg til favoritter</button>' +
    (featsHtml ? '<div class="pdm__features" style="margin-top:20px;padding-top:18px;border-top:1px solid var(--gray-100)">' + featsHtml + '</div>' : '');

  document.getElementById('pdm-title').textContent = p.brand + ' — ' + p.name;
  document.getElementById('pdm-body').innerHTML =
    '<div class="pdm__grid">' +
    '<div class="pdm__img"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.7" stroke-linecap="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg></div>' +
    '<div>' + infoHtml + '</div>' +
    '</div>';
  document.getElementById('pdm-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
};
MO.closePdm = function() {
  document.getElementById('pdm-overlay').classList.remove('open');
  document.body.style.overflow = '';
};
MO._selSz = function(btn, id, sz) {
  btn.closest('.pdm__sizes').querySelectorAll('.pdm__sz').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  MO._selectedSize[id] = sz;
};
MO._atcModal = function(id) {
  var p = MO.findProduct(id);
  if (!p) return;
  var sz = p.sizes.length === 1 ? p.sizes[0] : MO._selectedSize[id];
  if (!sz) { MO.toast('Velg størrelse først'); return; }
  MO.addToCart(id, sz);
  MO.closePdm();
};

/* ── CART DRAWER ─────────────────────────────────────── */
MO.openCart = function() {
  MO.renderCartDrawer();
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
};
MO.closeCart = function() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-drawer').classList.remove('open');
  document.body.style.overflow = '';
};
MO.renderCartDrawer = function() {
  var body = document.getElementById('cart-drawer-body');
  var foot = document.getElementById('cart-drawer-foot');
  if (!body) return;
  if (MO.cart.length === 0) {
    body.innerHTML = '<div class="drawer__empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><p style="font-weight:500;margin-bottom:5px">Handlekurven er tom</p><p style="font-size:13px">Finn noe du vil ha!</p><a href="index.html" class="btn btn-primary btn-sm" style="margin-top:14px;display:inline-flex">Se produkter</a></div>';
    if (foot) foot.style.display = 'none';
    return;
  }
  body.innerHTML = MO.cart.map(function(item){
    return '<div class="cart-item"><div class="cart-item__img"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg></div><div style="flex:1"><div class="cart-item__brand">' + item.brand + '</div><div class="cart-item__name">' + item.name + '</div><div class="cart-item__meta">Str. ' + item.size + (item.qty > 1 ? ' · Antall: ' + item.qty : '') + '</div><div class="cart-item__price">' + (item.price * item.qty).toLocaleString('no-NO') + ' kr</div><span class="cart-item__rm" onclick="MO.removeFromCart(\'' + item.id + '\',\'' + item.size + '\');MO.renderCartDrawer()">Fjern</span></div></div>';
  }).join('');
  if (foot) {
    foot.style.display = 'block';
    var sumEl = document.getElementById('cart-drawer-total');
    if (sumEl) sumEl.textContent = MO.cartTotal().toLocaleString('no-NO') + ' kr';
  }
};

/* ── SEARCH ─────────────────────────────────────────────── */
MO.openSearch = function() {
  document.getElementById('searchbar').classList.add('open');
  setTimeout(function(){ document.getElementById('search-input').focus(); }, 80);
};
MO.closeSearch = function() {
  document.getElementById('searchbar').classList.remove('open');
};

/* ── NAV ──────────────────────────────────────────────── */
MO.initNav = function() {
  window.addEventListener('scroll', function(){
    document.getElementById('main-nav').classList.toggle('scrolled', window.scrollY > 8);
  }, {passive:true});
  document.getElementById('search-input').addEventListener('keydown', function(e){
    if (e.key === 'Escape') MO.closeSearch();
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') { MO.closeSearch(); MO.closeCart(); MO.closeModal(); MO.closePdm(); }
  });
  MO.updateCartBadge();
};

/* ── PRODUCT CARD HTML ─────────────────────────────────── */
MO.cardHTML = function(p) {
  var saving = Math.round((1 - p.price / p.oldPrice) * 100);
  var wished = MO.isWished(p.id);
  var condBadge = p.cond ? '<span class="badge badge-' + (p.cond==='Topptrim'?'top':p.cond==='Turerfaren'?'mid':'low') + '">' + p.cond + '</span>' : '';
  return '<article class="pcard" onclick="MO.openProduct(\'' + p.id + '\')" tabindex="0" onkeydown="if(event.key===\'Enter\')MO.openProduct(\'' + p.id + '\')">' +
    '<div class="pcard__img">' +
    '<div class="pcard__img-inner"><svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.7" stroke-linecap="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg></div>' +
    '<div class="pcard__badges"><span class="badge badge-' + (p.type==='nytt'?'new':'used') + '">' + (p.type==='nytt'?'Nytt':'Brukt') + '</span>' + condBadge + '</div>' +
    '<button class="pcard__wish' + (wished?' active':'') + '" onclick="event.stopPropagation();MO.toggleWish(\'' + p.id + '\');this.classList.toggle(\'active\')" aria-label="Favoritt"><svg width="14" height="14" viewBox="0 0 24 24" fill="' + (wished?'#c0392b':'none') + '" stroke="' + (wished?'#c0392b':'currentColor') + '" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>' +
    '<div class="pcard__quick"><button class="btn btn-white btn-sm btn-full" onclick="event.stopPropagation();MO._quickAdd(\'' + p.id + '\')">+ Legg i kurv</button></div>' +
    '</div>' +
    '<div class="pcard__body">' +
    '<p class="pcard__brand">' + p.brand + '</p>' +
    '<h3 class="pcard__name">' + p.name + '</h3>' +
    (p.condDesc ? '<p class="pcard__cond">' + p.condDesc.split('.')[0] + '.</p>' : '') +
    '<div class="pcard__prices"><span class="pcard__price">' + p.price.toLocaleString('no-NO') + ' kr</span><span class="pcard__old">' + p.oldPrice.toLocaleString('no-NO') + ' kr</span><span class="pcard__save">–' + saving + '%</span></div>' +
    '</div></article>';
};

MO._quickAdd = function(id) {
  var p = MO.findProduct(id);
  if (!p) return;
  var sz = p.sizes[Math.floor(p.sizes.length/2)];
  MO.addToCart(id, sz);
};

/* ── FOOTER MODALS ─────────────────────────────────────── */
MO.modals = {
  om: {title:'Om M&O', html:'<p style="font-size:15px;line-height:1.82;color:var(--text-3)">M&O ble startet av to venner med en felles lidenskap for fjell og en felles frustrasjon over prisene i de tradisjonelle sportsbutikkene.<br><br>Vi mente at det ikke skulle koste en formue å utruste seg ordentlig. Løsningen ble å kutte alle unødvendige ledd — ingen mellommenn, ingen dyre butikklokaler — og i stedet selge direkte til deg som vil ut på tur.<br><br>I dag tilbyr vi over 400 produkter fra verdens beste merker, både splitter nye og nøye utvalgte brukte plagg. Alt er kontrollert, rengjort og ærlig beskrevet.</p><div style="display:flex;gap:10px;margin-top:20px"><a href="index.html" class="btn btn-primary" onclick="MO.closeModal()">Se sortimentet</a><button class="btn btn-ghost" onclick="MO.closeModal()">Lukk</button></div>'},
  selg: {title:'Selg klær til oss', html:'<p style="font-size:14px;color:var(--text-3);margin-bottom:18px">Send oss bilder og vi gir deg et tilbud innen 24 timer. Vi tar imot pent brukte plagg fra kjente fjellmerker.</p><div class="form-field"><label class="form-label">Navn</label><input class="form-input" placeholder="Ola Nordmann"/></div><div class="form-field"><label class="form-label">E-postadresse</label><input class="form-input" type="email" placeholder="ola@fjell.no"/></div><div class="form-field"><label class="form-label">Beskriv plaggene</label><textarea class="form-textarea" placeholder="Merke, type, størrelse, stand..."></textarea></div><button class="btn btn-primary btn-full" onclick="MO.closeModal();MO.toast(\'Forespørsel sendt! Vi svarer innen 24 timer\')">Send inn</button>'},
  kontakt: {title:'Kontakt oss', html:'<p style="font-size:14px;color:var(--text-3);margin-bottom:18px">Vi svarer vanligvis innen 1–2 virkedager på e-post.</p><div class="form-field"><label class="form-label">Navn</label><input class="form-input" placeholder="Ola Nordmann"/></div><div class="form-field"><label class="form-label">E-postadresse</label><input class="form-input" type="email" placeholder="ola@fjell.no"/></div><div class="form-field"><label class="form-label">Melding</label><textarea class="form-textarea" placeholder="Hva lurer du på?"></textarea></div><button class="btn btn-primary btn-full" onclick="MO.closeModal();MO.toast(\'Melding sendt! Takk for at du tok kontakt\')">Send melding</button>'},
  frakt: {title:'Frakt & levering', html:'<div style="display:flex;flex-direction:column;gap:12px"><div style="background:var(--g10);border-radius:10px;padding:16px"><p style="font-weight:500;margin-bottom:4px">Standardlevering</p><p style="font-size:13px;color:var(--text-3)">1–3 virkedager · 69 kr<br>Gratis frakt over 999 kr</p></div><div style="background:var(--g10);border-radius:10px;padding:16px"><p style="font-weight:500;margin-bottom:4px">Ekspress (neste dag)</p><p style="font-size:13px;color:var(--text-3)">Bestilling innen kl. 12.00 · 149 kr</p></div><div style="background:var(--g10);border-radius:10px;padding:16px"><p style="font-weight:500;margin-bottom:4px">PostNord hentested</p><p style="font-size:13px;color:var(--text-3)">2–4 virkedager · 49 kr · Gratis over 799 kr</p></div></div>'},
  retur: {title:'Retur & bytte', html:'<p style="font-size:15px;color:var(--text-3);margin-bottom:18px;line-height:1.7">14 dagers returrett — også på brukte varer. Ingen spørsmål stilles.</p><div style="display:flex;flex-direction:column;gap:12px"><div style="display:flex;gap:12px;align-items:flex-start"><div style="width:22px;height:22px;background:var(--g9);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;font-size:11px;font-weight:600;color:var(--g3)">1</div><p style="font-size:14px;color:var(--text-3)">Logg inn og gå til "Mine ordrer"</p></div><div style="display:flex;gap:12px;align-items:flex-start"><div style="width:22px;height:22px;background:var(--g9);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;font-size:11px;font-weight:600;color:var(--g3)">2</div><p style="font-size:14px;color:var(--text-3)">Velg produktet og klikk "Start retur"</p></div><div style="display:flex;gap:12px;align-items:flex-start"><div style="width:22px;height:22px;background:var(--g9);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;font-size:11px;font-weight:600;color:var(--g3)">3</div><p style="font-size:14px;color:var(--text-3)">Pakk inn og lever på nærmeste Post i Butikk</p></div><div style="display:flex;gap:12px;align-items:flex-start"><div style="width:22px;height:22px;background:var(--g9);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;font-size:11px;font-weight:600;color:var(--g3)">4</div><p style="font-size:14px;color:var(--text-3)">Refusjon til kortbetaling innen 3–5 virkedager</p></div></div>'},
  baerekraft: {title:'Bærekraft', html:'<p style="font-size:15px;line-height:1.82;color:var(--text-3)">Hos M&O handler bærekraft om praktisk fornuft, ikke bare markedsføring.<br><br>Ved å selge brukte fjellklær forlenger vi levetiden på plagg som ellers ville blitt kastet. Hvert brukte plagg vi selger er et plagg som ikke trenger å produseres på nytt — med alt det innebærer av energi, vann og råvarer.<br><br>Vi jobber også for å pakke alle ordrer med minimal og resirkulerbar emballasje.</p>'},
  personvern: {title:'Personvern', html:'<p style="font-size:15px;line-height:1.82;color:var(--text-3)">M&O behandler dine personopplysninger i samsvar med GDPR og norsk personopplysningslov.<br><br>Vi samler kun inn informasjon som er nødvendig for å behandle og levere din bestilling. Vi deler aldri dine opplysninger med tredjeparter for markedsføringsformål.<br><br>Ta kontakt for personvernsspørsmål: <a href="mailto:post@mando.no" style="color:var(--g5)">post@mando.no</a></p>'},
  vilkar: {title:'Vilkår', html:'<p style="font-size:15px;line-height:1.82;color:var(--text-3)">Ved å handle hos M&O aksepterer du våre salgsbetingelser. Alle priser er oppgitt i norske kroner inkl. MVA.<br><br>Brukte produkter er nøye inspisert og beskrevet så presist som mulig.<br><br>Angreretten på 14 dager gjelder også brukte varer. Varer må returneres i samme stand som ved mottak.</p>'},
};
MO.showModal = function(key) { var m = MO.modals[key]; if(m) MO.openModal(m.title, m.html); };

/* ── MOBILE MENU ─────────────────────────────────────── */
MO.openMobileMenu = function() {
  MO.openModal('Meny',
    '<div style="display:flex;flex-direction:column;gap:4px">' +
    '<a href="index.html" class="btn btn-ghost btn-full" style="justify-content:flex-start;font-size:15px" onclick="MO.closeModal()">Nytt sortiment</a>' +
    '<a href="index.html#brukt" class="btn btn-ghost btn-full" style="justify-content:flex-start;font-size:15px" onclick="MO.closeModal()">Brukt sortiment</a>' +
    '<a href="om-oss.html" class="btn btn-ghost btn-full" style="justify-content:flex-start;font-size:15px" onclick="MO.closeModal()">Om oss</a>' +
    '<a href="cart.html" class="btn btn-ghost btn-full" style="justify-content:flex-start;font-size:15px" onclick="MO.closeModal()">Handlekurv</a>' +
    '<hr style="border:none;border-top:1px solid var(--gray-200);margin:6px 0">' +
    '<button class="btn btn-ghost btn-full" style="justify-content:flex-start;font-size:13.5px" onclick="MO.closeModal();MO.showModal(\'kontakt\')">Kontakt oss</button>' +
    '<button class="btn btn-ghost btn-full" style="justify-content:flex-start;font-size:13.5px" onclick="MO.closeModal();MO.showModal(\'selg\')">Selg klær til oss</button>' +
    '</div>'
  );
};

/* ── NEWSLETTER ──────────────────────────────────────── */
MO.subscribe = function() {
  var inp = document.getElementById('nl-email');
  if (!inp || !inp.value || !inp.value.includes('@')) {
    if (inp) { inp.style.borderColor = '#c0392b'; setTimeout(function(){ inp.style.borderColor=''; }, 1500); }
    MO.toast('Skriv inn en gyldig e-postadresse');
    return;
  }
  var val = inp.value;
  inp.value = '';
  inp.placeholder = 'Du er påmeldt! Vi ses på fjellet ⛰';
  setTimeout(function(){ if(inp) inp.placeholder = 'din@epost.no'; }, 4000);
  MO.toast('Påmeldt! Velkommen til M&O-familien');
};