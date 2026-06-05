/* ═══════════════════════════════════════════════════════
   M&O — app.js  (shared across all pages)
═══════════════════════════════════════════════════════ */

/* ── DATA ─────────────────────────────────────────────── */
var MO = window.MO || {};

/* ── GOOGLE ANALYTICS 4 ───────────────────────────────────
   Bytt ut GA_MEASUREMENT_ID med din eigen ID (G-XXXXXXXXXX)
   Hent frå: analytics.google.com → Admin → Data Streams
──────────────────────────────────────────────────────── */
var GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // ← bytt ut dette

(function() {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') return;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
  window._gtag = gtag;
})();

/* Sporingshjelpefunksjonar */
MO.trackEvent = function(name, params) {
  if (window._gtag) window._gtag('event', name, params || {});
};

/* ── SIKKERHET: HTML-sanitering ───────────────────────────
   Brukes overalt der bruker-input settes inn i innerHTML.
   Forhindrer XSS (Cross-Site Scripting).
──────────────────────────────────────────────────────── */
MO.sanitize = function(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

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

/* Add stock levels (brukt = always 1 — unique item) */
(function(){
  var s = {n1:4,n2:6,n3:3,n4:8,n5:2,n6:5,n7:3,n8:4,b1:1,b2:1,b3:1,b4:1,b5:1,b6:1,b7:1,b8:1};
  MO.products.forEach(function(p){ p.stock = s[p.id] || 1; });
})();

/* ── SORT ─────────────────────────────────────────────── */
MO.sortProducts = function(arr, method) {
  var s = arr.slice();
  if (method === 'price-asc')  return s.sort(function(a,b){ return a.price - b.price; });
  if (method === 'price-desc') return s.sort(function(a,b){ return b.price - a.price; });
  if (method === 'discount')   return s.sort(function(a,b){ return (1-b.price/b.oldPrice)-(1-a.price/a.oldPrice); });
  if (method === 'last')       return s.sort(function(a,b){ return a.stock - b.stock; });
  return s;
};

/* ── RELATED ──────────────────────────────────────────── */
MO.getRelated = function(id, limit) {
  var p = MO.findProduct(id);
  if (!p) return [];
  return MO.products.filter(function(r){ return r.id !== id && (r.cat === p.cat || r.type === p.type); }).slice(0, limit || 2);
};

/* ── CHATBOT ──────────────────────────────────────────────
   Sender meldinger til /.netlify/functions/chat (Claude AI).
   Fungerer lokalt med fallback-svar om funksjonen mangler.
──────────────────────────────────────────────────────── */
MO.chat = {
  open: false,
  msgs: [],
  busy: false,

  SUGGESTIONS: [
    'Hva er forskjellen på Topptrim og Turerfaren?',
    'Hvilke jakker har dere i str. M?',
    'Hva koster frakt?',
    'Kan jeg returnere brukte varer?',
    'Hva er lengste leveringstid?',
  ],

  toggle: function() {
    this.open = !this.open;
    var win = document.getElementById('chat-win');
    if (win) win.classList.toggle('open', this.open);
    if (this.open && this.msgs.length === 0) {
      this._botMsg('Hei! 👋 Jeg er M&O-assistenten. Jeg kan hjelpe deg med produkter, størrelser, levering og retur. Hva lurer du på?');
    }
    if (this.open) {
      var inp = document.getElementById('chat-input');
      if (inp) setTimeout(function(){ inp.focus(); }, 120);
    }
  },

  send: function() {
    var inp = document.getElementById('chat-input');
    if (!inp || this.busy) return;
    var text = inp.value.trim();
    if (!text) return;
    inp.value = ''; inp.style.height = '';
    this._userMsg(text);
    this._fetch(text);
  },

  sendSugg: function(text) {
    var inp = document.getElementById('chat-input');
    if (inp) { inp.value = text; this.send(); }
  },

  _userMsg: function(text) {
    this.msgs.push({role:'user', content: text});
    this._render();
  },

  _botMsg: function(text) {
    this.msgs.push({role:'assistant', content: text});
    this._render();
  },

  _fetch: function(userText) {
    var self = this;
    this.busy = true;
    this._showTyping(true);

    fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ messages: this.msgs.slice(-10) }),
    })
    .then(function(r){ return r.json(); })
    .then(function(d){
      self.busy = false;
      self._showTyping(false);
      self._botMsg(d.content || 'Beklager, prøv igjen.');
    })
    .catch(function(){
      self.busy = false;
      self._showTyping(false);
      self._botMsg('Beklager, jeg er ikke tilgjengelig nå. Ta kontakt via skjemaet i footeren så hjelper vi deg raskt!');
    });
  },

  _showTyping: function(on) {
    var t = document.getElementById('chat-typing');
    if (t) t.style.display = on ? '' : 'none';
    this._scroll();
  },

  _scroll: function() {
    var m = document.getElementById('chat-msgs');
    if (m) m.scrollTop = m.scrollHeight;
  },

  _time: function() {
    return new Date().toLocaleTimeString('no-NO',{hour:'2-digit',minute:'2-digit'});
  },

  _render: function() {
    var el = document.getElementById('chat-msgs');
    if (!el) return;
    var t = this._time();
    var suggHtml = this.msgs.length <= 1
      ? '<div class="chat-suggestions">' + this.SUGGESTIONS.slice(0,4).map(function(s){
          return '<button class="chat-sugg" onclick="MO.chat.sendSugg(' + JSON.stringify(s) + ')">' + MO.sanitize(s) + '</button>';
        }).join('') + '</div>' : '';
    el.innerHTML = this.msgs.map(function(m){
      var isBot = m.role === 'assistant';
      var txt = isBot
        ? m.content.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>')
        : MO.sanitize(m.content);
      return '<div class="chat-msg chat-msg--' + (isBot?'bot':'user') + '">' +
        '<div class="chat-bubble">' + txt + '</div>' +
        '<div class="chat-time">' + t + '</div>' +
        '</div>';
    }).join('') +
    suggHtml +
    '<div id="chat-typing" style="display:none" class="chat-typing"><div class="chat-typing__dots"><div class="chat-typing__dot"></div><div class="chat-typing__dot"></div><div class="chat-typing__dot"></div></div></div>';
    this._scroll();
  },
};

