/* ── SHARED LAYOUT — nav, footer, overlays ── */
MO.injectLayout = function(activePage) {

  var navHTML = `
<div id="searchbar" class="searchbar">
  <div class="searchbar__inner">
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" style="color:var(--text-4);flex-shrink:0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <input id="search-input" class="searchbar__input" type="search" placeholder="Søk etter merke, type eller størrelse…" autocomplete="off"/>
    <span class="searchbar__cancel" onclick="MO.closeSearch()">Avbryt</span>
  </div>
</div>

<nav class="nav" id="main-nav">
  <div class="nav__inner">
    <a href="index.html" class="nav__logo">M&amp;O</a>
    <div class="nav__links">
      <a href="index.html" class="nav__link ${activePage==='home'?'active':''}">
        <span class="badge badge-new">Nytt</span>
      </a>
      <a href="index.html#brukt" class="nav__link ${activePage==='brukt'?'active':''}">
        <span class="badge badge-used">Brukt</span>
      </a>
      <a href="om-oss.html" class="nav__link ${activePage==='om'?'active':''}">Om oss</a>
    </div>
    <div class="nav__actions">
      <button class="nav__icon" onclick="MO.openSearch()" aria-label="Søk">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </button>
      <button class="nav__icon" onclick="MO.openWishlistPage()" aria-label="Favoritter">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
      <button class="nav__icon" onclick="MO.openCart()" aria-label="Handlekurv">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <span class="cart-badge" id="cart-badge-nav"></span>
      </button>
      <button class="nav__icon nav__mobile-btn" onclick="MO.openMobileMenu()" aria-label="Meny">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>
  </div>
</nav>

<div class="catbar">
  <div class="catbar__inner" id="catbar">
    <button class="catbar__btn active" onclick="MO.catFilter(this,'alle')">Alle</button>
    <button class="catbar__btn" onclick="MO.catFilter(this,'jakker')">Jakker &amp; Yttertøy</button>
    <button class="catbar__btn" onclick="MO.catFilter(this,'mellomlag')">Mellomlag</button>
    <button class="catbar__btn" onclick="MO.catFilter(this,'bukser')">Bukser</button>
    <button class="catbar__btn" onclick="MO.catFilter(this,'sko')">Sko &amp; Støvler</button>
    <button class="catbar__btn" onclick="MO.catFilter(this,'tilbehor')">Tilbehør</button>
    <button class="catbar__btn" onclick="MO.catFilter(this,'salg')">🔥 Tilbud</button>
  </div>
</div>`;

  var footerHTML = `
<footer>
  <div class="footer__top">
    <div>
      <div class="footer__logo">M&amp;O</div>
      <p class="footer__tagline">Fjellklær uten kompromiss. Nye og brukte klær fra de beste merkene — til priser som gir mening.</p>
    </div>
    <div>
      <p class="footer__col-title">Butikk</p>
      <div class="footer__links">
        <a href="index.html" class="footer__link">Nytt sortiment</a>
        <a href="index.html#brukt" class="footer__link">Pent brukt</a>
        <button class="footer__link" onclick="MO.catFilter(null,'salg')">Kampanjer</button>
      </div>
    </div>
    <div>
      <p class="footer__col-title">Kundeservice</p>
      <div class="footer__links">
        <button class="footer__link" onclick="MO.showModal('kontakt')">Kontakt oss</button>
        <button class="footer__link" onclick="MO.showModal('frakt')">Frakt &amp; levering</button>
        <button class="footer__link" onclick="MO.showModal('retur')">Retur &amp; bytte</button>
        <button class="footer__link" onclick="MO.showModal('selg')">Selg til oss</button>
      </div>
    </div>
    <div>
      <p class="footer__col-title">Om M&amp;O</p>
      <div class="footer__links">
        <a href="om-oss.html" class="footer__link">Om oss</a>
        <button class="footer__link" onclick="MO.showModal('baerekraft')">Bærekraft</button>
        <button class="footer__link" onclick="MO.showModal('personvern')">Personvern</button>
        <button class="footer__link" onclick="MO.showModal('vilkar')">Vilkår</button>
      </div>
    </div>
  </div>
  <div class="footer__bottom">
    <p class="footer__copy">&copy; 2025 M&amp;O — Mountain &amp; Outdoor. Alle rettigheter forbeholdt.</p>
    <p class="footer__copy">Org.nr: 123 456 789 MVA</p>
  </div>
</footer>`;

  var overlaysHTML = `
<!-- Cart drawer -->
<div class="drawer-overlay" id="cart-overlay" onclick="MO.closeCart()"></div>
<div class="drawer" id="cart-drawer">
  <div class="drawer__head">
    <span class="drawer__title">Handlekurv</span>
    <button class="drawer__close" onclick="MO.closeCart()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
  </div>
  <div class="drawer__body" id="cart-drawer-body"></div>
  <div class="drawer__foot" id="cart-drawer-foot" style="display:none">
    <div class="drawer__total-row"><span class="drawer__total-lbl">Total</span><span class="drawer__total-sum" id="cart-drawer-total">0 kr</span></div>
    <a href="cart.html" class="btn btn-primary btn-full btn-lg" onclick="MO.closeCart()">Gå til kasse</a>
    <button class="btn btn-ghost btn-full" style="margin-top:8px" onclick="MO.closeCart()">Fortsett å handle</button>
  </div>
</div>

<!-- Product modal -->
<div class="modal-overlay" id="pdm-overlay" onclick="if(event.target===this)MO.closePdm()">
  <div class="modal modal--wide">
    <div class="modal__head">
      <span class="modal__title" id="pdm-title">Produkt</span>
      <button class="modal__close" onclick="MO.closePdm()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
    </div>
    <div class="modal__body" id="pdm-body"></div>
  </div>
</div>

<!-- Generic modal -->
<div class="modal-overlay" id="modal-overlay" onclick="if(event.target===this)MO.closeModal()">
  <div class="modal">
    <div class="modal__head">
      <span class="modal__title" id="gm-title"></span>
      <button class="modal__close" onclick="MO.closeModal()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
    </div>
    <div class="modal__body" id="gm-body"></div>
  </div>
</div>

<!-- Toast -->
<div class="toast" id="toast">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
  <span id="toast-msg"></span>
</div>`;

  // Inject before body content
  document.body.insertAdjacentHTML('afterbegin', navHTML + overlaysHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);
  MO.initNav();
};

