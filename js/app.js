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

  MO.populateBrandFilters = function () {
    var brands = [];
    MO.products.forEach(function(p) {
      if (brands.indexOf(p.brand) === -1) brands.push(p.brand);
    });
    brands.sort();
    ['nytt', 'brukt'].forEach(function(prefix) {
      var el = document.getElementById('brand-' + prefix);
      if (!el) return;
      el.innerHTML = '<option value="alle">Merke: Alle</option>';
      brands.forEach(function(b) {
        el.innerHTML += '<option value="' + b.replace(/'/g, '\\"') + '">' + b + '</option>';
      });
    });
  };

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
      '<button class="pcard__compare' + (MO.inCompare(p.id) ? ' active' : '') + '" data-compare="' + p.id + '" aria-label="Sammenlign">Sammenlign</button>' +
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
    var removed = null;
    MO.cart = MO.cart.filter(function (i) {
      if (i.id === id && i.size === size) { removed = i; return false; }
      return true;
    });
    MO.saveCart();
    MO.updateCartBadge();
    if (removed) {
      MO.toast('Fjernet fra handlekurv', function () {
        MO.cart.push(removed);
        MO.saveCart();
        MO.updateCartBadge();
        MO.renderCartDrawer();
        MO.toast('Lagt tilbake i handlekurv');
      });
    }
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
      var removed = MO.wishlist[idx];
      MO.wishlist.splice(idx, 1);
      MO.toast('Fjernet fra favoritter', function () {
        MO.wishlist.push(removed);
        localStorage.setItem('mo_wish', JSON.stringify(MO.wishlist));
        MO.toast('Lagt tilbake i favoritter');
      });
    } else {
      MO.wishlist.push(id);
      MO.toast((p ? p.name.split(' ').slice(0, 3).join(' ') : 'Produkt') + ' lagt til favoritter', function () {
        MO.wishlist.pop();
        localStorage.setItem('mo_wish', JSON.stringify(MO.wishlist));
        MO.toast('Fjernet fra favoritter');
      });
    }
    localStorage.setItem('mo_wish', JSON.stringify(MO.wishlist));
  };

  MO.isWished = function (id) { return MO.wishlist.indexOf(id) > -1; };

  MO._toastTimer = null;

  MO.toast = function (msg, undoFn) {
    var t = document.getElementById('toast');
    if (!t) return;
    var msgEl = document.getElementById('toast-msg');
    msgEl.textContent = msg;
    var existingUndo = t.querySelector('.toast__undo');
    if (existingUndo) existingUndo.remove();
    if (undoFn) {
      var undoBtn = document.createElement('button');
      undoBtn.className = 'toast__undo';
      undoBtn.textContent = 'Angre';
      t.appendChild(undoBtn);
      undoBtn.onclick = function(e) {
        e.stopPropagation();
        undoFn();
        t.classList.remove('show');
      };
    }
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
      '<p class="pdm__lbl">Størrelse <button class="pdm__sizeguide" onclick="MO.showSizeGuide()" style="font-size:11px;color:var(--g5);background:none;border:none;cursor:pointer;text-decoration:underline;padding:0;font-family:var(--sans)">Hjelp</button></p>' +
      '<div class="pdm__sizes">' + sizesHtml + '</div>' +
      '<button class="btn btn-primary btn-full btn-lg" data-atcmodal="' + id + '" style="margin-top:16px">Legg i handlekurv</button>' +
      '<button class="btn btn-ghost btn-full" data-wishmodal="' + id + '" style="margin-top:8px">♡ Legg til favoritter</button>' +
      (featsHtml ? '<div class="pdm__features">' + featsHtml + '</div>' : '');

    document.getElementById('pdm-title').textContent = p.brand + ' — ' + p.name;
    document.getElementById('pdm-body').innerHTML =
      '<div class="pdm__grid">' +
      '<div class="pdm__img pdm__img--zoomable" onclick="MO.zoomImage(this)" style="cursor:zoom-in"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.7" stroke-linecap="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg></div>' +
      '<div>' + infoHtml + '</div>' +
      '</div>';
    document.getElementById('pdm-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    if ('ontouchstart' in window) {
      var startX, startY;
      var imgEl = document.querySelector('.pdm__grid .pdm__img');
      if (imgEl) {
        imgEl.addEventListener('touchstart', function (e) {
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
        }, { passive: true });
        imgEl.addEventListener('touchend', function (e) {
          if (!startX) return;
          var dx = e.changedTouches[0].clientX - startX;
          var dy = e.changedTouches[0].clientY - startY;
          if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
            MO.toast(dx > 0 ? 'Forrige bilde' : 'Neste bilde');
          }
          startX = null;
        }, { passive: true });
      }
    }
  };

  MO.closePdm = function () {
    document.getElementById('pdm-overlay').classList.remove('open');
    document.body.style.overflow = '';
  };

  MO.zoomImage = function (el) {
    var overlay = document.createElement('div');
    overlay.className = 'zoom-overlay';
    overlay.onclick = function () { overlay.remove(); };
    var content = el.cloneNode(true);
    content.onclick = function (e) { e.stopPropagation(); };
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    requestAnimationFrame(function () { overlay.classList.add('active'); });
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

    function getFilterState(prefix) {
      var typeEl = document.getElementById('type-' + prefix);
      var sizeEl = document.getElementById('size-' + prefix);
      var brandEl = document.getElementById('brand-' + prefix);
      return {
        type: typeEl ? typeEl.value : 'alle',
        size: sizeEl ? sizeEl.value : 'alle',
        brand: brandEl ? brandEl.value : 'alle'
      };
    }

    function filterProducts(arr, state) {
      var result = arr;
      if (state.type !== 'alle') result = result.filter(function (p) { return p.cat === state.type; });
      if (state.size !== 'alle') result = result.filter(function (p) { return p.sizes.indexOf(state.size) !== -1; });
      if (state.brand !== 'alle') result = result.filter(function (p) { return p.brand === state.brand; });
      return result;
    }

    function renderNytt() {
      var state = getFilterState('nytt');
      var arr = filterProducts(nytt, state);
      arr = MO.sortProducts(arr, nyttSort);
      document.getElementById('grid-nytt').innerHTML = arr.map(MO.cardHTML).join('');
      var countEl = document.getElementById('count-nytt');
      if (countEl) countEl.innerHTML = 'Viser <strong>' + arr.length + '</strong> produkter';
      MO.initReveal();
    }

    function renderBrukt() {
      var state = getFilterState('brukt');
      var arr = filterProducts(brukt, state);
      arr = MO.sortProducts(arr, bruktSort);
      document.getElementById('grid-brukt').innerHTML = arr.map(MO.cardHTML).join('');
      var countEl = document.getElementById('count-brukt');
      if (countEl) countEl.innerHTML = 'Viser <strong>' + arr.length + '</strong> produkter';
      MO.initReveal();
    }

    MO.filterNytt = renderNytt;
    MO.filterBrukt = renderBrukt;

    MO.applySortNytt = function (method) {
      nyttSort = method;
      renderNytt();
    };

    MO.applySortBrukt = function (method) {
      bruktSort = method;
      renderBrukt();
    };

    document.getElementById('type-nytt') && document.getElementById('type-nytt').addEventListener('change', renderNytt);
    document.getElementById('size-nytt') && document.getElementById('size-nytt').addEventListener('change', renderNytt);
    document.getElementById('brand-nytt') && document.getElementById('brand-nytt').addEventListener('change', renderNytt);
    document.getElementById('type-brukt') && document.getElementById('type-brukt').addEventListener('change', renderBrukt);
    document.getElementById('size-brukt') && document.getElementById('size-brukt').addEventListener('change', renderBrukt);
    document.getElementById('brand-brukt') && document.getElementById('brand-brukt').addEventListener('change', renderBrukt);

    MO.renderProductGrid('grid-nytt', 'nytt');
    MO.renderProductGrid('grid-brukt', 'brukt');

    var setCount = function (gridId, countId, arr) {
      var el = document.getElementById(countId);
      if (el) el.innerHTML = 'Viser <strong>' + arr.length + '</strong> produkter';
    };
    setCount('grid-nytt', 'count-nytt', nytt);
    setCount('grid-brukt', 'count-brukt', brukt);
    MO.populateBrandFilters();
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
    var running = true;

    /* Pause when hero is out of view */
    var hero = document.getElementById('hero');
    if (hero) {
      var obs = new IntersectionObserver(function (entries) {
        running = entries[0].isIntersecting;
        if (running && !window._hikerRAF) {
          window._hikerRAF = true;
          requestAnimationFrame(animate);
        }
      }, { threshold: 0 });
      obs.observe(hero);
    }

    function animate() {
      if (!running) { window._hikerRAF = false; return; }
      window._hikerRAF = true;
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

      t = e.target.closest('[data-compare]');
      if (t) { e.stopPropagation(); MO.toggleCompare(t.getAttribute('data-compare')); t.classList.toggle('active'); return; }

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
      if (t && !e.target.closest('.pcard__wish') && !e.target.closest('.pcard__quick') && !e.target.closest('.pcard__compare')) {
        var pid = t.getAttribute('data-pid');
        if (pid) MO.openProduct(pid);
        return;
      }

      t = e.target.closest('.catbar__btn');
      if (t) { var cat = t.textContent.trim().toLowerCase(); var catMap = { 'alle': 'alle', 'jakker & yttertøy': 'jakker', 'mellomlag': 'mellomlag', 'bukser': 'bukser', 'sko & støvler': 'sko', 'tilbehør': 'tilbehor', 'tilbud': 'salg' }; var resolvedCat = catMap[cat] || 'alle'; if (resolvedCat === 'salg' || cat === '🔥 tilbud') resolvedCat = 'salg'; MO.catFilter(t, resolvedCat); return; }

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

  /* ── LANGUAGE SYSTEM ──────────────────────────────── */
  MO.lang = localStorage.getItem('mo_lang') || 'no';
  MO.langCodes = ['no', 'en', 'de', 'zh', 'es'];
  MO.langNames = { no: 'Norsk', en: 'English', de: 'Deutsch', zh: '中文', es: 'Español' };
  MO.translations = {
    /* Nav */
    'nav.nytt': { no: 'Nytt', en: 'New', de: 'Neu', zh: '新品', es: 'Nuevo' },
    'nav.brukt': { no: 'Brukt', en: 'Used', de: 'Gebraucht', zh: '二手', es: 'Usado' },
    'nav.om': { no: 'Om oss', en: 'About', de: 'Über uns', zh: '关于我们', es: 'Sobre nosotros' },
    'nav.search': { no: 'Søk', en: 'Search', de: 'Suche', zh: '搜索', es: 'Buscar' },
    'nav.favorites': { no: 'Favoritter', en: 'Favorites', de: 'Favoriten', zh: '收藏', es: 'Favoritos' },
    'nav.cart': { no: 'Handlekurv', en: 'Cart', de: 'Warenkorb', zh: '购物车', es: 'Carrito' },
    'nav.menu': { no: 'Meny', en: 'Menu', de: 'Menü', zh: '菜单', es: 'Menú' },
    'nav.lang': { no: 'NO', en: 'EN', de: 'DE', zh: '中文', es: 'ES' },
    'nav.langtip': { no: 'Språk', en: 'Language', de: 'Sprache', zh: '语言', es: 'Idioma' },
    'nav.theme': { no: 'Tema', en: 'Theme', de: 'Thema', zh: '主题', es: 'Tema' },
    /* Search */
    'search.placeholder': { no: 'Søk etter merke, type eller størrelse…', en: 'Search brand, type or size…', de: 'Suche Marke, Typ oder Größe…', zh: '搜索品牌、类型或尺码…', es: 'Buscar marca, tipo o talla…' },
    'search.cancel': { no: 'Avbryt', en: 'Cancel', de: 'Abbrechen', zh: '取消', es: 'Cancelar' },
    /* Hero */
    'hero.eyebrow': { no: 'Mountain & Outdoor', en: 'Mountain & Outdoor', de: 'Berg & Outdoor', zh: '登山与户外', es: 'Montaña y Aire Libre' },
    'hero.title1': { no: 'Kle deg for fjellet.', en: 'Dress for the mountain.', de: 'Kleide dich für den Berg.', zh: '为山峰而着装。', es: 'Vístete para la montaña.' },
    'hero.title2': { no: 'Ikke for merkelappen.', en: 'Not for the label.', de: 'Nicht für das Etikett.', zh: '不为标签而穿。', es: 'No para la etiqueta.' },
    'hero.sub': { no: 'Kvalitetsfjellklær — nye og pent brukte — til priser som faktisk gir mening. Ingen unødvendige mellomlegg.', en: 'Quality mountain gear — new and gently used — at prices that make sense. No unnecessary markups.', de: 'Qualitätsbergausrüstung — neu und gepflegt gebraucht — zu Preisen, die Sinn ergeben. Keine unnötigen Aufschläge.', zh: '优质登山装备——新品和轻度二手——价格合理。没有不必要的加价。', es: 'Equipo de montaña de calidad — nuevo y usado en buen estado — a precios que tienen sentido. Sin recargos innecesarios.' },
    'hero.btn1': { no: 'Se nytt sortiment', en: 'Shop new arrivals', de: 'Neue Artikel entdecken', zh: '浏览新品', es: 'Ver novedades' },
    'hero.btn2': { no: 'Utforsk brukt', en: 'Explore used', de: 'Gebrauchte entdecken', zh: '探索二手', es: 'Explorar usado' },
    'hero.stat1': { no: 'Produkter', en: 'Products', de: 'Produkte', zh: '产品', es: 'Productos' },
    'hero.stat2': { no: 'Vs. butikkpris', en: 'vs. retail price', de: 'Ggü. Ladenpreis', zh: '对比零售价', es: 'vs. precio de tienda' },
    'hero.stat3': { no: 'Fri retur', en: 'Free returns', de: 'Kostenlose Rückgabe', zh: '免费退货', es: 'Devolución gratuita' },
    /* Trust */
    'trust.retur': { no: '14 dagers retur', en: '14 days return', de: '14 Tage Rückgabe', zh: '14天退货', es: '14 días de devolución' },
    'trust.retursub': { no: 'Også på brukte varer', en: 'Also on used items', de: 'Auch auf gebrauchte Artikel', zh: '二手商品同样适用', es: 'También en artículos usados' },
    'trust.betaling': { no: 'Trygg betaling', en: 'Secure payment', de: 'Sichere Zahlung', zh: '安全支付', es: 'Pago seguro' },
    'trust.betalingsub': { no: 'Vipps, kort & Klarna', en: 'Vipps, card & Klarna', de: 'Vipps, Karte & Klarna', zh: 'Vipps、银行卡和Klarna', es: 'Vipps, tarjeta y Klarna' },
    'trust.levering': { no: 'Rask levering', en: 'Fast delivery', de: 'Schnelle Lieferung', zh: '快速配送', es: 'Entrega rápida' },
    'trust.leveringsub': { no: '1–3 virkedager', en: '1–3 business days', de: '1–3 Werktage', zh: '1-3个工作日', es: '1–3 días hábiles' },
    'trust.kvalitet': { no: 'Kvalitetssikret brukt', en: 'Quality checked used', de: 'Qualitätsgeprüft gebraucht', zh: '质量检验二手', es: 'Usado verificado' },
    'trust.kvalitetsub': { no: 'Sjekket og vasket', en: 'Inspected & washed', de: 'Geprüft & gewaschen', zh: '检查并清洗', es: 'Inspeccionado y lavado' },
    /* Sections */
    'section.nytt.eyebrow': { no: 'Splitter nytt', en: 'Brand new', de: 'Funkelnagelneu', zh: '全新', es: 'Nuevo de paquete' },
    'section.nytt.title': { no: 'Nytt sortiment', en: 'New arrivals', de: 'Neue Artikel', zh: '新品到货', es: 'Novedades' },
    'section.brukt.eyebrow': { no: 'Pent brukt', en: 'Gently used', de: 'Gepflegt gebraucht', zh: '轻度使用', es: 'Usado en buen estado' },
    'section.brukt.title': { no: 'Brukt sortiment', en: 'Used selection', de: 'Gebrauchtauswahl', zh: '二手精选', es: 'Selección usada' },
    'section.sort': { no: 'Sorter etter', en: 'Sort by', de: 'Sortieren nach', zh: '排序方式', es: 'Ordenar por' },
    'section.sort.asc': { no: 'Pris: lav–høy', en: 'Price: low–high', de: 'Preis: niedrig–hoch', zh: '价格：低到高', es: 'Precio: bajo–alto' },
    'section.sort.desc': { no: 'Pris: høy–lav', en: 'Price: high–low', de: 'Preis: hoch–niedrig', zh: '价格：高到低', es: 'Precio: alto–bajo' },
    'section.sort.discount': { no: 'Størst rabatt', en: 'Biggest discount', de: 'Größter Rabatt', zh: '最大折扣', es: 'Mayor descuento' },
    'section.sort.last': { no: 'Siste eksemplar først', en: 'Last pieces first', de: 'Letzte Exemplare zuerst', zh: '最后库存优先', es: 'Últimas piezas primero' },
    'section.showing': { no: 'Viser', en: 'Showing', de: 'Zeige', zh: '显示', es: 'Mostrando' },
    'section.products': { no: 'produkter', en: 'products', de: 'Produkte', zh: '件产品', es: 'productos' },
    'section.alle': { no: 'Alle', en: 'All', de: 'Alle', zh: '全部', es: 'Todos' },
    'section.alle.stander': { no: 'Alle stander', en: 'All conditions', de: 'Alle Zustände', zh: '所有成色', es: 'Todos los estados' },
    /* Steps */
    'steps.eyebrow': { no: 'Enkelt og trygt', en: 'Simple and secure', de: 'Einfach und sicher', zh: '简单安全', es: 'Simple y seguro' },
    'steps.title': { no: 'Slik fungerer det', en: 'How it works', de: 'So funktioniert es', zh: '使用说明', es: 'Cómo funciona' },
    'steps.1.title': { no: 'Finn plagget', en: 'Find the item', de: 'Artikel finden', zh: '找到商品', es: 'Encuentra el artículo' },
    'steps.1.desc': { no: 'Bla gjennom nytt og brukt sortiment. Filtrer på kategori, stand og pris.', en: 'Browse new and used selection. Filter by category, condition and price.', de: 'Durchstöbere neue und gebrauchte Artikel. Filtere nach Kategorie, Zustand und Preis.', zh: '浏览新品和二手精选。按类别、成色和价格筛选。', es: 'Navega por la selección nueva y usada. Filtra por categoría, estado y precio.' },
    'steps.2.title': { no: 'Sjekk størrelse', en: 'Check size', de: 'Größe prüfen', zh: '确认尺码', es: 'Verifica la talla' },
    'steps.2.desc': { no: 'Bruk størrelsesguiden i produktvisningen. Usikker? Send oss en melding.', en: 'Use the size guide in product view. Unsure? Send us a message.', de: 'Nutze die Größentabelle in der Produktansicht. Unsicher? Schreib uns.', zh: '在产品视图中使用尺码指南。不确定？给我们发消息。', es: 'Usa la guía de tallas en la vista del producto. ¿No estás seguro? Escríbenos.' },
    'steps.3.title': { no: 'Betal trygt', en: 'Pay securely', de: 'Sicher bezahlen', zh: '安全支付', es: 'Paga seguro' },
    'steps.3.desc': { no: 'Vipps, Klarna eller kort. Pengene holdes tilbake til du har mottatt varen.', en: 'Vipps, Klarna or card. Payment held until you receive the item.', de: 'Vipps, Klarna oder Karte. Zahlung zurückgehalten bis du die Ware erhältst.', zh: 'Vipps、Klarna或银行卡。资金托管直到您收到商品。', es: 'Vipps, Klarna o tarjeta. El pago se retiene hasta que recibas el artículo.' },
    'steps.4.title': { no: 'Levert på døra', en: 'Delivered to your door', de: 'Lieferung zur Tür', zh: '送货上门', es: 'Entrega a domicilio' },
    'steps.4.desc': { no: '1–3 virkedager. Gratis frakt over 999 kr. 14 dagers returrett.', en: '1–3 business days. Free shipping over 999 NOK. 14 days return.', de: '1–3 Werktage. Kostenloser Versand ab 999 NOK. 14 Tage Rückgaberecht.', zh: '1-3个工作日。满999克朗免运费。14天退货。', es: '1–3 días hábiles. Envío gratis desde 999 NOK. 14 días de devolución.' },
    /* Conditions */
    'cond.eyebrow': { no: 'Åpenhet', en: 'Transparency', de: 'Transparenz', zh: '透明度', es: 'Transparencia' },
    'cond.title': { no: 'Hva betyr standbeskrivelsen?', en: 'What does the condition mean?', de: 'Was bedeutet der Zustand?', zh: '成色说明是什么意思？', es: '¿Qué significa el estado?' },
    'cond.top.title': { no: 'Topptrim', en: 'Mint condition', de: 'Neuwertig', zh: '极佳', es: 'Como nuevo' },
    'cond.top.desc': { no: 'Brukt 1–3 ganger eller aldri. Ingen synlige bruksmerker. Ser ut og føles som ny.', en: 'Used 1–3 times or never. No visible wear. Looks and feels like new.', de: '1–3 Mal oder nie getragen. Keine sichtbaren Gebrauchsspuren. Sieht aus und fühlt sich an wie neu.', zh: '使用1-3次或从未使用。无明显使用痕迹。外观和手感如新。', es: 'Usado 1–3 veces o nunca. Sin marcas visibles. Se ve y se siente como nuevo.' },
    'cond.turer.title': { no: 'Turerfaren', en: 'Trail tested', de: 'Weg-erprobt', zh: '经过路途考验', es: 'Probado en ruta' },
    'cond.turer.desc': { no: 'Noen bruksmerker som pilling eller lett misfarging. Full teknisk funksjon.', en: 'Some wear like pilling or slight discoloration. Full technical function.', de: 'Leichte Gebrauchsspuren wie Fusselbildung oder leichte Verfärbung. Volle Funktion.', zh: '有一些使用痕迹如起球或轻微变色。全部功能完好。', es: 'Algún desgaste como bolas o ligera decoloración. Función técnica completa.' },
    'cond.arbeid.title': { no: 'Arbeidshest', en: 'Workhorse', de: 'Arbeitspferd', zh: '耐用品', es: 'Caballo de batalla' },
    'cond.arbeid.desc': { no: 'Tydelig slitasje, men tett og varm. Alle glidelåser og membraner fungerer.', en: 'Clear wear, but still tight and warm. All zippers and membranes work.', de: 'Deutliche Abnutzung, aber dicht und warm. Alle Reißverschlüsse und Membranen funktionieren.', zh: '明显磨损但依然保暖防水。所有拉链和薄膜正常工作。', es: 'Desgaste visible, pero sigue siendo hermético y cálido. Todos los cierres y membranas funcionan.' },
    /* About */
    'about.eyebrow': { no: 'Om M&O', en: 'About M&O', de: 'Über M&O', zh: '关于M&O', es: 'Sobre M&O' },
    'about.title1': { no: 'Vi elsker fjellet.', en: 'We love the mountains.', de: 'Wir lieben die Berge.', zh: '我们热爱山峰。', es: 'Amamos la montaña.' },
    'about.title2': { no: 'Vi hater unødvendige mellomlegg.', en: 'We hate unnecessary markups.', de: 'Wir hassen unnötige Aufschläge.', zh: '我们讨厌不必要的加价。', es: 'Odiamos los recargos innecesarios.' },
    'about.p1': { no: 'M&O er nettbutikken for deg som vil ha ordentlig fjellklær — uten å betale for fancy butikklokaler, kjendisreklame og tre ledd med grossister.', en: 'M&O is the online store for those who want real mountain gear — without paying for fancy storefronts, celebrity ads and layers of middlemen.', de: 'M&O ist der Online-Shop für alle, die echte Bergausrüstung wollen — ohne für schicke Läden, Promi-Werbung und Zwischenhändler zu bezahlen.', zh: 'M&O是为想要真正登山装备的人而设的网店——无需为豪华店面、明星广告和多层中间商付费。', es: 'M&O es la tienda online para quienes quieren equipo de montaña real — sin pagar por tiendas lujosas, anuncios de famosos y capas de intermediarios.' },
    'about.p2': { no: 'Vi selger både splitter nytt og pent brukt. Ikke fordi vi må, men fordi det er fornuftig.', en: 'We sell both brand new and gently used. Not because we have to, but because it makes sense.', de: 'Wir verkaufen sowohl nagelneue als auch gepflegt gebrauchte Ware. Nicht weil wir müssen, sondern weil es sinnvoll ist.', zh: '我们同时销售全新和轻度二手商品。不是不得已，而是因为这更合理。', es: 'Vendemos tanto nuevo como usado en buen estado. No porque tengamos que hacerlo, sino porque tiene sentido.' },
    'about.p3': { no: 'Vi sjekker, vasker og beskriver alt nøye, så du alltid vet nøyaktig hva du får.', en: 'We inspect, wash and describe everything carefully, so you always know exactly what you get.', de: 'Wir prüfen, waschen und beschreiben alles sorgfältig, damit du immer genau weißt, was du bekommst.', zh: '我们仔细检查、清洗并描述每件商品，让您始终清楚自己得到什么。', es: 'Inspeccionamos, lavamos y describimos todo cuidadosamente, para que siempre sepas exactamente lo que obtienes.' },
    'about.btn1': { no: 'Les mer om oss', en: 'Read more about us', de: 'Mehr über uns', zh: '了解更多', es: 'Leer más sobre nosotros' },
    'about.btn2': { no: 'Selg klær til oss', en: 'Sell clothes to us', de: 'Kleidung an uns verkaufen', zh: '向我们出售衣物', es: 'Véndenos ropa' },
    'about.sig': { no: '— Fra fjellelskere, til fjellelskere.', en: '— From mountain lovers, to mountain lovers.', de: '— Von Bergliebhabern für Bergliebhaber.', zh: '——来自山友，献给山友。', es: '— De amantes de la montaña, para amantes de la montaña.' },
    'about.customers': { no: 'Fornøyde kunder i år', en: 'Happy customers this year', de: 'Zufriedene Kunden dieses Jahr', zh: '年度满意客户', es: 'Clientes satisfechos este año' },
    /* Reviews */
    'review.eyebrow': { no: 'Kundene sier', en: 'Customers say', de: 'Kunden sagen', zh: '客户评价', es: 'Los clientes dicen' },
    'review.title': { no: 'Anmeldelser', en: 'Reviews', de: 'Bewertungen', zh: '评价', es: 'Reseñas' },
    'review.write': { no: 'Skriv en anmeldelse', en: 'Write a review', de: 'Bewertung schreiben', zh: '写评价', es: 'Escribir reseña' },
    'review.based': { no: 'Basert på', en: 'Based on', de: 'Basiert auf', zh: '基于', es: 'Basado en' },
    'review.reviews': { no: 'anmeldelser', en: 'reviews', de: 'Bewertungen', zh: '条评价', es: 'reseñas' },
    'review.new': { no: 'ny', en: 'new', de: 'neu', zh: '新', es: 'nuevo' },
    /* Newsletter */
    'newsletter.eyebrow': { no: 'Nyhetsbrev', en: 'Newsletter', de: 'Newsletter', zh: '通讯', es: 'Boletín' },
    'newsletter.title': { no: 'Få varsel om nye varer', en: 'Get notified about new items', de: 'Benachrichtigungen über neue Artikel', zh: '获取新品通知', es: 'Recibe notificaciones de nuevos artículos' },
    'newsletter.sub': { no: 'Populære brukte varer forsvinner fort. Vær alltid først ute.', en: 'Popular used items sell fast. Always be first.', de: 'Beliebte gebrauchte Artikel sind schnell weg. Sei immer zuerst da.', zh: '热门二手商品很快售罄。抢先一步。', es: 'Los artículos usados populares se venden rápido. Sé siempre el primero.' },
    'newsletter.placeholder': { no: 'din@epost.no', en: 'your@email.com', de: 'deine@email.de', zh: '你的@邮箱.com', es: 'tu@email.com' },
    'newsletter.btn': { no: 'Meld meg på', en: 'Subscribe', de: 'Anmelden', zh: '订阅', es: 'Suscribirse' },
    /* Footer */
    'footer.tagline': { no: 'Fjellklær uten kompromiss. Nye og brukte klær fra de beste merkene — til priser som gir mening.', en: 'Mountain gear without compromise. New and used from the best brands — at prices that make sense.', de: 'Bergausrüstung ohne Kompromisse. Neu und gebraucht von den besten Marken — zu Preisen, die Sinn ergeben.', zh: '登山装备不妥协。来自最佳品牌的新品和二手——价格合理。', es: 'Equipo de montaña sin concesiones. Nuevo y usado de las mejores marcas — a precios que tienen sentido.' },
    'footer.shop': { no: 'Butikk', en: 'Shop', de: 'Shop', zh: '商店', es: 'Tienda' },
    'footer.new': { no: 'Nytt sortiment', en: 'New arrivals', de: 'Neuheiten', zh: '新品', es: 'Novedades' },
    'footer.used': { no: 'Pent brukt', en: 'Gently used', de: 'Gepflegt gebraucht', zh: '轻度二手', es: 'Usado cuidado' },
    'footer.sale': { no: 'Kampanjer', en: 'Sales', de: 'Angebote', zh: '促销', es: 'Ofertas' },
    'footer.service': { no: 'Kundeservice', en: 'Customer service', de: 'Kundenservice', zh: '客户服务', es: 'Servicio al cliente' },
    'footer.contact': { no: 'Kontakt oss', en: 'Contact us', de: 'Kontaktiere uns', zh: '联系我们', es: 'Contáctanos' },
    'footer.shipping': { no: 'Frakt & levering', en: 'Shipping & delivery', de: 'Versand & Lieferung', zh: '运输与配送', es: 'Envío y entrega' },
    'footer.returns': { no: 'Retur & bytte', en: 'Returns & exchanges', de: 'Rückgabe & Umtausch', zh: '退换货', es: 'Devoluciones y cambios' },
    'footer.sell': { no: 'Selg til oss', en: 'Sell to us', de: 'An uns verkaufen', zh: '卖给我们', es: 'Véndenos' },
    'footer.about': { no: 'Om M&O', en: 'About M&O', de: 'Über M&O', zh: '关于M&O', es: 'Sobre M&O' },
    'footer.sustainability': { no: 'Bærekraft', en: 'Sustainability', de: 'Nachhaltigkeit', zh: '可持续性', es: 'Sostenibilidad' },
    'footer.privacy': { no: 'Personvern', en: 'Privacy', de: 'Datenschutz', zh: '隐私', es: 'Privacidad' },
    'footer.terms': { no: 'Vilkår', en: 'Terms', de: 'AGB', zh: '条款', es: 'Términos' },
    'footer.copyright': { no: '© 2025 M&O — Mountain & Outdoor. Alle rettigheter forbeholdt.', en: '© 2025 M&O — Mountain & Outdoor. All rights reserved.', de: '© 2025 M&O — Mountain & Outdoor. Alle Rechte vorbehalten.', zh: '© 2025 M&O — Mountain & Outdoor. 保留所有权利。', es: '© 2025 M&O — Mountain & Outdoor. Todos los derechos reservados.' },
    'footer.org': { no: 'Org.nr: 123 456 789 MVA', en: 'Org.no: 123 456 789 VAT', de: 'USt-ID: 123 456 789', zh: '注册号：123 456 789', es: 'NIF: 123 456 789' },
    /* Cart */
    'cart.title': { no: 'Handlekurv', en: 'Shopping cart', de: 'Warenkorb', zh: '购物车', es: 'Carrito de compras' },
    'cart.empty': { no: 'Handlekurven er tom', en: 'Your cart is empty', de: 'Dein Warenkorb ist leer', zh: '购物车是空的', es: 'Tu carrito está vacío' },
    'cart.empty2': { no: 'Finn noe du vil ha!', en: 'Find something you like!', de: 'Finde etwas, das dir gefällt!', zh: '找点你喜欢的！', es: '¡Encuentra algo que te guste!' },
    'cart.products': { no: 'Se produkter', en: 'View products', de: 'Produkte ansehen', zh: '查看产品', es: 'Ver productos' },
    'cart.total': { no: 'Total', en: 'Total', de: 'Gesamtsumme', zh: '总计', es: 'Total' },
    'cart.checkout': { no: 'Gå til kasse', en: 'Go to checkout', de: 'Zur Kasse', zh: '去结算', es: 'Ir al pago' },
    'cart.continue': { no: 'Fortsett å handle', en: 'Continue shopping', de: 'Weiter einkaufen', zh: '继续购物', es: 'Seguir comprando' },
    'cart.remove': { no: 'Fjern', en: 'Remove', de: 'Entfernen', zh: '移除', es: 'Eliminar' },
    /* Product */
    'product.new': { no: 'Nytt', en: 'New', de: 'Neu', zh: '新品', es: 'Nuevo' },
    'product.used': { no: 'Brukt', en: 'Used', de: 'Gebraucht', zh: '二手', es: 'Usado' },
    'product.add': { no: 'Legg i handlekurv', en: 'Add to cart', de: 'In den Warenkorb', zh: '加入购物车', es: 'Añadir al carrito' },
    'product.quickadd': { no: '+ Legg i kurv', en: '+ Add to cart', de: '+ In den Warenkorb', zh: '+ 加入购物车', es: '+ Añadir al carrito' },
    'product.fav': { no: 'Legg til favoritter', en: 'Add to favorites', de: 'Zu Favoriten hinzufügen', zh: '加入收藏', es: 'Añadir a favoritos' },
    'product.size': { no: 'Størrelse', en: 'Size', de: 'Größe', zh: '尺码', es: 'Talla' },
    /* Cookie */
    'cookie.text': { no: 'Vi bruker cookies for å gi deg best mulig opplevelse.', en: 'We use cookies to give you the best experience.', de: 'Wir verwenden Cookies, um dir die beste Erfahrung zu bieten.', zh: '我们使用Cookie为您提供最佳体验。', es: 'Usamos cookies para brindarte la mejor experiencia.' },
    'cookie.read': { no: 'Les mer', en: 'Read more', de: 'Mehr lesen', zh: '了解更多', es: 'Leer más' },
    'cookie.accept': { no: 'Godta alle', en: 'Accept all', de: 'Alle akzeptieren', zh: '全部接受', es: 'Aceptar todo' },
    'cookie.essential': { no: 'Kun nødvendige', en: 'Only essential', de: 'Nur notwendige', zh: '仅必要', es: 'Solo esenciales' },
    /* Modal titles */
    'modal.selg': { no: 'Selg klær til oss', en: 'Sell clothes to us', de: 'Kleidung an uns verkaufen', zh: '向我们出售衣物', es: 'Véndenos ropa' },
    'modal.kontakt': { no: 'Kontakt oss', en: 'Contact us', de: 'Kontaktiere uns', zh: '联系我们', es: 'Contáctanos' },
    'modal.frakt': { no: 'Frakt & levering', en: 'Shipping & delivery', de: 'Versand & Lieferung', zh: '运输与配送', es: 'Envío y entrega' },
    'modal.retur': { no: 'Retur & bytte', en: 'Returns & exchanges', de: 'Rückgabe & Umtausch', zh: '退换货', es: 'Devoluciones y cambios' },
    'modal.baerekraft': { no: 'Bærekraft', en: 'Sustainability', de: 'Nachhaltigkeit', zh: '可持续性', es: 'Sostenibilidad' },
    'modal.personvern': { no: 'Personvern', en: 'Privacy', de: 'Datenschutz', zh: '隐私', es: 'Privacidad' },
    'modal.vilkar': { no: 'Vilkår', en: 'Terms & conditions', de: 'AGB', zh: '条款与条件', es: 'Términos y condiciones' },
    'modal.menu': { no: 'Meny', en: 'Menu', de: 'Menü', zh: '菜单', es: 'Menú' },
    'modal.om': { no: 'Om M&O', en: 'About M&O', de: 'Über M&O', zh: '关于M&O', es: 'Sobre M&O' },
    'modal.close': { no: 'Lukk', en: 'Close', de: 'Schließen', zh: '关闭', es: 'Cerrar' },
    'modal.submit': { no: 'Send inn', en: 'Submit', de: 'Absenden', zh: '提交', es: 'Enviar' },
    'modal.send': { no: 'Send melding', en: 'Send message', de: 'Nachricht senden', zh: '发送消息', es: 'Enviar mensaje' },
    /* Toast messages */
    'toast.added': { no: 'lagt i kurven', en: 'added to cart', de: 'zum Warenkorb hinzugefügt', zh: '已加入购物车', es: 'añadido al carrito' },
    'toast.removed': { no: 'Fjernet fra favoritter', en: 'Removed from favorites', de: 'Aus Favoriten entfernt', zh: '已移除收藏', es: 'Eliminado de favoritos' },
    'toast.addedfav': { no: 'lagt til favoritter', en: 'added to favorites', de: 'zu Favoriten hinzugefügt', zh: '已加入收藏', es: 'añadido a favoritos' },
    'toast.subscribed': { no: 'Påmeldt! Velkommen til M&O-familien', en: 'Subscribed! Welcome to the M&O family', de: 'Angemeldet! Willkommen in der M&O-Familie', zh: '订阅成功！欢迎加入M&O大家庭', es: '¡Suscrito! Bienvenido a la familia M&O' },
    'toast.invalidemail': { no: 'Skriv inn en gyldig e-postadresse', en: 'Please enter a valid email address', de: 'Bitte gib eine gültige E-Mail-Adresse ein', zh: '请输入有效的电子邮件地址', es: 'Por favor ingresa un correo electrónico válido' },
    'toast.reviewthanks': { no: 'Takk for din anmeldelse!', en: 'Thanks for your review!', de: 'Danke für deine Bewertung!', zh: '感谢您的评价！', es: '¡Gracias por tu reseña!' },
    'toast.reviewname': { no: 'Skriv inn navnet ditt', en: 'Please enter your name', de: 'Bitte gib deinen Namen ein', zh: '请输入您的名字', es: 'Por favor ingresa tu nombre' },
    'toast.reviewrating': { no: 'Velg en vurdering', en: 'Please select a rating', de: 'Bitte wähle eine Bewertung', zh: '请选择评分', es: 'Por favor selecciona una puntuación' },
    'toast.reviewtext': { no: 'Skriv en anmeldelse', en: 'Please write a review', de: 'Bitte schreibe eine Bewertung', zh: '请写一条评价', es: 'Por favor escribe una reseña' },
    'toast.sizefirst': { no: 'Velg størrelse først', en: 'Select size first', de: 'Wähle zuerst eine Größe', zh: '请先选择尺码', es: 'Selecciona talla primero' },
    'toast.sent': { no: 'Melding sendt! Takk for at du tok kontakt', en: 'Message sent! Thanks for reaching out', de: 'Nachricht gesendet! Danke für deine Kontaktaufnahme', zh: '消息已发送！感谢您的联系', es: '¡Mensaje enviado! Gracias por contactarnos' },
    'toast.selg': { no: 'Forespørsel sendt! Vi svarer innen 24 timer', en: 'Request sent! We respond within 24 hours', de: 'Anfrage gesendet! Wir antworten innerhalb von 24 Stunden', zh: '请求已发送！我们将在24小时内回复', es: '¡Solicitud enviada! Respondemos dentro de 24 horas' },
    'toast.theme': { no: 'Farge tema:', en: 'Color theme:', de: 'Farbthema:', zh: '颜色主题：', es: 'Tema de color:' },
    /* Back to top */
    'backtop': { no: 'Til toppen', en: 'Back to top', de: 'Nach oben', zh: '回到顶部', es: 'Volver arriba' },
    /* Search */
    'search.noresults': { no: 'Ingen produkter funnet', en: 'No products found', de: 'Keine Produkte gefunden', zh: '未找到产品', es: 'No se encontraron productos' },
    /* Categories */
    'cat.alle': { no: 'Alle', en: 'All', de: 'Alle', zh: '全部', es: 'Todos' },
    'cat.jakker': { no: 'Jakker & Yttertøy', en: 'Jackets & Outerwear', de: 'Jacken & Oberbekleidung', zh: '夹克与外衣', es: 'Chaquetas y Abrigos' },
    'cat.mellomlag': { no: 'Mellomlag', en: 'Mid Layers', de: 'Mittelschichten', zh: '中间层', es: 'Capas intermedias' },
    'cat.bukser': { no: 'Bukser', en: 'Pants', de: 'Hosen', zh: '裤子', es: 'Pantalones' },
    'cat.sko': { no: 'Sko & Støvler', en: 'Shoes & Boots', de: 'Schuhe & Stiefel', zh: '鞋靴', es: 'Zapatos y Botas' },
    'cat.tilbehor': { no: 'Tilbehør', en: 'Accessories', de: 'Zubehör', zh: '配件', es: 'Accesorios' },
    'cat.tilbud': { no: '🔥 Tilbud', en: '🔥 Sale', de: '🔥 Angebote', zh: '🔥 促销', es: '🔥 Ofertas' },
    /* Wishlist */
    'wish.title': { no: 'Favoritter', en: 'Favorites', de: 'Favoriten', zh: '收藏', es: 'Favoritos' },
    'wish.empty': { no: 'Ingen favoritter ennå', en: 'No favorites yet', de: 'Noch keine Favoriten', zh: '暂无收藏', es: 'Aún no hay favoritos' },
    'wish.emptysub': { no: 'Trykk hjertet på produktene du liker', en: 'Tap the heart on products you like', de: 'Tippe auf das Herz bei Produkten, die dir gefallen', zh: '点击您喜欢的产品上的心形', es: 'Toca el corazón en los productos que te gusten' },
    /* Filters */
    'filter.type': { no: 'Type: Alle', en: 'Type: All', de: 'Typ: Alle', zh: '类型: 全部', es: 'Tipo: Todos' },
    'filter.size': { no: 'Størrelse: Alle', en: 'Size: All', de: 'Größe: Alle', zh: '尺寸: 全部', es: 'Talla: Todas' },
    'filter.jakker': { no: 'Jakker', en: 'Jackets', de: 'Jacken', zh: '夹克', es: 'Chaquetas' },
    'filter.mellomlag': { no: 'Mellomlag', en: 'Mid Layers', de: 'Mittelschichten', zh: '中间层', es: 'Capas medias' },
    'filter.bukser': { no: 'Bukser', en: 'Pants', de: 'Hosen', zh: '裤子', es: 'Pantalones' },
    'filter.sko': { no: 'Sko', en: 'Shoes', de: 'Schuhe', zh: '鞋子', es: 'Zapatos' },
    'filter.tilbehor': { no: 'Tilbehør', en: 'Accessories', de: 'Zubehör', zh: '配件', es: 'Accesorios' },
    'filter.topptrim': { no: 'Topptrim', en: 'Mint', de: 'Neuwertig', zh: '极佳', es: 'Excelente' },
    'filter.turerfaren': { no: 'Turerfaren', en: 'Trail tested', de: 'Weg-erprobt', zh: '路途考验', es: 'Probado' },
    'filter.arbeidshest': { no: 'Arbeidshest', en: 'Workhorse', de: 'Arbeitspferd', zh: '耐用', es: 'Resistente' },
  };

  MO.t = function (key) {
    var lang = MO.lang;
    var entry = MO.translations[key];
    if (!entry) return key;
    return entry[lang] || entry['no'] || key;
  };

  MO.toggleLang = function () {
    var idx = MO.langCodes.indexOf(MO.lang);
    idx = (idx + 1) % MO.langCodes.length;
    MO.lang = MO.langCodes[idx];
    localStorage.setItem('mo_lang', MO.lang);
    var htmllang = MO.lang === 'no' ? 'nb' : MO.lang;
    document.documentElement.lang = htmllang;
    var btn = document.getElementById('lang-btn');
    var code = MO.lang === 'no' ? 'NO' : MO.lang === 'en' ? 'EN' : MO.lang === 'de' ? 'DE' : MO.lang === 'zh' ? '中文' : 'ES';
    if (btn) btn.textContent = code;
    MO.applyLang();
    MO.toast(MO.langNames[MO.lang] || MO.lang);
  };

  MO.applyLang = function () {
    /* Update data-i18n elements */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var translated = MO.t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', translated);
      } else {
        el.textContent = translated;
      }
    });
    /* Update nav and footer links if already injected */
    var linkMap = {
      'nav.nytt': 'nav-nytt', 'nav.brukt': 'nav-brukt', 'nav.om': 'nav-om'
    };
    /* Re-render dynamic content */
    if (typeof MO.renderReviews === 'function') MO.renderReviews();
    if (typeof MO.renderCartDrawer === 'function') MO.renderCartDrawer();
    /* Update product counts if visible */
    var countEls = document.querySelectorAll('.result-count');
    if (countEls.length) {
      countEls.forEach(function (el) {
        var num = el.textContent.match(/\d+/);
        if (num) {
          var prefix = MO.t('section.showing');
          var suffix = MO.t('section.products');
          el.innerHTML = prefix + ' <strong>' + num[0] + '</strong> ' + suffix;
        }
      });
    }
    /* Update search placeholder */
    var searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.placeholder = MO.t('search.placeholder');
    /* Update cookie bar */
    var cookieText = document.querySelector('.cookie-bar__text');
    if (cookieText) {
      var parts = cookieText.innerHTML.split('<a');
      if (parts.length > 1) {
        cookieText.innerHTML = MO.t('cookie.text') + ' <a' + parts[1];
      }
    }
    /* Update mobile menu */
    var mobileBtns = document.querySelectorAll('.mobile-nav__btn');
    if (mobileBtns.length) {
      var mobileLabels = { search: 'nav.search', wish: 'nav.favorites', cart: 'nav.cart', menu: 'nav.menu' };
      mobileBtns.forEach(function (btn) {
        var mnav = btn.getAttribute('data-mnav');
        var lbl = btn.querySelector('.mobile-nav__lbl');
        if (lbl && mobileLabels[mnav]) {
          lbl.textContent = MO.t(mobileLabels[mnav]);
        }
      });
    }
    /* Update toast messages to be dynamic */
    /* Re-render product grids if shown */
    if (typeof MO.filterNytt === 'function') MO.filterNytt();
    if (typeof MO.filterBrukt === 'function') MO.filterBrukt();
  };

  MO.initLang = function () {
    var htmllang = MO.lang === 'no' ? 'nb' : MO.lang;
    document.documentElement.lang = htmllang;
    MO.applyLang();
    var btn = document.getElementById('lang-btn');
    var code = MO.lang === 'no' ? 'NO' : MO.lang === 'en' ? 'EN' : MO.lang === 'de' ? 'DE' : MO.lang === 'zh' ? '中文' : 'ES';
    if (btn) btn.textContent = code;
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
  MO.themes = ['default', 'warm', 'cool', 'earth', 'sunset', 'dark'];
  MO.themeIcons = ['🎨', '🔥', '❄️', '🌿', '🌅', '🌙'];
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

  MO.showSizeGuide = function () {
    var html = '<div class="size-guide"><table class="size-guide__table"><thead><tr><th>Størrelse</th><th>Bryst (cm)</th><th>Midje (cm)</th><th>Hofte (cm)</th><th>Innside ben (cm)</th></tr></thead><tbody>' +
      '<tr><td>XS</td><td>84–89</td><td>70–75</td><td>86–91</td><td>76–78</td></tr>' +
      '<tr><td>S</td><td>90–95</td><td>76–81</td><td>92–97</td><td>78–80</td></tr>' +
      '<tr><td>M</td><td>96–101</td><td>82–87</td><td>98–103</td><td>80–82</td></tr>' +
      '<tr><td>L</td><td>102–107</td><td>88–93</td><td>104–109</td><td>82–84</td></tr>' +
      '<tr><td>XL</td><td>108–113</td><td>94–99</td><td>110–115</td><td>84–86</td></tr>' +
      '<tr><td>XXL</td><td>114–119</td><td>100–105</td><td>116–121</td><td>86–88</td></tr>' +
      '</tbody></table>' +
      '<p class="size-guide__note">Skostørrelser følger EU-standard. Mål deg selv eller et plagg du har fra før.</p></div>';
    MO.openModal('Størrelsesguide', html);
  };

  /* ── MOUNTAIN PARALLAX ON SCROLL ────────────────── */
  MO.initMountainParallax = function () {
    var layers = document.querySelectorAll('.mountains__layer');
    if (!layers.length) return;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrolled = window.scrollY;
          var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          var progress = Math.min(scrolled / maxScroll, 1);
          layers.forEach(function (layer, i) {
            var speed = [0.3, 0.5, 0.7][i] || 0.3;
            var y = progress * 40 * speed;
            layer.style.transform = 'translateY(' + y + 'px)';
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
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
    /* Pause particles when hero is out of view */
    var obs = new IntersectionObserver(function (entries) {
      container.style.animationPlayState = entries[0].isIntersecting ? 'running' : 'paused';
      container.querySelectorAll('div').forEach(function (el) {
        el.style.animationPlayState = entries[0].isIntersecting ? 'running' : 'paused';
      });
    }, { threshold: 0 });
    obs.observe(hero);
  };

  /* ──────────────────────────────────────────────
     COUNT-UP ANIMATION
     ────────────────────────────────────────────── */
  MO.initCountUp = function () {
    var nums = document.querySelectorAll('.stat-cell__num');
    if (!nums.length) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var text = el.textContent.trim();
        var suffix = text.replace(/[\d\s\-]/g, '');
        var target = parseFloat(text.replace(/[^0-9.]/g, '')) || 0;
        if (!target) return;
        var duration = 1800;
        var start = performance.now();
        function tick(now) {
          var p = Math.min((now - start) / duration, 1);
          var ease = 1 - Math.pow(1 - p, 3);
          var val = Math.round(target * ease);
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = text;
        }
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, { threshold: .4 });
    nums.forEach(function (n) { obs.observe(n); });
  };

  /* ──────────────────────────────────────────────
     MOUSE TRAIL SPARKLES
     ────────────────────────────────────────────── */
  MO.initMouseTrail = function () {
    if ('ontouchstart' in window) return;
    var last = 0;
    document.addEventListener('mousemove', function (e) {
      var now = Date.now();
      if (now - last < 45) return;
      last = now;
      var el = document.createElement('i');
      el.className = 'trail-sparkle';
      el.style.left = (e.clientX - 2.5) + 'px';
      el.style.top = (e.clientY - 2.5) + 'px';
      document.body.appendChild(el);
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 550);
    });
  };

  MO.compareList = JSON.parse(localStorage.getItem('mo_compare') || '[]');
  MO.toggleCompare = function (id) {
    var idx = MO.compareList.indexOf(id);
    if (idx > -1) {
      MO.compareList.splice(idx, 1);
    } else {
      if (MO.compareList.length >= 4) { MO.toast('Maks 4 produkter til sammenligning'); return; }
      MO.compareList.push(id);
    }
    localStorage.setItem('mo_compare', JSON.stringify(MO.compareList));
    MO.updateCompareUI();
  };
  MO.inCompare = function (id) { return MO.compareList.indexOf(id) > -1; };
  MO.updateCompareUI = function () {
    var bar = document.getElementById('compare-bar');
    if (!bar) {
      if (!MO.compareList.length) return;
      bar = document.createElement('div');
      bar.id = 'compare-bar';
      bar.className = 'compare-bar';
      document.body.appendChild(bar);
    }
    if (!MO.compareList.length) { if (bar.parentNode) bar.remove(); return; }
    bar.innerHTML = '';
    var inner = document.createElement('div');
    inner.className = 'compare-bar__inner';
    MO.compareList.forEach(function (id) {
      var p = MO.findProduct(id);
      if (!p) return;
      var chip = document.createElement('span');
      chip.className = 'compare-bar__chip';
      chip.innerHTML = p.brand.split(' ').slice(0, 1).join('') + ' ' + p.name.split(' ').slice(0, 2).join(' ') + '<button onclick="MO.toggleCompare(\'' + id + '\')">&times;</button>';
      inner.appendChild(chip);
    });
    if (MO.compareList.length >= 2) {
      var btn = document.createElement('button');
      btn.className = 'btn btn-primary btn-sm';
      btn.textContent = 'Sammenlign';
      btn.onclick = MO.showCompare;
      inner.appendChild(btn);
    }
    var clearBtn = document.createElement('button');
    clearBtn.className = 'btn btn-ghost btn-sm';
    clearBtn.textContent = 'Tøm';
    clearBtn.onclick = function () { MO.compareList = []; localStorage.setItem('mo_compare', JSON.stringify(MO.compareList)); MO.updateCompareUI(); };
    inner.appendChild(clearBtn);
    bar.appendChild(inner);
  };
  MO.showCompare = function () {
    if (MO.compareList.length < 2) { MO.toast('Velg minst 2 produkter'); return; }
    var products = MO.compareList.map(function (id) { return MO.findProduct(id); }).filter(Boolean);
    var rows = [];
    var fields = [
      { label: 'Merke', fn: function (p) { return p.brand; } },
      { label: 'Navn', fn: function (p) { return p.name; } },
      { label: 'Kategori', fn: function (p) { var m = { jakker: 'Jakke', mellomlag: 'Mellomlag', bukser: 'Bukse', sko: 'Sko', tilbehor: 'Tilbehør' }; return m[p.cat] || p.cat; } },
      { label: 'Pris', fn: function (p) { return p.price.toLocaleString('no-NO') + ' kr'; } },
      { label: 'Rabatt', fn: function (p) { return '-' + Math.round((1 - p.price / p.oldPrice) * 100) + '%'; } },
      { label: 'Størrelser', fn: function (p) { return p.sizes.join(', '); } },
    ];
    fields.forEach(function (f) {
      rows.push('<tr><td class="compare__label">' + f.label + '</td>' + products.map(function (p) {
        return '<td class="compare__cell">' + f.fn(p) + '</td>';
      }).join('') + '</tr>');
    });
    var html = '<div class="compare-table-wrap"><table class="compare-table"><tbody>' + rows.join('') + '</tbody></table></div>';
    MO.openModal('Sammenligning (' + MO.compareList.length + ' produkter)', html);
  };
  MO.initCompare = function () { MO.updateCompareUI(); };

  window.MO = MO;

})();