/* ── REVIEWS ──────────────────────────────────────────────*/
MO.reviews = {
  _key: 'mo_reviews',

  demo: [
    {name:"Erik H.",      rating:5, text:"Fantastisk Arc'teryx-jakke til en brøkdel av prisen! Topptrim betyr virkelig som ny — ingen synlige bruksmerker.", tag:"Jakker",    date:"mai 2025", verified:true},
    {name:"Linn M.",      rating:5, text:"Rask levering og nøyaktig beskrivelse. Salomon-skoene var akkurat som beskrevet. «Siste eksemplar»-varselet fikk meg til å handle raskt!", tag:"Sko",       date:"apr 2025", verified:true},
    {name:"Anders K.",    rating:4, text:"Veldig bra pris på Norrøna-jakken. Litt pilling som beskrevet under Turerfaren, men ingen stor sak. Anbefaler!",   tag:"Jakker",    date:"mar 2025", verified:true},
    {name:"Marte S.",     rating:5, text:"Har handlet brukt tre ganger nå. Alltid rent og godt pakket. Størrelsesguiden stemmer perfekt.",                   tag:"Mellomlag", date:"feb 2025", verified:true},
    {name:"Thomas B.",    rating:4, text:"God service og rask respons da jeg hadde spørsmål. Plagget var nøyaktig som beskrevet.",                            tag:"Bukser",    date:"jan 2025", verified:true},
    {name:"Ingrid R.",    rating:5, text:"Patagonia-fleecen var i perfekt stand! Vasket og klar, lukter friskt. Vil definitivt handle her igjen.",             tag:"Mellomlag", date:"des 2024", verified:true},
    {name:"Kjell A.",     rating:5, text:"Kjøpte Mammut-jakke som nytt. Prisen er uslåelig — sparte nesten 1400 kr vs. butikk. Lynrask levering!",           tag:"Jakker",    date:"nov 2024", verified:true},
    {name:"Silje T.",     rating:4, text:"Fin Kari Traa-base layer. Liten pilling på venstre arm som ikke var nevnt, men alt i alt veldig bra for prisen.",   tag:"Mellomlag", date:"okt 2024", verified:true},
  ],

  userReviews: [],

  init: function() {
    try { this.userReviews = JSON.parse(localStorage.getItem(this._key) || '[]'); } catch(e) { this.userReviews = []; }
  },

  all: function() { return this.userReviews.concat(this.demo); },

  avg: function() {
    var all = this.all();
    return all.reduce(function(s,r){ return s + r.rating; }, 0) / all.length;
  },

  dist: function() {
    var all = this.all(), d = [0,0,0,0,0];
    all.forEach(function(r){ if(r.rating>=1&&r.rating<=5) d[r.rating-1]++; });
    return d;
  },

  save: function(review) {
    this.userReviews.unshift(review);
    localStorage.setItem(this._key, JSON.stringify(this.userReviews.slice(0,20)));
  },

  starsHTML: function(rating, size) {
    var s = size || 14, out = '';
    for (var i = 1; i <= 5; i++) {
      out += '<span class="review-star review-star--' + (i <= rating ? 'on' : 'off') + '" style="font-size:' + s + 'px">★</span>';
    }
    return out;
  },

  openForm: function() {
    var html =
      '<p style="font-size:14px;color:var(--text-3);margin-bottom:20px">Del din erfaring med M&O.</p>' +
      '<div style="margin-bottom:16px">' +
      '<p style="font-size:12px;font-weight:500;color:var(--text-2);margin-bottom:8px">Karakter</p>' +
      '<div class="star-picker" id="star-picker">' +
      [1,2,3,4,5].map(function(i){ return '<button type="button" class="star-picker__btn" data-v="' + i + '" onclick="MO.reviews._setStar(' + i + ')">★</button>'; }).join('') +
      '</div></div>' +
      '<div class="form-field"><label class="form-label">Ditt navn</label><input id="rv-name" class="form-input" placeholder="Ola Nordmann" maxlength="50"/></div>' +
      '<div class="form-field"><label class="form-label">Kategori</label><select id="rv-tag" class="form-input"><option>Jakker</option><option>Mellomlag</option><option>Bukser</option><option>Sko</option><option>Tilbehør</option><option>Generelt</option></select></div>' +
      '<div class="form-field"><label class="form-label">Anmeldelse</label><textarea id="rv-text" class="form-textarea" placeholder="Fortell oss om din opplevelse…" minlength="20" maxlength="500"></textarea></div>' +
      '<button class="btn btn-primary btn-full" onclick="MO.reviews._submit()">Send anmeldelse</button>';
    MO.openModal('Skriv en anmeldelse', html);
    MO.reviews._currentStar = 0;
  },

  _currentStar: 0,

  _setStar: function(n) {
    this._currentStar = n;
    document.querySelectorAll('.star-picker__btn').forEach(function(b){
      b.classList.toggle('on', parseInt(b.getAttribute('data-v')) <= n);
    });
  },

  _submit: function() {
    var name  = (document.getElementById('rv-name').value || '').trim();
    var text  = (document.getElementById('rv-text').value || '').trim();
    var tag   = document.getElementById('rv-tag').value;
    var rating = this._currentStar;
    if (!rating)       { MO.toast('Velg en karakter (1-5 stjerner)'); return; }
    if (!name)         { MO.toast('Skriv inn ditt navn'); return; }
    if (text.length < 20) { MO.toast('Anmeldelsen må være minst 20 tegn'); return; }
    var review = {
      name: name.slice(0,50), rating: rating,
      text: text.slice(0,500), tag: tag,
      date: new Date().toLocaleDateString('no-NO',{month:'short',year:'numeric'}),
      verified: false,
    };
    this.save(review);
    MO.closeModal();
    MO.toast('Takk for anmeldelsen! 🙏');
    if (typeof renderReviews === 'function') renderReviews();
  },
};
MO.reviews.init();

/* ── AUTH ─────────────────────────────────────────────────
   Demo-modus: fungerer lokalt med faste testbrukere.
   Prod: koble Netlify Identity — bytt login/register/logout
   med netlifyIdentity.open() / netlifyIdentity.logout().
──────────────────────────────────────────────────────── */
MO.auth = {
  _key: 'mo_auth',

  /* Demo-brukere — fjern i produksjon */
  _demo: [
    { email: 'test@test.no',    password: 'test123',  name: 'Testbruker' },
    { email: 'admin@mando.no',  password: 'fjell2025', name: 'Admin' },
  ],

  user: null,

  init: function() {
    try {
      var stored = localStorage.getItem(this._key);
      this.user = stored ? JSON.parse(stored) : null;
    } catch(e) { this.user = null; }
    this._updateNavIcon();
  },

  isLoggedIn: function() { return !!this.user; },

  login: function(email, password) {
    var self = this;
    return new Promise(function(resolve, reject) {
      /* Simulerer nettverkslatens */
      setTimeout(function() {
        var match = self._demo.find(function(u) {
          return u.email.toLowerCase() === email.toLowerCase() && u.password === password;
        });
        if (match) {
          var user = { email: match.email, name: match.name, id: 'u-' + Date.now() };
          self.user = user;
          localStorage.setItem(self._key, JSON.stringify(user));
          self._updateNavIcon();
          resolve(user);
        } else {
          reject(new Error('Feil e-post eller passord. (Demo: test@test.no / test123)'));
        }
      }, 600);
    });
  },

  register: function(email, password, name) {
    var self = this;
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        /* Demo: godta alle registreringer */
        var user = { email: email, name: name || email.split('@')[0], id: 'u-' + Date.now() };
        self.user = user;
        localStorage.setItem(self._key, JSON.stringify(user));
        self._updateNavIcon();
        resolve(user);
      }, 700);
    });
  },

  logout: function() {
    this.user = null;
    localStorage.removeItem(this._key);
    this._updateNavIcon();
  },

  requireAuth: function() {
    if (!this.isLoggedIn()) {
      sessionStorage.setItem('mo_redirect', window.location.pathname);
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },

  _updateNavIcon: function() {
    var btn = document.getElementById('nav-user-btn');
    if (!btn) return;
    btn.href = this.isLoggedIn() ? 'account.html' : 'login.html';
    btn.setAttribute('aria-label', this.isLoggedIn() ? 'Min konto' : 'Logg inn');
    btn.style.color = this.isLoggedIn() ? 'var(--g5)' : '';
  },
};
MO.auth.init();