MO.catFilter = function(btn, cat) {
  document.querySelectorAll('.catbar__btn').forEach(function(b){ b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  var nyttGrid = document.getElementById('grid-nytt');
  var bruktGrid = document.getElementById('grid-brukt');
  var fn = function(arr){
    if (cat === 'alle') return arr;
    if (cat === 'salg') return arr.filter(function(p){ return Math.round((1-p.price/p.oldPrice)*100) >= 50; });
    return arr.filter(function(p){ return p.cat === cat; });
  };
  if (nyttGrid) nyttGrid.innerHTML = fn(MO.products.filter(function(p){return p.type==='nytt';})).map(MO.cardHTML).join('');
  if (bruktGrid) bruktGrid.innerHTML = fn(MO.products.filter(function(p){return p.type==='brukt';})).map(MO.cardHTML).join('');
};

MO.openWishlistPage = function() {
  if (MO.wishlist.length === 0) {
    MO.openModal('Favoritter', '<div style="text-align:center;padding:40px 0;color:var(--text-4)"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="margin:0 auto 16px;display:block"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg><p style="font-weight:500;margin-bottom:6px;color:var(--text)">Ingen favoritter ennå</p><p style="font-size:13px">Trykk hjertet på produktene du liker</p></div>');
    return;
  }
  var items = MO.wishlist.map(function(id){
    var p = MO.findProduct(id);
    if (!p) return '';
    return '<div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--gray-100)"><div style="width:54px;height:60px;background:var(--gray-100);border-radius:9px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--gray-300)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg></div><div style="flex:1"><p style="font-size:11px;text-transform:uppercase;letter-spacing:.09em;color:var(--text-4)">' + p.brand + '</p><p style="font-size:14px;font-weight:500;margin:2px 0">' + p.name + '</p><p style="font-family:var(--serif);font-size:17px;color:var(--g3)">' + p.price.toLocaleString('no-NO') + ' kr</p></div><button class="btn btn-primary btn-sm" onclick="MO.closeModal();MO.openProduct(\'' + id + '\')">Se produkt</button></div>';
  }).join('');
  MO.openModal('Favoritter (' + MO.wishlist.length + ')', items);
};