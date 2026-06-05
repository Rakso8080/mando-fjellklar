(function () {
  'use strict';

  var MO = window.MO || {};

  MO.products = [
    {id:'n1',brand:'Norrøna',name:'Falketind Gore-Tex Jacket',price:2490,oldPrice:3299,sizes:['S','M','L','XL'],cat:'jakker',type:'nytt',features:['Gore-Tex 3-lags membran','Justerbar hette med visir','Ventilasjonslommer','Resirkulert materiale']},
    {id:'n2',brand:'Bergans',name:'Fløyen Insulated Pants',price:890,oldPrice:1199,sizes:['XS','S','M','L','XL'],cat:'bukser',type:'nytt',features:['PrimaLoft isolasjon','Slank passform','Sideglidelåser','Vannavstøtende overflate']},
    {id:'n3',brand:'Helly Hansen',name:'Odin Fleece Midlayer',price:649,oldPrice:899,sizes:['S','M','L','XL','XXL'],cat:'mellomlag',type:'nytt',features:['Polartec Power Stretch','Stretch-panel i sidene','Brystlomme','Kan brukes alene']},
    {id:'n4',brand:'Kari Traa',name:'Rose Wool Base Layer',price:399,oldPrice:549,sizes:['XS','S','M','L'],cat:'mellomlag',type:'nytt',features:['100% merinoull','Naturlig temperaturregulering','Luktresistent','GOTS-sertifisert']},
    {id:'n5',brand:'Mammut',name:'Convey Tour HS Hooded Jacket',price:3100,oldPrice:4499,sizes:['S','M','L','XL'],cat:'jakker',type:'nytt',features:['DRYtechnology','Integrert justerbar hette','Packable design','2.5-lags konstruksjon']},
    {id:'n6',brand:'Black Diamond',name:'Crag Pants',price:1100,oldPrice:1599,sizes:['28','30','32','34'],cat:'bukser',type:'nytt',features:['Stretch-nylon','Klatreoptimalisert passform','Kne-ledd','Gusseted crotch']},
    {id:'n7',brand:'Fjällräven',name:'Keb Eco-Shell Jacket',price:2800,oldPrice:3999,sizes:['XS','S','M','L','XL'],cat:'jakker',type:'nytt',features:['Eco-Shell membran','Resirkulerte materialer','3 utvendige lommer','Hette med stivt visir']},
    {id:'n8',brand:'Salomon',name:'Outline Prism GTX Shoes',price:1390,oldPrice:1799,sizes:['39','40','41','42','43','44','45'],cat:'sko',type:'nytt',features:['Gore-Tex membran','Contagrip XT sål','EnergyCell+ demping','Quicklace system']},
    {id:'b1',brand:"Arc'teryx",name:'Beta AR Jacket — Str. M',price:2100,oldPrice:5499,cond:'Topptrim',condDesc:'Brukt 2–3 ganger. Ingen synlige tegn på bruk.',sizes:['M'],cat:'jakker',type:'brukt',features:['Gore-Tex Pro 3-lags','N80p-X face fabric','WaterTight glidelåser','Magnetisk hette']},
    {id:'b2',brand:'Patagonia',name:'R1 TechFace Hoody — Str. L',price:549,oldPrice:1799,cond:'Turerfaren',condDesc:'Noe pilling på ermene. Full funksjon og vaskbar.',sizes:['L'],cat:'mellomlag',type:'brukt',features:['Polartec Power Stretch Pro','Svært stretchy og pustende','Integrert hette','Fair Trade-sertifisert']},
    {id:'b3',brand:'Salomon',name:'X Ultra 4 GTX — Str. 43',price:850,oldPrice:1749,cond:'Topptrim',condDesc:'Brukt én sesong. Lite skitt på såle, ellers som ny.',sizes:['43'],cat:'sko',type:'brukt',features:['Gore-Tex membran','Contagrip MA såle','OrthoLite innerssåle','Advanced Chassis']},
    {id:'b4',brand:'Norrøna',name:'Bitihorn Dri1 Pants — Str. S',price:299,oldPrice:1099,cond:'Arbeidshest',condDesc:'Tydelig slitasje på knær. Alle sting og glidelåser fungerer.',sizes:['S'],cat:'bukser',type:'brukt',features:['Norrøna Dri1-stoff','Pustende og lett','Glidelås i bena','Elastisk linning']},
    {id:'b5',brand:'Helly Hansen',name:'Odin 9 Worlds Jacket — XL',price:1600,oldPrice:4499,cond:'Topptrim',condDesc:'Brukt 3 ganger totalt. Som ny fra fabrikk.',sizes:['XL'],cat:'jakker',type:'brukt',features:['Helly Tech Pro 3L','Resirkulert nylon','Heldekkende glidelåser','Pakkes i egen pose']},
    {id:'b6',brand:'Bergans',name:'Trollhetta Insulated Jacket — S',price:750,oldPrice:2299,cond:'Turerfaren',condDesc:'Litt pilling innvendig. God isolasjon og tett.',sizes:['S'],cat:'jakker',type:'brukt',features:['PrimaLoft Gold isolasjon','Resirkulert face fabric','Packable i lomme','DWR-behandlet']},
    {id:'b7',brand:'Kari Traa',name:'Tikse Tights — M',price:180,oldPrice:599,cond:'Turerfaren',condDesc:'Vasket og klar. Noe pilling i skrittet.',sizes:['M'],cat:'bukser',type:'brukt',features:['Merinomix','God strekk','Bred linning','Reflekselement']},
    {id:'b8',brand:'Black Diamond',name:'Stance Beanie',price:80,oldPrice:299,cond:'Topptrim',condDesc:'Brukt 2 ganger. Ingen bruksmerker.',sizes:['One size'],cat:'tilbehor',type:'brukt',features:['Merino-blend','Stretch-passform','Kan brettes','Naturlig luktresistent']},
  ];

  MO.findProduct = function (id) {
    return MO.products.find(function (p) { return p.id === id; }) || null;
  };

  MO.sanitize = function (str) {
    var d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
  };

  MO.skeletonHTML = function (n) {
    var h = '';
    for (var i = 0; i < n; i++) {
      h += '<div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-body"><div class="skeleton-line"></div><div class="skeleton-line skeleton-line--sm"></div><div class="skeleton-line skeleton-line--price"></div></div></div>';
    }
    return h;
  };

  MO.reviews = {
    _data: [
      { name: 'Marte L.', rating: 5, text: 'Kjøpte en brukt Norrøna-jakke til halv pris. Som ny! Anbefales på det sterkeste.', tag: 'Brukt', date: '2025-03-10', verified: true },
      { name: 'Andreas B.', rating: 5, text: 'Rask levering og helt feilfritt produkt. Handlekurven fungerte sømløst.', tag: 'Jakker', date: '2025-03-28', verified: true },
      { name: 'Silje H.', rating: 4, text: 'Fint plagg, god stand. Ble litt stor, men returen var helt problemfri.', tag: 'Bukser', date: '2025-04-02', verified: true },
      { name: 'Eirik N.', rating: 5, text: 'Første gang jeg handlet brukt fjellutstyr på nett. Ble positivt overrasket over kvaliteten.', tag: 'Brukt', date: '2025-04-05', verified: true },
      { name: 'Kristin Ø.', rating: 5, text: 'Tok en sjanse på brukt — angrer ikke. Spot on beskrivelse og rask frakt.', tag: 'Brukt', date: '2025-04-12', verified: false },
      { name: 'Thomas V.', rating: 4, text: 'Bra utvalg og fair priser. Savner flere bilder av produktene.', tag: 'Nytt', date: '2025-04-18', verified: false },
      { name: 'Hanna W.', rating: 5, text: 'Kjøpte gave til samboeren. Han ble kjempefornøyd. Kommer garantert til å handle mer.', tag: 'Sko', date: '2025-05-01', verified: true },
      { name: 'Nikolai S.', rating: 5, text: 'Gode priser på merkevarer. Og helt ærlige tilstandsvurderinger.', tag: 'Jakker', date: '2025-05-08', verified: true },
      { name: 'Mari P.', rating: 4, text: 'Veldig fornøyd med servicen. Fikk god hjelp på chat til å velge riktig størrelse.', tag: 'Mellomlag', date: '2025-05-14', verified: false },
    ],
    all: function () { return this._data; },
    avg: function () {
      var sum = 0, d = this._data;
      for (var i = 0; i < d.length; i++) sum += d[i].rating;
      return d.length ? sum / d.length : 0;
    },
    dist: function () {
      var dist = [0, 0, 0, 0, 0];
      for (var i = 0; i < this._data.length; i++) dist[this._data[i].rating - 1]++;
      return dist;
    },
    starsHTML: function (n, size) {
      var s = size || 13;
      var h = '';
      for (var i = 0; i < 5; i++) {
        h += '<span class="review-star ' + (i < n ? 'review-star--on' : 'review-star--off') + '" style="font-size:' + s + 'px">★</span>';
      }
      return h;
    },
    openForm: function () {
      MO.openModal('Skriv en anmeldelse',
        '<div class="form-field"><label class="form-label">Ditt navn</label><input class="form-input" id="rv-name" placeholder="Ola Nordmann"/></div>' +
        '<div class="form-field"><label class="form-label">Vurdering</label><div class="star-picker" id="rv-picker">' +
        [1, 2, 3, 4, 5].map(function (s) { return '<button class="star-picker__btn" data-star="' + s + '" type="button">★</button>'; }).join('') +
        '</div></div>' +
        '<div class="form-field"><label class="form-label">Kategori</label><select class="sort-select" id="rv-tag" style="width:100%"><option>Jakker</option><option>Bukser</option><option>Sko</option><option>Mellomlag</option><option>Brukt</option><option>Nytt</option></select></div>' +
        '<div class="form-field"><label class="form-label">Din opplevelse</label><textarea class="form-textarea" id="rv-text" placeholder="Hva syntes du?"></textarea></div>' +
        '<button class="btn btn-primary btn-full" onclick="MO.reviews.submit()">Send inn</button>'
      );
      setTimeout(function () {
        var picker = document.getElementById('rv-picker');
        if (!picker) return;
        var btns = picker.querySelectorAll('.star-picker__btn');
        Array.from(btns).reverse().forEach(function (b) {
          b.addEventListener('mouseenter', function () {
            var v = parseInt(this.getAttribute('data-star'));
            btns.forEach(function (x) { x.classList.toggle('on', parseInt(x.getAttribute('data-star')) <= v); });
          });
        });
        picker.addEventListener('mouseleave', function () {
          var v = parseInt(picker.getAttribute('data-selected') || 0);
          btns.forEach(function (x) { x.classList.toggle('on', parseInt(x.getAttribute('data-star')) <= v); });
        });
      }, 50);
    },
    submit: function () {
      var name = document.getElementById('rv-name');
      var picker = document.getElementById('rv-picker');
      var tag = document.getElementById('rv-tag');
      var text = document.getElementById('rv-text');
      var selected = picker ? picker.querySelector('.star-picker__btn.on:last-child') : null;
      var rating = selected ? parseInt(selected.getAttribute('data-star')) : 0;
      if (!name || !name.value.trim()) { MO.toast('Skriv inn navnet ditt'); return; }
      if (!rating) { MO.toast('Velg en vurdering'); return; }
      if (!text || !text.value.trim()) { MO.toast('Skriv en anmeldelse'); return; }
      this._data.unshift({
        name: name.value.trim(),
        rating: rating,
        text: text.value.trim(),
        tag: tag ? tag.value : 'Nytt',
        date: new Date().toISOString().slice(0, 10),
        verified: false,
      });
      MO.closeModal();
      MO.toast('Takket for din anmeldelse!');
      if (typeof MO.reviews.render === 'function') MO.reviews.render();
    },
    render: function () {
      var all = this.all();
      var avg = this.avg();
      var dist = this.dist();
      var avgEl = document.getElementById('rv-avg');
      var starsEl = document.getElementById('rv-stars');
      var countEl = document.getElementById('rv-count');
      var barsEl = document.getElementById('rv-bars');
      var gridEl = document.getElementById('rv-grid');
      if (avgEl) avgEl.textContent = avg.toFixed(1);
      if (starsEl) starsEl.innerHTML = this.starsHTML(Math.round(avg), 16);
      if (countEl) countEl.textContent = 'Basert på ' + all.length + ' anmeldelser';
      if (barsEl) {
        var bars = '';
        for (var s = 5; s >= 1; s--) {
          var pct = all.length ? Math.round(dist[s - 1] / all.length * 100) : 0;
          bars += '<div class="reviews-bar"><span class="reviews-bar__label">' + s + '</span>' +
            '<div class="reviews-bar__track"><div class="reviews-bar__fill" style="width:' + pct + '%"></div></div>' +
            '<span class="reviews-bar__count">' + dist[s - 1] + '</span></div>';
        }
        barsEl.innerHTML = bars;
      }
      if (gridEl) {
        gridEl.innerHTML = all.slice(0, 9).map(function (r) {
          var badge = r.verified ? '' : '<span style="font-size:10px;color:var(--g5);margin-left:6px">ny</span>';
          return '<div class="review-card' + (r.verified ? '' : ' review-card--user') + '">' +
            '<div class="review-card__stars">' + MO.reviews.starsHTML(r.rating) + '</div>' +
            '<p class="review-card__text">' + MO.sanitize(r.text) + '</p>' +
            '<div class="review-card__foot">' +
            '<div><span class="review-card__name">' + MO.sanitize(r.name) + '</span>' + badge + '</div>' +
            '<div style="display:flex;align-items:center;gap:6px">' +
            '<span class="review-card__tag">' + MO.sanitize(r.tag) + '</span>' +
            '<span class="review-card__date">' + MO.sanitize(r.date) + '</span>' +
            '</div>' +
            '</div></div>';
        }).join('');
      }
    },
  };

  MO.sortProducts = function (arr, method) {
    var sorted = arr.slice();
    switch (method) {
      case 'price-asc': sorted.sort(function (a, b) { return a.price - b.price; }); break;
      case 'price-desc': sorted.sort(function (a, b) { return b.price - a.price; }); break;
      case 'discount': sorted.sort(function (a, b) { return (b.oldPrice - b.price) / b.oldPrice - (a.oldPrice - a.price) / a.oldPrice; }); break;
      case 'last': sorted.sort(function (a, b) { return a.id < b.id ? 1 : -1; }); break;
    }
    return sorted;
  };

  MO.cardHTML = function (p) {
    var saving = Math.round((1 - p.price / p.oldPrice) * 100);
    var wished = MO.isWished(p.id);
    var condBadge = p.cond ? '<span class="badge badge-' + (p.cond === 'Topptrim' ? 'top' : p.cond === 'Turerfaren' ? 'mid' : 'low') + '">' + p.cond + '</span>' : '';
    return '<article class="pcard" data-pid="' + p.id + '" tabindex="0">' +
      '<div class="pcard__img" data-cat="' + p.cat + '">' +
      '<div class="pcard__img-inner"><svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.7" stroke-linecap="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg></div>' +
      '<div class="pcard__badges"><span class="badge badge-' + (p.type === 'nytt' ? 'new' : 'used') + '">' + (p.type === 'nytt' ? 'Nytt' : 'Brukt') + '</span>' + condBadge + '</div>' +
      '<button class="pcard__wish' + (wished ? ' active' : '') + '" data-wish="' + p.id + '" aria-label="Favoritt"><svg width="14" height="14" viewBox="0 0 24 24" fill="' + (wished ? '#c0392b' : 'none') + '" stroke="' + (wished ? '#c0392b' : 'currentColor') + '" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>' +
      '<div class="pcard__quick"><button class="btn btn-white btn-sm btn-full" data-quickadd="' + p.id + '">+ Legg i kurv</button></div>' +
      '</div>' +
      '<div class="pcard__body">' +
      '<p class="pcard__brand">' + p.brand + '</p>' +
      '<h3 class="pcard__name">' + p.name + '</h3>' +
      (p.condDesc ? '<p class="pcard__cond">' + p.condDesc.split('.')[0] + '.</p>' : '') +
      '<div class="pcard__prices"><span class="pcard__price">' + p.price.toLocaleString('no-NO') + ' kr</span><span class="pcard__old">' + p.oldPrice.toLocaleString('no-NO') + ' kr</span><span class="pcard__save">–' + saving + '%</span></div>' +
      '</div></article>';
  };

  MO._quickAdd = function (id) {
    var p = MO.findProduct(id);
    if (!p) return;
    MO.addToCart(id, p.sizes[Math.floor(p.sizes.length / 2)]);
  };

  MO.cart = JSON.parse(localStorage.getItem('mo_cart') || '[]');

  MO.saveCart = function () {
    localStorage.setItem('mo_cart', JSON.stringify(MO.cart));
  };

  MO.addToCart = function (id, size) {
    var p = MO.findProduct(id);
    if (!p) return;
    var existing = MO.cart.find(function (i) { return i.id === id && i.size === size; });
    if (existing) existing.qty++;
    else MO.cart.push({ id: id, brand: p.brand, name: p.name, price: p.price, size: size, qty: 1, type: p.type });
    MO.saveCart();
    MO.updateCartBadge();
    MO.toast(p.name.split(' ').slice(0, 3).join(' ') + ' lagt i kurven');
  };

  MO.removeFromCart = function (id, size) {
    MO.cart = MO.cart.filter(function (i) { return !(i.id === id && i.size === size); });
    MO.saveCart();
    MO.updateCartBadge();
  };

  MO.cartTotal = function () {
    return MO.cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
  };

  MO.updateCartBadge = function () {
    var count = MO.cart.reduce(function (s, i) { return s + i.qty; }, 0);
    document.querySelectorAll('.cart-badge').forEach(function (el) {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  };

  MO.wishlist = JSON.parse(localStorage.getItem('mo_wish') || '[]');

  MO.toggleWish = function (id) {
    var idx = MO.wishlist.indexOf(id);
    var p = MO.findProduct(id);
    if (idx > -1) {
      MO.wishlist.splice(idx, 1);
      MO.toast('Fjernet fra favoritter');
    } else {
      MO.wishlist.push(id);
      MO.toast((p ? p.name.split(' ').slice(0, 3).join(' ') : 'Produkt') + ' lagt til favoritter');
    }
    localStorage.setItem('mo_wish', JSON.stringify(MO.wishlist));
  };

  MO.isWished = function (id) { return MO.wishlist.indexOf(id) > -1; };

  MO._toastTimer = null;

  MO.toast = function (msg) {
    var t = document.getElementById('toast');
    if (!t) return;
    document.getElementById('toast-msg').textContent = msg;
    t.classList.add('show');
    clearTimeout(MO._toastTimer);
    MO._toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2800);
  };

  MO.openModal = function (title, html) {
    document.getElementById('gm-title').textContent = title;
    document.getElementById('gm-body').innerHTML = html;
    document.getElementById('modal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  MO.closeModal = function () {
    document.getElementById('modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
  };

  MO._selectedSize = {};

  MO.openProduct = function (id) {
    var p = MO.findProduct(id);
    if (!p) return;
    var saving = Math.round((1 - p.price / p.oldPrice) * 100);
    var condHtml = p.cond ? '<span class="badge badge-' + (p.cond === 'Topptrim' ? 'top' : p.cond === 'Turerfaren' ? 'mid' : 'low') + '" style="margin-bottom:8px;display:inline-flex">' + p.cond + '</span><br>' : '';
    var sizesHtml = p.sizes.map(function (s) {
      return '<button class="pdm__sz" data-selsz=\'' + JSON.stringify({ id: id, sz: s }) + '\'>' + s + '</button>';
    }).join('');
    var featsHtml = (p.features || []).map(function (f) {
      return '<div class="pdm__feat"><span class="pdm__feat-dot"></span>' + f + '</div>';
    }).join('');
    var infoHtml =
      '<p class="pdm__brand">' + p.brand + '</p>' +
      '<h2 class="pdm__name">' + p.name + '</h2>' +
      (p.condDesc ? '<p class="pdm__cond">' + condHtml + p.condDesc + '</p>' : '') +
      '<div class="pdm__prices"><span class="pdm__price">' + p.price.toLocaleString('no-NO') + ' kr</span><span class="pdm__old">' + p.oldPrice.toLocaleString('no-NO') + ' kr</span><span class="pdm__save">–' + saving + '%</span></div>' +
      '<p class="pdm__lbl">Størrelse</p>' +
      '<div class="pdm__sizes">' + sizesHtml + '</div>' +
      '<button class="btn btn-primary btn-full btn-lg" data-atcmodal="' + id + '" style="margin-top:16px">Legg i handlekurv</button>' +
      '<button class="btn btn-ghost btn-full" data-wishmodal="' + id + '" style="margin-top:8px">♡ Legg til favoritter</button>' +
      (featsHtml ? '<div class="pdm__features">' + featsHtml + '</div>' : '');

    document.getElementById('pdm-title').textContent = p.brand + ' — ' + p.name;
    document.getElementById('pdm-body').innerHTML =
      '<div class="pdm__grid">' +
      '<div class="pdm__img"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.7" stroke-linecap="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg></div>' +
      '<div>' + infoHtml + '</div>' +
      '</div>';
    document.getElementById('pdm-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  MO.closePdm = function () {
    document.getElementById('pdm-overlay').classList.remove('open');
    document.body.style.overflow = '';
  };

  MO.openCart = function () {
    MO.renderCartDrawer();
    document.getElementById('cart-overlay').classList.add('open');
    document.getElementById('cart-drawer').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  MO.closeCart = function () {
    document.getElementById('cart-overlay').classList.remove('open');
    document.getElementById('cart-drawer').classList.remove('open');
    document.body.style.overflow = '';
  };

  MO.renderCartDrawer = function () {
    var body = document.getElementById('cart-drawer-body');
    var foot = document.getElementById('cart-drawer-foot');
    if (!body) return;
    if (MO.cart.length === 0) {
      body.innerHTML = '<div class="drawer__empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><p style="font-weight:500;margin-bottom:5px">Handlekurven er tom</p><p style="font-size:13px">Finn noe du vil ha!</p><a href="index.html" class="btn btn-primary btn-sm" style="margin-top:14px;display:inline-flex">Se produkter</a></div>';
      if (foot) foot.style.display = 'none';
      return;
    }
    body.innerHTML = MO.cart.map(function (item) {
      return '<div class="cart-item"><div class="cart-item__img"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg></div><div style="flex:1"><div class="cart-item__brand">' + item.brand + '</div><div class="cart-item__name">' + item.name + '</div><div class="cart-item__meta">Str. ' + item.size + (item.qty > 1 ? ' · Antall: ' + item.qty : '') + '</div><div class="cart-item__price">' + (item.price * item.qty).toLocaleString('no-NO') + ' kr</div><span class="cart-item__rm" data-rmcart=\'' + JSON.stringify({ id: item.id, size: item.size }) + '\'>Fjern</span></div></div>';
    }).join('');
    if (foot) {
      foot.style.display = 'block';
      var sumEl = document.getElementById('cart-drawer-total');
      if (sumEl) sumEl.textContent = MO.cartTotal().toLocaleString('no-NO') + ' kr';
    }
  };

  MO.openSearch = function () {
    document.getElementById('searchbar').classList.add('open');
    setTimeout(function () { document.getElementById('search-input').focus(); }, 80);
  };

  MO.closeSearch = function () {
    document.getElementById('searchbar').classList.remove('open');
  };

  MO.initNav = function () {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          document.getElementById('main-nav').classList.toggle('scrolled', window.scrollY > 8);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        MO.closeSearch();
        MO.closeCart();
        MO.closeModal();
        MO.closePdm();
      }
    });

    MO.updateCartBadge();
  };

  MO.initReveal = function () {
    if (window.MO_revealInited) return;
    window.MO_revealInited = true;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.sr').forEach(function (el) { obs.observe(el); });
  };

  MO.initProductHash = function () {
    if (window.location.hash) {
      var el = document.querySelector(window.location.hash);
      if (el) setTimeout(function () { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 400);
    }
  };

  MO.modals = {
    om: { title: 'Om M&O', html: '<p style="font-size:15px;line-height:1.82;color:var(--text-3)">M&O ble startet av to venner med en felles lidenskap for fjell og en felles frustrasjon over prisene i de tradisjonelle sportsbutikkene.<br><br>Vi mente at det ikke skulle koste en formue å utruste seg ordentlig. Løsningen ble å kutte alle unødvendige ledd — ingen mellommenn, ingen dyre butikklokaler — og i stedet selge direkte til deg som vil ut på tur.<br><br>I dag tilbyr vi over 400 produkter fra verdens beste merker, både splitter nye og nøye utvalgte brukte plagg. Alt er kontrollert, rengjort og ærlig beskrevet.</p><div style="display:flex;gap:10px;margin-top:20px"><a href="index.html" class="btn btn-primary" onclick="MO.closeModal()">Se sortimentet</a><button class="btn btn-ghost" onclick="MO.closeModal()">Lukk</button></div>' },
    selg: { title: 'Selg klær til oss', html: '<p style="font-size:14px;color:var(--text-3);margin-bottom:18px">Send oss bilder og vi gir deg et tilbud innen 24 timer. Vi tar imot pent brukte plagg fra kjente fjellmerker.</p><div class="form-field"><label class="form-label">Navn</label><input class="form-input" placeholder="Ola Nordmann"/></div><div class="form-field"><label class="form-label">E-postadresse</label><input class="form-input" type="email" placeholder="ola@fjell.no"/></div><div class="form-field"><label class="form-label">Beskriv plaggene</label><textarea class="form-textarea" placeholder="Merke, type, størrelse, stand..."></textarea></div><button class="btn btn-primary btn-full" data-close-toast="Forespørsel sendt! Vi svarer innen 24 timer">Send inn</button>' },
    kontakt: { title: 'Kontakt oss', html: '<p style="font-size:14px;color:var(--text-3);margin-bottom:18px">Vi svarer vanligvis innen 1–2 virkedager på e-post.</p><div class="form-field"><label class="form-label">Navn</label><input class="form-input" placeholder="Ola Nordmann"/></div><div class="form-field"><label class="form-label">E-postadresse</label><input class="form-input" type="email" placeholder="ola@fjell.no"/></div><div class="form-field"><label class="form-label">Melding</label><textarea class="form-textarea" placeholder="Hva lurer du på?"></textarea></div><button class="btn btn-primary btn-full" data-close-toast="Melding sendt! Takk for at du tok kontakt">Send melding</button>' },
    frakt: { title: 'Frakt & levering', html: '<div style="display:flex;flex-direction:column;gap:12px"><div style="background:var(--g10);border-radius:10px;padding:16px"><p style="font-weight:500;margin-bottom:4px">Standardlevering</p><p style="font-size:13px;color:var(--text-3)">1–3 virkedager · 69 kr<br>Gratis frakt over 999 kr</p></div><div style="background:var(--g10);border-radius:10px;padding:16px"><p style="font-weight:500;margin-bottom:4px">Ekspress (neste dag)</p><p style="font-size:13px;color:var(--text-3)">Bestilling innen kl. 12.00 · 149 kr</p></div><div style="background:var(--g10);border-radius:10px;padding:16px"><p style="font-weight:500;margin-bottom:4px">PostNord hentested</p><p style="font-size:13px;color:var(--text-3)">2–4 virkedager · 49 kr · Gratis over 799 kr</p></div></div>' },
    retur: { title: 'Retur & bytte', html: '<p style="font-size:15px;color:var(--text-3);margin-bottom:18px;line-height:1.7">14 dagers returrett — også på brukte varer. Ingen spørsmål stilles.</p><div style="display:flex;flex-direction:column;gap:12px"><div style="display:flex;gap:12px;align-items:flex-start"><div style="width:22px;height:22px;background:var(--g9);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;font-size:11px;font-weight:600;color:var(--g3)">1</div><p style="font-size:14px;color:var(--text-3)">Logg inn og gå til "Mine ordrer"</p></div><div style="display:flex;gap:12px;align-items:flex-start"><div style="width:22px;height:22px;background:var(--g9);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;font-size:11px;font-weight:600;color:var(--g3)">2</div><p style="font-size:14px;color:var(--text-3)">Velg produktet og klikk "Start retur"</p></div><div style="display:flex;gap:12px;align-items:flex-start"><div style="width:22px;height:22px;background:var(--g9);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;font-size:11px;font-weight:600;color:var(--g3)">3</div><p style="font-size:14px;color:var(--text-3)">Pakk inn og lever på nærmeste Post i Butikk</p></div><div style="display:flex;gap:12px;align-items:flex-start"><div style="width:22px;height:22px;background:var(--g9);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;font-size:11px;font-weight:600;color:var(--g3)">4</div><p style="font-size:14px;color:var(--text-3)">Refusjon til kortbetaling innen 3–5 virkedager</p></div></div>' },
    baerekraft: { title: 'Bærekraft', html: '<p style="font-size:15px;line-height:1.82;color:var(--text-3)">Hos M&O handler bærekraft om praktisk fornuft, ikke bare markedsføring.<br><br>Ved å selge brukte fjellklær forlenger vi levetiden på plagg som ellers ville blitt kastet. Hvert brukte plagg vi selger er et plagg som ikke trenger å produseres på nytt — med alt det innebærer av energi, vann og råvarer.<br><br>Vi jobber også for å pakke alle ordrer med minimal og resirkulerbar emballasje.</p>' },
    personvern: { title: 'Personvern', html: '<p style="font-size:15px;line-height:1.82;color:var(--text-3)">M&O behandler dine personopplysninger i samsvar med GDPR og norsk personopplysningslov.<br><br>Vi samler kun inn informasjon som er nødvendig for å behandle og levere din bestilling. Vi deler aldri dine opplysninger med tredjeparter for markedsføringsformål.<br><br>Ta kontakt for personvernsspørsmål: <a href="mailto:post@mando.no" style="color:var(--g5)">post@mando.no</a></p>' },
    vilkar: { title: 'Vilkår', html: '<p style="font-size:15px;line-height:1.82;color:var(--text-3)">Ved å handle hos M&O aksepterer du våre salgsbetingelser. Alle priser er oppgitt i norske kroner inkl. MVA.<br><br>Brukte produkter er nøye inspisert og beskrevet så presist som mulig.<br><br>Angreretten på 14 dager gjelder også brukte varer. Varer må returneres i samme stand som ved mottak.</p>' },
  };

  MO.showModal = function (key) { var m = MO.modals[key]; if (m) MO.openModal(m.title, m.html); };

  MO.openMobileMenu = function () {
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

  MO.subscribe = function () {
    var inp = document.getElementById('nl-email');
    if (!inp || !inp.value || !inp.value.includes('@')) {
      if (inp) { inp.style.borderColor = '#c0392b'; setTimeout(function () { inp.style.borderColor = ''; }, 1500); }
      MO.toast('Skriv inn en gyldig e-postadresse');
      return;
    }
    inp.value = '';
    inp.placeholder = 'Du er påmeldt!';
    setTimeout(function () { if (inp) inp.placeholder = 'din@epost.no'; }, 4000);
    MO.toast('Påmeldt! Velkommen til M&O-familien');
  };

  MO.catFilter = function (btn, cat) {
    document.querySelectorAll('.catbar__btn').forEach(function (b) { b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    var fn = function (arr) {
      if (cat === 'alle') return arr;
      if (cat === 'salg') return arr.filter(function (p) { return Math.round((1 - p.price / p.oldPrice) * 100) >= 50; });
      return arr.filter(function (p) { return p.cat === cat; });
    };
    document.getElementById('grid-nytt').innerHTML = fn(MO.products.filter(function (p) { return p.type === 'nytt'; })).map(MO.cardHTML).join('');
    document.getElementById('grid-brukt').innerHTML = fn(MO.products.filter(function (p) { return p.type === 'brukt'; })).map(MO.cardHTML).join('');
  };

  MO.openWishlistPage = function () {
    if (MO.wishlist.length === 0) {
      MO.openModal('Favoritter', '<div style="text-align:center;padding:40px 0;color:var(--text-4)"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="margin:0 auto 16px;display:block"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg><p style="font-weight:500;margin-bottom:6px;color:var(--text)">Ingen favoritter ennå</p><p style="font-size:13px">Trykk hjertet på produktene du liker</p></div>');
      return;
    }
    var items = MO.wishlist.map(function (id) {
      var p = MO.findProduct(id);
      if (!p) return '';
      return '<div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--gray-100)"><div style="width:54px;height:60px;background:var(--gray-100);border-radius:9px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--gray-300)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg></div><div style="flex:1"><p style="font-size:11px;text-transform:uppercase;letter-spacing:.09em;color:var(--text-4)">' + p.brand + '</p><p style="font-size:14px;font-weight:500;margin:2px 0">' + p.name + '</p><p style="font-family:var(--serif);font-size:17px;color:var(--g3)">' + p.price.toLocaleString('no-NO') + ' kr</p></div><button class="btn btn-primary btn-sm" data-wishopen="' + id + '">Se produkt</button></div>';
    }).join('');
    MO.openModal('Favoritter (' + MO.wishlist.length + ')', items);
  };

  MO.renderProductGrid = function (gridId, type) {
    var items = MO.products.filter(function (p) { return p.type === type; });
    document.getElementById(gridId).innerHTML = MO.skeletonHTML(4);
    setTimeout(function () {
      document.getElementById(gridId).innerHTML = items.map(MO.cardHTML).join('');
      MO.initReveal();
      MO.initProductHash();
    }, 300);
  };

  MO.initIndexFilters = function () {
    var nytt = MO.products.filter(function (p) { return p.type === 'nytt'; });
    var brukt = MO.products.filter(function (p) { return p.type === 'brukt'; });
    var nyttSort = 'default', bruktSort = 'default';

    MO.filterNytt = function (btn, cat) {
      var container = document.querySelector('#filters-nytt');
      if (container) {
        container.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active-new'); });
      }
      if (btn) { btn.classList.add('active-new'); btn.setAttribute('data-cat', cat); }
      var arr = cat === 'alle' ? nytt : nytt.filter(function (p) { return p.cat === cat; });
      arr = MO.sortProducts(arr, nyttSort);
      document.getElementById('grid-nytt').innerHTML = arr.map(MO.cardHTML).join('');
      var countEl = document.getElementById('count-nytt');
      if (countEl) countEl.innerHTML = 'Viser <strong>' + arr.length + '</strong> produkter';
      MO.initReveal();
    };

    MO.filterBrukt = function (btn, stand) {
      var container = document.querySelector('#filters-brukt');
      if (container) {
        container.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active-used'); });
      }
      if (btn) { btn.classList.add('active-used'); btn.setAttribute('data-stand', stand); }
      var arr = stand === 'alle' ? brukt : brukt.filter(function (p) { return p.cond === stand; });
      arr = MO.sortProducts(arr, bruktSort);
      document.getElementById('grid-brukt').innerHTML = arr.map(MO.cardHTML).join('');
      var countEl = document.getElementById('count-brukt');
      if (countEl) countEl.innerHTML = 'Viser <strong>' + arr.length + '</strong> produkter';
      MO.initReveal();
    };

    MO.applySortNytt = function (method) {
      nyttSort = method;
      var activeBtn = document.querySelector('#filters-nytt .active-new');
      var cat = activeBtn ? (activeBtn.getAttribute('data-cat') || 'alle') : 'alle';
      var arr = MO.sortProducts(cat === 'alle' ? nytt : nytt.filter(function (p) { return p.cat === cat; }), method);
      document.getElementById('grid-nytt').innerHTML = arr.map(MO.cardHTML).join('');
      var countEl = document.getElementById('count-nytt');
      if (countEl) countEl.innerHTML = 'Viser <strong>' + arr.length + '</strong> produkter';
      MO.initReveal();
    };

    MO.applySortBrukt = function (method) {
      bruktSort = method;
      var activeBtn = document.querySelector('#filters-brukt .active-used');
      var stand = activeBtn ? (activeBtn.getAttribute('data-stand') || 'alle') : 'alle';
      var arr = MO.sortProducts(stand === 'alle' ? brukt : brukt.filter(function (p) { return p.cond === stand; }), method);
      document.getElementById('grid-brukt').innerHTML = arr.map(MO.cardHTML).join('');
      var countEl = document.getElementById('count-brukt');
      if (countEl) countEl.innerHTML = 'Viser <strong>' + arr.length + '</strong> produkter';
      MO.initReveal();
    };

    MO.renderProductGrid('grid-nytt', 'nytt');
    MO.renderProductGrid('grid-brukt', 'brukt');

    var setCount = function (gridId, countId, arr) {
      var el = document.getElementById(countId);
      if (el) el.innerHTML = 'Viser <strong>' + arr.length + '</strong> produkter';
    };
    setCount('grid-nytt', 'count-nytt', nytt);
    setCount('grid-brukt', 'count-brukt', brukt);
  };

  MO.initHikerAnimation = function () {
    var armL = document.getElementById('arm-l');
    if (!armL) return;
    var armR = document.getElementById('arm-r');
    var legL = document.getElementById('leg-l');
    var legR = document.getElementById('leg-r');
    var footL = document.getElementById('foot-l');
    var footR = document.getElementById('foot-r');
    var pole = document.getElementById('pole');
    var t = 0;

    function animate() {
      t += 0.08;
      var sw = Math.sin(t) * 6;
      armL.setAttribute('x2', 10 + sw);
      armL.setAttribute('y2', 26 - Math.abs(sw) * 0.3);
      armR.setAttribute('x2', 26 - sw * 0.5);
      legL.setAttribute('x2', 12 + sw);
      legL.setAttribute('y2', 48 + (sw > 0 ? 3 : 0));
      legR.setAttribute('x2', 22 - sw);
      legR.setAttribute('y2', 48 + (sw < 0 ? 3 : 0));
      footL.setAttribute('x1', 12 + sw);
      footL.setAttribute('y1', 48 + (sw > 0 ? 3 : 0));
      footL.setAttribute('x2', 7 + sw);
      footL.setAttribute('y2', 54 + (sw > 0 ? 2 : 0));
      footR.setAttribute('x1', 22 - sw);
      footR.setAttribute('y1', 48 + (sw < 0 ? 3 : 0));
      footR.setAttribute('x2', 27 - sw);
      footR.setAttribute('y2', 54 + (sw < 0 ? 2 : 0));
      if (pole) pole.setAttribute('y1', 22 - Math.abs(sw) * 0.2);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  };

  MO.initSearch = function () {
    var input = document.getElementById('search-input');
    if (!input) return;
    var allNytt = MO.products.filter(function (p) { return p.type === 'nytt'; });
    var allBrukt = MO.products.filter(function (p) { return p.type === 'brukt'; });
    var debounceTimer;

    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        var q = input.value.toLowerCase().trim();
        if (!q) {
          document.getElementById('grid-nytt').innerHTML = allNytt.map(MO.cardHTML).join('');
          document.getElementById('grid-brukt').innerHTML = allBrukt.map(MO.cardHTML).join('');
          return;
        }
        var fn = function (arr) {
          return arr.filter(function (p) {
            return (p.name + p.brand + (p.cond || '') + p.cat).toLowerCase().includes(q);
          });
        };
        document.getElementById('grid-nytt').innerHTML = fn(allNytt).map(MO.cardHTML).join('');
        document.getElementById('grid-brukt').innerHTML = fn(allBrukt).map(MO.cardHTML).join('');
      }, 200);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') MO.closeSearch();
    });
  };

  MO.initEventDelegation = function () {
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-quickadd]');
      if (t) { e.stopPropagation(); MO._quickAdd(t.getAttribute('data-quickadd')); return; }

      t = e.target.closest('[data-wish]');
      if (t) { e.stopPropagation(); MO.toggleWish(t.getAttribute('data-wish')); t.classList.toggle('active'); var svg = t.querySelector('svg'); if (svg) { var on = t.classList.contains('active'); svg.setAttribute('fill', on ? '#c0392b' : 'none'); svg.setAttribute('stroke', on ? '#c0392b' : 'currentColor'); } return; }

      t = e.target.closest('[data-rmcart]');
      if (t) { try { var d = JSON.parse(t.getAttribute('data-rmcart')); MO.removeFromCart(d.id, d.size); MO.renderCartDrawer(); } catch (e) {} return; }

      t = e.target.closest('[data-atcmodal]');
      if (t) { MO._atcModal(t.getAttribute('data-atcmodal')); return; }

      t = e.target.closest('[data-wishmodal]');
      if (t) { MO.toggleWish(t.getAttribute('data-wishmodal')); MO.closePdm(); return; }

      t = e.target.closest('[data-wishopen]');
      if (t) { MO.closeModal(); MO.openProduct(t.getAttribute('data-wishopen')); return; }

      t = e.target.closest('[data-selsz]');
      if (t) { try { var sd = JSON.parse(t.getAttribute('data-selsz')); t.closest('.pdm__sizes').querySelectorAll('.pdm__sz').forEach(function (b) { b.classList.remove('active'); }); t.classList.add('active'); MO._selectedSize[sd.id] = sd.sz; } catch (e) {} return; }

      t = e.target.closest('[data-close-toast]');
      if (t) { MO.closeModal(); MO.toast(t.getAttribute('data-close-toast')); return; }

      t = e.target.closest('.pcard');
      if (t && !e.target.closest('.pcard__wish') && !e.target.closest('.pcard__quick')) {
        var pid = t.getAttribute('data-pid');
        if (pid) MO.openProduct(pid);
        return;
      }

      t = e.target.closest('.catbar__btn');
      if (t) { var cat = t.textContent.trim().toLowerCase(); var catMap = { 'alle': 'alle', 'jakker & yttertøy': 'jakker', 'mellomlag': 'mellomlag', 'bukser': 'bukser', 'sko & støvler': 'sko', 'tilbehør': 'tilbehor', 'tilbud': 'salg' }; var resolvedCat = catMap[cat] || 'alle'; if (resolvedCat === 'salg' || cat === '🔥 tilbud') resolvedCat = 'salg'; MO.catFilter(t, resolvedCat); return; }

      t = e.target.closest('.filter-btn');
      if (t) {
        var container = t.closest('.filters');
        if (!container) return;
        var id = container.id;
        if (id === 'filters-nytt') { var c = t.getAttribute('data-cat') || t.textContent.trim().toLowerCase(); MO.filterNytt(t, c === 'alle' ? 'alle' : c); return; }
        if (id === 'filters-brukt') { var s = t.getAttribute('data-stand') || t.textContent.trim().toLowerCase(); MO.filterBrukt(t, s === 'alle stander' ? 'alle' : s); return; }
        return;
      }

      t = e.target.closest('.faq-q');
      if (t) { t.closest('.faq-item').classList.toggle('open'); return; }
    });

    document.addEventListener('change', function (e) {
      if (e.target.id === 'sort-nytt') { MO.applySortNytt(e.target.value); return; }
      if (e.target.id === 'sort-brukt') { MO.applySortBrukt(e.target.value); return; }
    });
  };

  MO._atcModal = function (id) {
    var p = MO.findProduct(id);
    if (!p) return;
    var sz = p.sizes.length === 1 ? p.sizes[0] : MO._selectedSize[id];
    if (!sz) { MO.toast('Velg størrelse først'); return; }
    MO.addToCart(id, sz);
    MO.closePdm();
  };

  MO.renderReviews = function () {
    MO.reviews.render();
  };

  MO.initBackToTop = function () {
    var btn = document.getElementById('back-top');
    if (!btn) return;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          btn.classList.toggle('show', window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  MO.initMobileNav = function () {
    var nav = document.getElementById('mobile-nav');
    if (!nav) return;
    nav.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-mnav]');
      if (!btn) return;
      var target = btn.getAttribute('data-mnav');
      if (target === 'cart') MO.openCart();
      else if (target === 'search') MO.openSearch();
      else if (target === 'wish') MO.openWishlistPage();
      else if (target === 'menu') MO.openMobileMenu();
    });
  };

  MO.initCookieConsent = function () {
    if (localStorage.getItem('mo_cookie_consent')) return;
    var bar = document.getElementById('cookie-bar');
    if (!bar) return;
    setTimeout(function () { bar.classList.add('show'); }, 800);
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-cookie]');
      if (!btn) return;
      localStorage.setItem('mo_cookie_consent', btn.getAttribute('data-cookie'));
      bar.classList.remove('show');
    });
  };

  /* ── COLOR THEME TOGGLE ───────────────────────────── */
  MO.themes = ['default', 'warm', 'cool', 'earth', 'sunset'];
  MO.themeIcons = ['🎨', '🔥', '❄️', '🌿', '🌅'];
  MO.currentTheme = localStorage.getItem('mo_theme') || 'default';

  MO.initTheme = function () {
    MO.applyTheme(MO.currentTheme);
    var btn = document.getElementById('theme-btn');
    if (btn) {
      var idx = MO.themes.indexOf(MO.currentTheme);
      if (idx === -1) idx = 0;
      btn.textContent = MO.themeIcons[idx];
    }
  };

  MO.toggleTheme = function () {
    var idx = MO.themes.indexOf(MO.currentTheme);
    if (idx === -1) idx = 0;
    idx = (idx + 1) % MO.themes.length;
    MO.currentTheme = MO.themes[idx];
    MO.applyTheme(MO.currentTheme);
    localStorage.setItem('mo_theme', MO.currentTheme);
    var btn = document.getElementById('theme-btn');
    if (btn) btn.textContent = MO.themeIcons[idx];
    MO.toast('Farge tema: ' + MO.currentTheme.charAt(0).toUpperCase() + MO.currentTheme.slice(1));
  };

  MO.applyTheme = function (theme) {
    document.documentElement.setAttribute('data-theme', theme === 'default' ? '' : theme);
  };

  /* ── FLOATING PARTICLES ──────────────────────────── */
  MO.initParticles = function () {
    var hero = document.getElementById('hero');
    if (!hero || hero.querySelector('.particles-container')) return;
    var container = document.createElement('div');
    container.className = 'particles-container';
    container.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:0;overflow:hidden;';
    hero.insertBefore(container, hero.firstChild);
    var colors = ['rgba(200,169,106,.3)', 'rgba(255,255,255,.1)', 'rgba(107,143,98,.2)', 'rgba(200,169,106,.2)'];
    for (var i = 0; i < 15; i++) {
      var p = document.createElement('div');
      var size = 4 + Math.random() * 12;
      var x = Math.random() * 100;
      var y = Math.random() * 100;
      var dur = 8 + Math.random() * 12;
      var col = colors[Math.floor(Math.random() * colors.length)];
      p.style.cssText = 'position:absolute;left:' + x + '%;top:' + y + '%;width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:' + col + ';animation:particleFloat ' + dur + 's ease-in-out infinite;animation-delay:' + (Math.random() * 5) + 's;';
      container.appendChild(p);
    }
    /* inject keyframes if not present */
    if (!document.getElementById('particle-style')) {
      var style = document.createElement('style');
      style.id = 'particle-style';
      style.textContent = '@keyframes particleFloat{0%,100%{transform:translateY(0) translateX(0) scale(1);opacity:0}20%{opacity:1}50%{transform:translateY(-60px) translateX(20px) scale(1.2);opacity:.8}80%{opacity:.4}100%{transform:translateY(-100px) translateX(-10px) scale(0.5);opacity:0}}';
      document.head.appendChild(style);
    }
  };

  window.MO = MO;

})();