/* ── RECENTLY VIEWED ──────────────────────────────────── */
MO.recentViewed = JSON.parse(localStorage.getItem('mo_recent') || '[]');
MO.addToRecent = function(id) {
  MO.recentViewed = [id].concat(MO.recentViewed.filter(function(x){ return x !== id; })).slice(0, 8);
  localStorage.setItem('mo_recent', JSON.stringify(MO.recentViewed));
};

/* ── DELIVERY ESTIMATE ────────────────────────────────── */
MO.deliveryEst = function() {
  var now = new Date();
  var h = now.getHours(), d = now.getDay();
  var add = (d >= 1 && d <= 5 && h < 14) ? [1,2] : [2,3];
  var months = MO.lang === 'en'
    ? ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    : ['jan','feb','mar','apr','mai','jun','jul','aug','sep','okt','nov','des'];
  function nextWeekday(base, plusDays) {
    var dt = new Date(base); dt.setDate(dt.getDate() + plusDays);
    while (dt.getDay() === 0 || dt.getDay() === 6) dt.setDate(dt.getDate() + 1);
    return dt.getDate() + '. ' + months[dt.getMonth()];
  }
  return nextWeekday(now, add[0]) + ' – ' + nextWeekday(now, add[1]);
};

/* ── SHARE PRODUCT ────────────────────────────────────── */
MO.shareProduct = function(id) {
  var p = MO.findProduct(id);
  if (!p) return;
  var url = window.location.origin + window.location.pathname + '#p=' + id;
  if (navigator.share) {
    navigator.share({ title: p.brand + ' — ' + p.name, text: p.price.toLocaleString('no-NO') + ' kr', url: url });
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(function(){ MO.toast('Lenke kopiert!'); });
  }
};

/* ── PRODUCT HASH URL ─────────────────────────────────── */
MO.initProductHash = function() {
  var h = window.location.hash;
  if (h && h.startsWith('#p=')) {
    var id = h.slice(3);
    setTimeout(function(){ MO.openProduct(id); }, 350);
  }
};

/* ── CART QUANTITY ────────────────────────────────────── */
MO.changeQty = function(id, size, delta) {
  var item = MO.cart.find(function(i){ return i.id === id && i.size === size; });
  if (!item) return;
  item.qty = Math.max(0, item.qty + delta);
  if (item.qty === 0) MO.removeFromCart(id, size);
  else MO.saveCart();
  MO.updateCartBadge();
};

/* ── PROMO CODE ───────────────────────────────────────── */
MO._promoDiscount = 0;
MO.applyPromo = function() {
  var inp = document.getElementById('promo-input');
  if (!inp) return;
  var code = inp.value.trim().toUpperCase();
  var codes = { 'FJELL10': 10, 'BRUKT20': 20, 'VELKOMST': 15, 'FJELL2025': 25 };
  if (codes[code]) {
    MO._promoDiscount = codes[code];
    inp.disabled = true;
    var row = inp.closest('.promo-row');
    if (row) row.innerHTML = '<p class="promo-applied">✓ Kode «' + MO.sanitize(code) + '» gir ' + codes[code] + '% rabatt</p>';
    MO.toast(codes[code] + '% rabatt lagt til!');
    if (typeof renderCartPage === 'function') renderCartPage();
  } else {
    inp.style.borderColor = '#c0392b';
    setTimeout(function(){ if(inp) inp.style.borderColor = ''; }, 1500);
    MO.toast('Ugyldig rabattkode');
  }
};

/* ── SKELETON GRID ────────────────────────────────────── */
MO.skeletonHTML = function(n) {
  var c = '<div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-body"><div class="skeleton-line"></div><div class="skeleton-line skeleton-line--sm"></div><div class="skeleton-line skeleton-line--price"></div></div></div>';
  return '<div class="skeleton-grid">' + Array(n || 4).fill(c).join('') + '</div>';
};

/* ── SWIPE FOR Å LUKKE ────────────────────────────────── */
MO.initSwipe = function() {
  var targets = [
    {el: 'cart-drawer',  close: MO.closeCart.bind(MO),    dir: 'right'},
    {el: 'pdm-overlay',  close: MO.closePdm.bind(MO),     dir: 'down'},
  ];
  targets.forEach(function(t) {
    var el = document.getElementById(t.el);
    if (!el) return;
    var sx = 0, sy = 0;
    el.addEventListener('touchstart', function(e){ sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, {passive:true});
    el.addEventListener('touchend', function(e){
      var dx = e.changedTouches[0].clientX - sx;
      var dy = e.changedTouches[0].clientY - sy;
      if (t.dir === 'right' && dx > 72 && Math.abs(dy) < 60) t.close();
      if (t.dir === 'down'  && dy > 72 && Math.abs(dx) < 60) t.close();
    }, {passive:true});
  });
};

/* ── KONTAKT SELGER (brukte produkter) ────────────────── */
MO.contactSeller = function(id) {
  var p = MO.findProduct(id);
  if (!p) return;
  MO.closePdm();
  setTimeout(function() {
    MO.openModal('Spør om plagget',
      '<p style="font-size:13.5px;color:var(--text-3);margin-bottom:18px">Lurer du på noe om <strong>' + MO.sanitize(p.brand + ' ' + p.name) + '</strong>? Vi svarer innen 24 timer.</p>' +
      '<div class="form-field"><label class="form-label">Navn</label><input id="cs-name" class="form-input" placeholder="Ola Nordmann" maxlength="80"/></div>' +
      '<div class="form-field"><label class="form-label">E-post</label><input id="cs-email" class="form-input" type="email" placeholder="din@epost.no"/></div>' +
      '<div class="form-field"><label class="form-label">Spørsmål</label><textarea id="cs-msg" class="form-textarea" placeholder="F.eks. størrelse, mål, spesifikke slitasjemerker…" maxlength="600"></textarea></div>' +
      '<button class="btn btn-primary btn-full" onclick="MO._sendContact(\'' + p.id + '\')">Send spørsmål</button>'
    );
  }, 180);
};

MO._sendContact = function(id) {
  var p  = MO.findProduct(id);
  var nm = (document.getElementById('cs-name')  || {}).value || '';
  var em = (document.getElementById('cs-email') || {}).value || '';
  var ms = (document.getElementById('cs-msg')   || {}).value || '';
  if (!nm.trim() || !em.trim() || !ms.trim()) { MO.toast('Fyll inn alle felt'); return; }
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRe.test(em.trim())) { MO.toast('Ugyldig e-postadresse'); return; }
  fetch('/.netlify/functions/send-email', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      type: 'contact-seller',
      product: p ? (p.brand + ' ' + p.name) : id,
      fromName: nm.trim().slice(0,80),
      from: em.trim(),
      message: ms.trim().slice(0,600),
    }),
  }).finally(function() {
    MO.closeModal();
    MO.toast('Spørsmål sendt! Vi svarer innen 24 timer 👍');
  });
};

/* ── ORDREBEKREFTELSE E-POST ──────────────────────────── */
MO.sendOrderEmail = function(email, orderNum, items, total) {
  fetch('/.netlify/functions/send-email', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      type: 'order-confirm',
      email: email, orderNum: orderNum,
      items: items, total: total,
    }),
  }).catch(function(){});
};

/* ── LIVE SEARCH DROPDOWN ─────────────────────────────── */
MO.initSearchDrop = function() {
  var inp = document.getElementById('search-input');
  var drop = document.getElementById('search-drop');
  if (!inp || !drop) return;
  inp.addEventListener('input', function() {
    var q = this.value.toLowerCase().trim();
    if (!q) { drop.classList.remove('open'); return; }
    var hits = MO.products.filter(function(p) {
      return (p.brand + ' ' + p.name + ' ' + p.cat + (p.cond||'')).toLowerCase().includes(q);
    }).slice(0, 6);
    if (!hits.length) {
      drop.innerHTML = '<div class="search-empty">Ingen treff på «' + MO.sanitize(q) + '»</div>';
    } else {
      drop.innerHTML = hits.map(function(p) {
        var catColors = {jakker:'#172e14',mellomlag:'#1e3a1c',bukser:'#1a2d3a',sko:'#38220c',tilbehor:'#362a18'};
        var bg = catColors[p.cat] || '#2d3a2a';
        return '<div class="search-hit" onclick="MO.closeSearch();MO.openProduct(\'' + p.id + '\')">' +
          '<div class="search-hit__img" style="background:linear-gradient(135deg,' + bg + ' 0%,' + bg + 'cc 100%)">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.2" stroke-linecap="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg></div>' +
          '<div><div class="search-hit__brand">' + p.brand + '</div><div class="search-hit__name">' + p.name + '</div></div>' +
          '<div class="search-hit__price">' + p.price.toLocaleString('no-NO') + ' kr</div></div>';
      }).join('');
    }
    drop.classList.add('open');
  });
  document.addEventListener('click', function(e) {
    if (!e.target.closest('#searchbar')) drop.classList.remove('open');
  });
};

/* ── SIZE GUIDE ───────────────────────────────────────── */
MO.showSizeGuide = function() {
  var tabs = ['Jakker / Mellomlag','Bukser','Sko'];
  var tables = [
    '<table class="size-table"><thead><tr><th>Merke-str.</th><th>Bryst (cm)</th><th>Midje (cm)</th><th>Høyde (cm)</th></tr></thead><tbody>' +
    '<tr><td>XS</td><td>82–88</td><td>66–72</td><td>160–166</td></tr>' +
    '<tr><td>S</td><td>88–94</td><td>72–78</td><td>166–172</td></tr>' +
    '<tr><td>M</td><td>94–100</td><td>78–84</td><td>172–178</td></tr>' +
    '<tr><td>L</td><td>100–106</td><td>84–90</td><td>178–184</td></tr>' +
    '<tr><td>XL</td><td>106–112</td><td>90–96</td><td>184–190</td></tr>' +
    '<tr><td>XXL</td><td>112–120</td><td>96–104</td><td>190–196</td></tr>' +
    '</tbody></table><p class="size-note">Mål deg rundt det bredeste punktet. Er du mellom to størrelser, velg den større for jakker og den mindre for mellomlag.</p>',
    '<table class="size-table"><thead><tr><th>Str.</th><th>Livet (cm)</th><th>Hofter (cm)</th><th>Skritt (cm)</th></tr></thead><tbody>' +
    '<tr><td>XS / 28</td><td>64–68</td><td>88–92</td><td>76</td></tr>' +
    '<tr><td>S / 30</td><td>70–74</td><td>94–98</td><td>78</td></tr>' +
    '<tr><td>M / 32</td><td>76–80</td><td>100–104</td><td>80</td></tr>' +
    '<tr><td>L / 34</td><td>82–86</td><td>106–110</td><td>82</td></tr>' +
    '<tr><td>XL / 36</td><td>88–92</td><td>112–116</td><td>82</td></tr>' +
    '</tbody></table><p class="size-note">Mål livet ca. 2 cm under navlen. Skogsstrømpebukser og softshell-bukser sitter vanligvis noe løst — velg din normale størrelse.</p>',
    '<table class="size-table"><thead><tr><th>EU</th><th>UK</th><th>US (herre)</th><th>US (dame)</th><th>cm</th></tr></thead><tbody>' +
    '<tr><td>37</td><td>4</td><td>5</td><td>6.5</td><td>23.5</td></tr>' +
    '<tr><td>38</td><td>5</td><td>6</td><td>7.5</td><td>24</td></tr>' +
    '<tr><td>39</td><td>5.5</td><td>6.5</td><td>8</td><td>24.5</td></tr>' +
    '<tr><td>40</td><td>6.5</td><td>7.5</td><td>9</td><td>25.5</td></tr>' +
    '<tr><td>41</td><td>7</td><td>8</td><td>9.5</td><td>26</td></tr>' +
    '<tr><td>42</td><td>8</td><td>9</td><td>10.5</td><td>26.5</td></tr>' +
    '<tr><td>43</td><td>9</td><td>10</td><td>11.5</td><td>27.5</td></tr>' +
    '<tr><td>44</td><td>9.5</td><td>10.5</td><td>12</td><td>28</td></tr>' +
    '<tr><td>45</td><td>10.5</td><td>11.5</td><td>—</td><td>28.5</td></tr>' +
    '<tr><td>46</td><td>11</td><td>12</td><td>—</td><td>29.5</td></tr>' +
    '</tbody></table><p class="size-note">Fjellsko bør sitte tett — tommelen skal akkurat ha plass. Vi anbefaler å gå ett halvt nummer ned fra din vanlige sko.</p>'
  ];
  var html = '<div class="size-tabs" id="sg-tabs">' +
    tabs.map(function(t,i){ return '<button class="size-tab' + (i===0?' active':'') + '" onclick="MO._sgTab(this,' + i + ')">' + t + '</button>'; }).join('') +
    '</div>' +
    '<div id="sg-content">' + tables[0] + '</div>';
  MO.openModal('Størrelsesguide', html);
  MO._sgTables = tables;
};
MO._sgTab = function(btn, idx) {
  document.querySelectorAll('.size-tab').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  document.getElementById('sg-content').innerHTML = MO._sgTables[idx];
};

/* ── COOKIES ──────────────────────────────────────────── */
MO.initCookies = function() {
  if (localStorage.getItem('mo_cookies_ok')) return;
  setTimeout(function() {
    var b = document.getElementById('cookie-bar');
    if (b) b.classList.add('show');
  }, 1800);
};
MO.acceptCookies = function() {
  localStorage.setItem('mo_cookies_ok', '1');
  var b = document.getElementById('cookie-bar');
  if (b) { b.style.transform = 'translateY(100%)'; setTimeout(function(){ b.remove(); }, 400); }
};
MO.declineCookies = function() {
  var b = document.getElementById('cookie-bar');
  if (b) { b.style.transform = 'translateY(100%)'; setTimeout(function(){ b.remove(); }, 400); }
};

/* ── CART ─────────────────────────────────────────────── */
/* Valider og sanitér cart-data fra localStorage ved innlasting */
MO.cart = (function() {
  try {
    var raw = JSON.parse(localStorage.getItem('mo_cart') || '[]');
    if (!Array.isArray(raw)) return [];
    return raw.filter(function(i) {
      var p = MO.findProduct(i.id);
      return p &&
        typeof i.size === 'string' && i.size.length <= 20 &&
        p.sizes.indexOf(i.size) !== -1 &&
        typeof i.qty === 'number' && i.qty >= 1 && i.qty <= 10;
    }).map(function(i) {
      var p = MO.findProduct(i.id);
      return { id: p.id, brand: p.brand, name: p.name, price: p.price, size: i.size, qty: Math.min(i.qty, 10), type: p.type };
    });
  } catch(e) { return []; }
})();

MO.saveCart = function() {
  localStorage.setItem('mo_cart', JSON.stringify(MO.cart));
};

MO.addToCart = function(id, size) {
  var p = MO.findProduct(id);
  if (!p) return;
  if (p.sizes.indexOf(String(size)) === -1) return; /* Ugyldig størrelse */
  var existing = MO.cart.find(function(i){ return i.id === id && i.size === size; });
  if (existing) { existing.qty = Math.min(existing.qty + 1, 10); }
  else { MO.cart.push({id:p.id, brand:p.brand, name:p.name, price:p.price, size:size, qty:1, type:p.type}); }
  MO.saveCart();
  MO.updateCartBadge();
  MO.toast(p.name.split(' ').slice(0,3).join(' ') + ' lagt i kurven');
  MO.trackEvent('add_to_cart', { currency:'NOK', value: p.price, items:[{ item_id: p.id, item_name: p.brand + ' ' + p.name, price: p.price }] });
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
  var stockHtml = p.stock === 1
    ? '<p style="font-size:12px;color:var(--s2);font-weight:500;margin-bottom:14px">⚠ Siste eksemplar</p>'
    : p.stock <= 3 ? '<p style="font-size:12px;color:var(--s2);font-weight:500;margin-bottom:14px">Kun ' + p.stock + ' igjen</p>' : '';
  var related = MO.getRelated(id, 2);
  var relatedHtml = related.length ? '<div class="related"><p class="related__title">Andre liker også</p><div class="related__grid">' +
    related.map(function(r) {
      return '<div class="related-card" onclick="MO.closePdm();setTimeout(function(){MO.openProduct(\'' + r.id + '\')},120)">' +
        '<div class="related-card__img"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg></div>' +
        '<div><p class="related-card__brand">' + r.brand + '</p><p class="related-card__name">' + r.name.split(' ').slice(0,4).join(' ') + '</p><p class="related-card__price">' + r.price.toLocaleString('no-NO') + ' kr</p></div></div>';
    }).join('') + '</div></div>' : '';
  var infoHtml =
    '<p class="pdm__brand">' + p.brand + '</p>' +
    '<h2 class="pdm__name">' + p.name + '</h2>' +
    (p.condDesc ? '<p class="pdm__cond">' + condHtml + p.condDesc + '</p>' : '') +
    stockHtml +
    '<div class="pdm__prices"><span class="pdm__price">' + p.price.toLocaleString('no-NO') + ' kr</span><span class="pdm__old">' + p.oldPrice.toLocaleString('no-NO') + ' kr</span><span class="pdm__save">–' + saving + '%</span></div>' +
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:14px;margin-bottom:8px"><p class="pdm__lbl" style="margin:0">' + MO.t('product.size') + '</p><button style="font-size:11.5px;color:var(--g5);background:none;border:none;cursor:pointer;text-decoration:underline;text-underline-offset:2px" onclick="MO.showSizeGuide()">Størrelsesguide</button></div>' +
    '<div class="pdm__sizes">' + sizesHtml + '</div>' +
    '<button class="btn btn-primary btn-full btn-lg" style="margin-top:16px" onclick="MO._atcModal(\'' + id + '\')">' + MO.t('product.add') + '</button>' +
    '<div style="display:flex;gap:8px;margin-top:8px">' +
    '<button class="btn btn-ghost" style="flex:1" onclick="MO.toggleWish(\'' + id + '\');MO.closePdm()">' + MO.t('product.wish') + '</button>' +
    '<button class="btn btn-ghost" style="padding:11px 14px" onclick="MO.shareProduct(\'' + id + '\')" title="Del produkt"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></button>' +
    '</div>' +
    '<div style="margin-top:14px;padding:11px 14px;background:var(--g10);border-radius:9px;display:flex;align-items:center;gap:7px;font-size:12.5px;color:var(--g4);font-weight:500">' +
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="1"/></svg>' +
    'Estimert levering: ' + MO.deliveryEst() +
    '</div>' +
    '<div style="display:flex;flex-direction:column;gap:5px;margin-top:12px">' +
    '<div style="display:flex;align-items:center;gap:7px;font-size:11.5px;color:var(--text-4)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>14 dagers returrett — også på brukt</div>' +
    '<div style="display:flex;align-items:center;gap:7px;font-size:11.5px;color:var(--text-4)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>Gratis frakt over 999 kr</div>' +
    '</div>' +
    (featsHtml ? '<div class="pdm__features" style="margin-top:18px;padding-top:16px;border-top:1px solid var(--gray-100)">' + featsHtml + '</div>' : '') +
    (p.type === 'brukt' ? '<button class="btn btn-outline btn-full" style="margin-top:14px" onclick="MO.contactSeller(\'' + id + '\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="margin-right:6px"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Spør om plagget</button>' : '') +
    relatedHtml;

  document.getElementById('pdm-title').textContent = p.brand + ' — ' + p.name;
  document.getElementById('pdm-body').innerHTML =
    '<div class="pdm__grid">' +
    '<div class="pdm__img"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.7" stroke-linecap="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg></div>' +
    '<div>' + infoHtml + '</div>' +
    '</div>';
  document.getElementById('pdm-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  MO.addToRecent(id);
  /* Oppdater hash i URL for deling */
  history.replaceState(null, '', window.location.pathname + '#p=' + id);
};
MO.closePdm = function() {
  document.getElementById('pdm-overlay').classList.remove('open');
  document.body.style.overflow = '';
  history.replaceState(null, '', window.location.pathname);
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
  if (!sz) { MO.toast(MO.t('product.select-size')); return; }
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
    var sid = MO.sanitize(item.id), ssz = MO.sanitize(item.size);
    return '<div class="cart-item"><div class="cart-item__img"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg></div><div style="flex:1"><div class="cart-item__brand">' + MO.sanitize(item.brand) + '</div><div class="cart-item__name">' + MO.sanitize(item.name) + '</div><div class="cart-item__meta">Str. ' + ssz + (item.qty > 1 ? ' · Antall: ' + item.qty : '') + '</div><div class="cart-item__price">' + (item.price * item.qty).toLocaleString('no-NO') + ' kr</div><span class="cart-item__rm" onclick="MO.removeFromCart(\'' + sid + '\',\'' + ssz + '\');MO.renderCartDrawer()">Fjern</span></div></div>';
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
    var y = window.scrollY;
    document.getElementById('main-nav').classList.toggle('scrolled', y > 8);
    var bt = document.getElementById('back-top');
    if (bt) bt.classList.toggle('show', y > 400);
    /* Merk aktivt mbnav-element */
    var mh = document.getElementById('mbnav-home');
    if (mh) mh.classList.toggle('active', y < 200);
  }, {passive:true});
  document.getElementById('search-input').addEventListener('keydown', function(e){
    if (e.key === 'Escape') MO.closeSearch();
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') { MO.closeSearch(); MO.closeCart(); MO.closeModal(); MO.closePdm(); }
  });
  MO.updateCartBadge();
  setTimeout(MO.initReveal, 80);
  MO.initCookies();
  MO.initSearchDrop();
  MO.initSwipe();
  /* Tastatursnarvei: / åpner søk */
  document.addEventListener('keydown', function(e) {
    if (e.key === '/' && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) {
      e.preventDefault(); MO.openSearch();
    }
  });
};

/* ── COUNT-UP ANIMATION ────────────────────────────────── */
MO.animateCount = function(el) {
  var raw = el.textContent.trim();
  var prefix = raw.match(/^[^0-9]*/)[0];
  var suffix = raw.replace(/^[^0-9]*/, '').replace(/[0-9\s]+/, '');
  var numStr = raw.replace(/[^0-9]/g, '');
  if (!numStr) return;
  var target = parseInt(numStr, 10);
  var duration = 1400;
  var startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    var p = Math.min((ts - startTime) / duration, 1);
    var eased = 1 - Math.pow(1 - p, 3);
    var val = Math.round(target * eased);
    el.textContent = prefix + val.toLocaleString('no-NO') + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
};

/* ── SCROLL REVEAL ─────────────────────────────────────── */
MO.initReveal = function() {
  if (!window.IntersectionObserver) return;
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      var num = e.target.querySelector('.hero__stat-num, .stat-cell__num, .about-visual__num');
      if (num) MO.animateCount(num);
      io.unobserve(e.target);
    });
  }, {threshold: 0.07, rootMargin: '0px 0px -28px 0px'});
  var targets = '.cond-card, .value-card, .stat-cell, .trust-item, .section__header, .about-grid, .team-card, .hero__stats, .step';
  document.querySelectorAll(targets).forEach(function(el, i) {
    if (el.classList.contains('sr')) return;
    el.classList.add('sr');
    el.style.transitionDelay = (i % 4) * 0.06 + 's';
    io.observe(el);
  });
};

/* ── PRODUCT CARD HTML ─────────────────────────────────── */
MO.cardHTML = function(p) {
  var saving = Math.round((1 - p.price / p.oldPrice) * 100);
  var wished = MO.isWished(p.id);
  var condBadge = p.cond ? '<span class="badge badge-' + (p.cond==='Topptrim'?'top':p.cond==='Turerfaren'?'mid':'low') + '">' + p.cond + '</span>' : '';
  var lastBadge = p.stock === 1 ? '<span class="badge badge-last">Siste</span>' : '';
  var catIcons = {
    jakker:    '<path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/>',
    mellomlag: '<path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/><line x1="6" y1="10" x2="18" y2="10"/>',
    bukser:    '<path d="M6 2h12v6l-2 14H8L6 8V2z"/><line x1="12" y1="8" x2="12" y2="22"/>',
    sko:       '<path d="M2 18h20l-3-8H5L2 18z"/><path d="M5 10V6a2 2 0 0 1 4 0v4"/>',
    tilbehor:  '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
  };
  var iconPath = catIcons[p.cat] || catIcons.jakker;
  var iconColor = p.cat === 'jakker' || p.cat === 'mellomlag' || p.cat === 'sko' || p.cat === 'bukser' || p.cat === 'tilbehor' ? 'rgba(255,255,255,.35)' : 'var(--gray-300)';
  return '<article class="pcard" onclick="MO.openProduct(\'' + p.id + '\')" tabindex="0" onkeydown="if(event.key===\'Enter\')MO.openProduct(\'' + p.id + '\')">' +
    '<div class="pcard__img" data-cat="' + p.cat + '">' +
    '<div class="pcard__img-inner" style="color:' + iconColor + '"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round">' + iconPath + '</svg></div>' +
    '<div class="pcard__badges"><span class="badge badge-' + (p.type==='nytt'?'new':'used') + '">' + (p.type==='nytt'?'Nytt':'Brukt') + '</span>' + condBadge + lastBadge + '</div>' +
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
  personvern: {title:'Personvern', html:'<p style="font-size:14px;color:var(--text-3);margin-bottom:20px">Les vår fullstendige personvernserklæring — inkludert dine GDPR-rettigheter og hvilke tredjeparter vi deler data med.</p><a href="personvern.html" class="btn btn-primary">Les personvernserklæringen</a>'},
  vilkar: {title:'Vilkår', html:'<p style="font-size:14px;color:var(--text-3);margin-bottom:20px">Les våre fullstendige vilkår og betingelser for kjøp hos M&O.</p><a href="vilkar.html" class="btn btn-primary">Les vilkårene</a><br/><br/><a href="angrerett.html" class="btn btn-ghost" style="margin-top:8px">Angrerettskjema</a>'},
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
  var emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;
  if (!inp || !inp.value || !emailRe.test(inp.value.trim())) {
    if (inp) { inp.style.borderColor = '#c0392b'; setTimeout(function(){ inp.style.borderColor=''; }, 1500); }
    MO.toast(MO.t('nl.error'));
    return;
  }
  inp.value = '';
  inp.placeholder = MO.t('nl.success');
  setTimeout(function(){ if(inp) inp.placeholder = 'din@epost.no'; }, 4000);
  MO.toast(MO.t('nl.toast'));
};

/* ── LANGUAGE / i18n ─────────────────────────────────── */
MO.lang = localStorage.getItem('mo_lang') || (function(){
  var bl = (navigator.language || 'no').slice(0,2).toLowerCase();
  var map = { no:'no', nb:'no', nn:'no', en:'en', de:'de', es:'es', zh:'zh' };
  return map[bl] || 'no';
})();

MO.translations = {
  no: {
    'nav.new': 'Nytt', 'nav.used': 'Brukt', 'nav.about': 'Om oss',
    'cat.all': 'Alle', 'cat.jackets': 'Jakker & Yttertøy', 'cat.midlayer': 'Mellomlag',
    'cat.pants': 'Bukser', 'cat.shoes': 'Sko & Støvler', 'cat.accessories': 'Tilbehør', 'cat.sale': '🔥 Tilbud',
    'search.placeholder': 'Søk etter merke, type eller størrelse…', 'search.cancel': 'Avbryt',
    'cart.title': 'Handlekurv', 'cart.total': 'Total',
    'cart.checkout': 'Gå til kasse', 'cart.continue': 'Fortsett å handle',
    'cart.empty.title': 'Handlekurven er tom', 'cart.empty.sub': 'Finn noe du vil ha!',
    'product.size': 'Størrelse', 'product.add': 'Legg i handlekurv',
    'product.wish': '♡ Legg til favoritter', 'product.quick': '+ Legg i kurv',
    'product.select-size': 'Velg størrelse først',
    'wishlist.title': 'Favoritter', 'wishlist.empty.title': 'Ingen favoritter ennå',
    'wishlist.empty.sub': 'Trykk hjertet på produktene du liker', 'wishlist.view': 'Se produkt',
    'footer.tagline': 'Fjellklær uten kompromiss. Nye og brukte klær fra de beste merkene.',
    'footer.shop': 'Butikk', 'footer.new': 'Nytt sortiment', 'footer.used': 'Pent brukt',
    'footer.campaigns': 'Kampanjer', 'footer.service': 'Kundeservice',
    'footer.contact': 'Kontakt oss', 'footer.shipping': 'Frakt & levering',
    'footer.return': 'Retur & bytte', 'footer.sell': 'Selg til oss',
    'footer.about-col': 'Om M&O', 'footer.about-link': 'Om oss',
    'footer.sustainability': 'Bærekraft', 'footer.privacy': 'Personvern', 'footer.terms': 'Vilkår',
    'footer.faq': 'Spørsmål & svar',
    'footer.copy': '© 2025 M&O — Mountain &amp; Outdoor. Alle rettigheter forbeholdt.',
    'nl.error': 'Skriv inn en gyldig e-postadresse',
    'nl.success': 'Du er påmeldt! Vi ses på fjellet ⛰',
    'nl.toast': 'Påmeldt! Velkommen til M&O-familien',
    'mobile.new': 'Nytt sortiment', 'mobile.used': 'Brukt sortiment',
    'mobile.about': 'Om oss', 'mobile.cart': 'Handlekurv',
    'mobile.contact': 'Kontakt oss', 'mobile.sell': 'Selg klær til oss',
  },
  en: {
    'nav.new': 'New', 'nav.used': 'Used', 'nav.about': 'About',
    'cat.all': 'All', 'cat.jackets': 'Jackets & Outerwear', 'cat.midlayer': 'Midlayer',
    'cat.pants': 'Pants', 'cat.shoes': 'Shoes & Boots', 'cat.accessories': 'Accessories', 'cat.sale': '🔥 Deals',
    'search.placeholder': 'Search by brand, type or size…', 'search.cancel': 'Cancel',
    'cart.title': 'Shopping cart', 'cart.total': 'Total',
    'cart.checkout': 'Proceed to checkout', 'cart.continue': 'Continue shopping',
    'cart.empty.title': 'Your cart is empty', 'cart.empty.sub': 'Find something you like!',
    'product.size': 'Size', 'product.add': 'Add to cart',
    'product.wish': '♡ Add to wishlist', 'product.quick': '+ Add to cart',
    'product.select-size': 'Please select a size first',
    'wishlist.title': 'Favourites', 'wishlist.empty.title': 'No favourites yet',
    'wishlist.empty.sub': 'Tap the heart on products you like', 'wishlist.view': 'View product',
    'footer.tagline': 'Mountain gear without compromise. New and used gear from the best brands.',
    'footer.shop': 'Shop', 'footer.new': 'New gear', 'footer.used': 'Gently used',
    'footer.campaigns': 'Campaigns', 'footer.service': 'Customer service',
    'footer.contact': 'Contact us', 'footer.shipping': 'Shipping & delivery',
    'footer.return': 'Returns & exchanges', 'footer.sell': 'Sell to us',
    'footer.about-col': 'About M&O', 'footer.about-link': 'About us',
    'footer.sustainability': 'Sustainability', 'footer.privacy': 'Privacy policy', 'footer.terms': 'Terms',
    'footer.faq': 'FAQ',
    'footer.copy': '© 2025 M&O — Mountain &amp; Outdoor. All rights reserved.',
    'nl.error': 'Please enter a valid email address',
    'nl.success': 'You\'re signed up! See you on the mountain ⛰',
    'nl.toast': 'Signed up! Welcome to the M&O family',
    'mobile.new': 'New gear', 'mobile.used': 'Used gear',
    'mobile.about': 'About us', 'mobile.cart': 'Shopping cart',
    'mobile.contact': 'Contact us', 'mobile.sell': 'Sell gear to us',
  },
  de: {
    'nav.new': 'Neu', 'nav.used': 'Gebraucht', 'nav.about': 'Über uns',
    'cat.all': 'Alle', 'cat.jackets': 'Jacken & Oberbekleidung', 'cat.midlayer': 'Zwischenschicht',
    'cat.pants': 'Hosen', 'cat.shoes': 'Schuhe & Stiefel', 'cat.accessories': 'Zubehör', 'cat.sale': '🔥 Angebote',
    'search.placeholder': 'Marke, Typ oder Größe suchen…', 'search.cancel': 'Abbrechen',
    'cart.title': 'Warenkorb', 'cart.total': 'Gesamt',
    'cart.checkout': 'Zur Kasse', 'cart.continue': 'Weiter einkaufen',
    'cart.empty.title': 'Ihr Warenkorb ist leer', 'cart.empty.sub': 'Finden Sie etwas, das Ihnen gefällt!',
    'product.size': 'Größe', 'product.add': 'In den Warenkorb',
    'product.wish': '♡ Auf die Wunschliste', 'product.quick': '+ In den Warenkorb',
    'product.select-size': 'Bitte zuerst eine Größe wählen',
    'wishlist.title': 'Favoriten', 'wishlist.empty.title': 'Noch keine Favoriten',
    'wishlist.empty.sub': 'Klicken Sie auf das Herz bei Produkten', 'wishlist.view': 'Produkt ansehen',
    'footer.tagline': 'Bergausrüstung ohne Kompromisse. Neu und gebraucht von den besten Marken.',
    'footer.shop': 'Shop', 'footer.new': 'Neuware', 'footer.used': 'Gebraucht',
    'footer.campaigns': 'Aktionen', 'footer.service': 'Kundendienst',
    'footer.contact': 'Kontakt', 'footer.shipping': 'Versand & Lieferung',
    'footer.return': 'Rückgabe & Umtausch', 'footer.sell': 'An uns verkaufen',
    'footer.about-col': 'Über M&O', 'footer.about-link': 'Über uns',
    'footer.sustainability': 'Nachhaltigkeit', 'footer.privacy': 'Datenschutz', 'footer.terms': 'AGB',
    'footer.faq': 'FAQ',
    'footer.copy': '© 2025 M&O — Mountain &amp; Outdoor. Alle Rechte vorbehalten.',
    'nl.error': 'Bitte eine gültige E-Mail-Adresse eingeben',
    'nl.success': 'Angemeldet! Bis bald auf dem Berg ⛰',
    'nl.toast': 'Angemeldet! Willkommen in der M&O-Familie',
    'mobile.new': 'Neuware', 'mobile.used': 'Gebraucht',
    'mobile.about': 'Über uns', 'mobile.cart': 'Warenkorb',
    'mobile.contact': 'Kontakt', 'mobile.sell': 'Ausrüstung verkaufen',
  },
  es: {
    'nav.new': 'Nuevo', 'nav.used': 'Usado', 'nav.about': 'Nosotros',
    'cat.all': 'Todo', 'cat.jackets': 'Chaquetas y ropa exterior', 'cat.midlayer': 'Capa intermedia',
    'cat.pants': 'Pantalones', 'cat.shoes': 'Calzado', 'cat.accessories': 'Accesorios', 'cat.sale': '🔥 Ofertas',
    'search.placeholder': 'Buscar por marca, tipo o talla…', 'search.cancel': 'Cancelar',
    'cart.title': 'Carrito', 'cart.total': 'Total',
    'cart.checkout': 'Ir a pagar', 'cart.continue': 'Seguir comprando',
    'cart.empty.title': 'Tu carrito está vacío', 'cart.empty.sub': '¡Encuentra algo que te guste!',
    'product.size': 'Talla', 'product.add': 'Añadir al carrito',
    'product.wish': '♡ Añadir a favoritos', 'product.quick': '+ Añadir al carrito',
    'product.select-size': 'Por favor, selecciona una talla primero',
    'wishlist.title': 'Favoritos', 'wishlist.empty.title': 'Sin favoritos aún',
    'wishlist.empty.sub': 'Pulsa el corazón en los productos que te gusten', 'wishlist.view': 'Ver producto',
    'footer.tagline': 'Equipamiento de montaña sin compromisos. Nuevo y de segunda mano.',
    'footer.shop': 'Tienda', 'footer.new': 'Nuevo', 'footer.used': 'Segunda mano',
    'footer.campaigns': 'Ofertas', 'footer.service': 'Atención al cliente',
    'footer.contact': 'Contacto', 'footer.shipping': 'Envío y entrega',
    'footer.return': 'Devoluciones', 'footer.sell': 'Vender a M&O',
    'footer.about-col': 'Sobre M&O', 'footer.about-link': 'Sobre nosotros',
    'footer.sustainability': 'Sostenibilidad', 'footer.privacy': 'Privacidad', 'footer.terms': 'Términos',
    'footer.faq': 'FAQ',
    'footer.copy': '© 2025 M&O — Mountain &amp; Outdoor. Todos los derechos reservados.',
    'nl.error': 'Por favor, introduce un correo electrónico válido',
    'nl.success': '¡Suscrito! Hasta pronto en la montaña ⛰',
    'nl.toast': '¡Suscrito! Bienvenido a la familia M&O',
    'mobile.new': 'Nuevo', 'mobile.used': 'Usado',
    'mobile.about': 'Nosotros', 'mobile.cart': 'Carrito',
    'mobile.contact': 'Contacto', 'mobile.sell': 'Vender equipo',
  },
  zh: {
    'nav.new': '新品', 'nav.used': '二手', 'nav.about': '关于我们',
    'cat.all': '全部', 'cat.jackets': '夹克与外套', 'cat.midlayer': '中间层',
    'cat.pants': '裤子', 'cat.shoes': '鞋靴', 'cat.accessories': '配件', 'cat.sale': '🔥 特卖',
    'search.placeholder': '搜索品牌、类型或尺码…', 'search.cancel': '取消',
    'cart.title': '购物车', 'cart.total': '总计',
    'cart.checkout': '前往结账', 'cart.continue': '继续购物',
    'cart.empty.title': '购物车是空的', 'cart.empty.sub': '去找找你喜欢的商品！',
    'product.size': '尺码', 'product.add': '加入购物车',
    'product.wish': '♡ 收藏', 'product.quick': '+ 加入购物车',
    'product.select-size': '请先选择尺码',
    'wishlist.title': '收藏夹', 'wishlist.empty.title': '暂无收藏',
    'wishlist.empty.sub': '点击商品上的爱心进行收藏', 'wishlist.view': '查看商品',
    'footer.tagline': '优质山地装备，新品与二手，无妥协。',
    'footer.shop': '商店', 'footer.new': '新品', 'footer.used': '二手精品',
    'footer.campaigns': '促销活动', 'footer.service': '客户服务',
    'footer.contact': '联系我们', 'footer.shipping': '配送与物流',
    'footer.return': '退换货', 'footer.sell': '向我们出售',
    'footer.about-col': '关于M&O', 'footer.about-link': '关于我们',
    'footer.sustainability': '可持续发展', 'footer.privacy': '隐私政策', 'footer.terms': '服务条款',
    'footer.faq': '常见问题',
    'footer.copy': '© 2025 M&amp;O — Mountain &amp; Outdoor. 保留所有权利。',
    'nl.error': '请输入有效的电子邮件地址',
    'nl.success': '订阅成功！⛰',
    'nl.toast': '订阅成功！欢迎加入M&O大家庭',
    'mobile.new': '新品', 'mobile.used': '二手',
    'mobile.about': '关于我们', 'mobile.cart': '购物车',
    'mobile.contact': '联系我们', 'mobile.sell': '出售装备',
  }
};

MO.t = function(key) {
  return (MO.translations[MO.lang] || MO.translations.no)[key] || key;
};

MO.setLang = function(lang) {
  if (!MO.translations[lang]) return;
  MO.lang = lang;
  localStorage.setItem('mo_lang', lang);
  document.documentElement.lang = {zh:'zh-Hans',de:'de',es:'es',en:'en',no:'no'}[lang] || lang;
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    el.innerHTML = MO.t(el.getAttribute('data-i18n'));
  });
  var catbar = document.getElementById('catbar');
  if (catbar) catbar.innerHTML = MO.catbarHTML();
  var si = document.getElementById('search-input');
  if (si) si.placeholder = MO.t('search.placeholder');
  var sel = document.getElementById('lang-select');
  if (sel) sel.value = lang;
};