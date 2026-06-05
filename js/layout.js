/* ── SHARED LAYOUT — nav, footer, overlays ── */

MO.catbarHTML = function() {
  var cats = [
    {key:'alle',      i18n:'cat.all'},
    {key:'jakker',    i18n:'cat.jackets'},
    {key:'mellomlag', i18n:'cat.midlayer'},
    {key:'bukser',    i18n:'cat.pants'},
    {key:'sko',       i18n:'cat.shoes'},
    {key:'tilbehor',  i18n:'cat.accessories'},
    {key:'salg',      i18n:'cat.sale'},
  ];
  return cats.map(function(c, i) {
    return '<button class="catbar__btn' + (i === 0 ? ' active' : '') +
      '" onclick="MO.catFilter(this,\'' + c.key + '\')" data-i18n="' + c.i18n + '">' +
      MO.t(c.i18n) + '</button>';
  }).join('');
};

MO.injectLayout = function(activePage) {

  var navHTML = `
<div id="searchbar" class="searchbar">
  <div class="searchbar__inner">
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" style="color:var(--text-4);flex-shrink:0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <input id="search-input" class="searchbar__input" type="search" placeholder="${MO.t('search.placeholder')}" autocomplete="off"/>
    <span class="searchbar__cancel" onclick="MO.closeSearch()" data-i18n="search.cancel">${MO.t('search.cancel')}</span>
  </div>
  <div id="search-drop" class="search-drop"></div>
</div>

<nav class="nav" id="main-nav">
  <div class="nav__inner">
    <a href="index.html" class="nav__logo">M&amp;O</a>
    <div class="nav__links">
      <a href="index.html" class="nav__link ${activePage==='home'?'active':''}" data-i18n="nav.new">${MO.t('nav.new')}</a>
      <a href="index.html#brukt" class="nav__link ${activePage==='brukt'?'active':''}" data-i18n="nav.used">${MO.t('nav.used')}</a>
      <a href="om-oss.html" class="nav__link ${activePage==='om'?'active':''}" data-i18n="nav.about">${MO.t('nav.about')}</a>
    </div>
    <div class="nav__actions">
      <button class="nav__icon" onclick="MO.openSearch()" aria-label="Søk">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </button>
      <button class="nav__icon" onclick="MO.openWishlistPage()" aria-label="Favoritter">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
      <a href="login.html" class="nav__icon" id="nav-user-btn" aria-label="Logg inn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </a>
      <button class="nav__icon" onclick="MO.openCart()" aria-label="Handlekurv">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <span class="cart-badge" id="cart-badge-nav"></span>
      </button>
      <select id="lang-select" class="lang-select" onchange="MO.setLang(this.value)" aria-label="Velg språk">
        <option value="no" ${MO.lang==='no'?'selected':''}>🇳🇴 NO</option>
        <option value="en" ${MO.lang==='en'?'selected':''}>🇬🇧 EN</option>
        <option value="de" ${MO.lang==='de'?'selected':''}>🇩🇪 DE</option>
        <option value="es" ${MO.lang==='es'?'selected':''}>🇪🇸 ES</option>
        <option value="zh" ${MO.lang==='zh'?'selected':''}>🇨🇳 中文</option>
      </select>
      <button class="nav__icon nav__mobile-btn" onclick="MO.openMobileMenu()" aria-label="Meny">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>
  </div>
</nav>

<div class="catbar">
  <div class="catbar__inner" id="catbar">
    ${MO.catbarHTML()}
  </div>
</div>`;

  var footerHTML = `
<footer>
  <div class="footer__top">
    <div>
      <div class="footer__logo">M&amp;O</div>
      <p class="footer__tagline" data-i18n="footer.tagline">${MO.t('footer.tagline')}</p>
    </div>
    <div>
      <p class="footer__col-title" data-i18n="footer.shop">${MO.t('footer.shop')}</p>
      <div class="footer__links">
        <a href="index.html" class="footer__link" data-i18n="footer.new">${MO.t('footer.new')}</a>
        <a href="index.html#brukt" class="footer__link" data-i18n="footer.used">${MO.t('footer.used')}</a>
        <button class="footer__link" onclick="MO.catFilter(null,'salg')" data-i18n="footer.campaigns">${MO.t('footer.campaigns')}</button>
      </div>
    </div>
    <div>
      <p class="footer__col-title" data-i18n="footer.service">${MO.t('footer.service')}</p>
      <div class="footer__links">
        <a href="faq.html" class="footer__link" data-i18n="footer.faq">${MO.t('footer.faq')}</a>
        <button class="footer__link" onclick="MO.showModal('kontakt')" data-i18n="footer.contact">${MO.t('footer.contact')}</button>
        <button class="footer__link" onclick="MO.showModal('frakt')" data-i18n="footer.shipping">${MO.t('footer.shipping')}</button>
        <button class="footer__link" onclick="MO.showModal('retur')" data-i18n="footer.return">${MO.t('footer.return')}</button>
        <button class="footer__link" onclick="MO.showModal('selg')" data-i18n="footer.sell">${MO.t('footer.sell')}</button>
      </div>
    </div>
    <div>
      <p class="footer__col-title" data-i18n="footer.about-col">${MO.t('footer.about-col')}</p>
      <div class="footer__links">
        <a href="om-oss.html" class="footer__link" data-i18n="footer.about-link">${MO.t('footer.about-link')}</a>
        <button class="footer__link" onclick="MO.showModal('baerekraft')" data-i18n="footer.sustainability">${MO.t('footer.sustainability')}</button>
        <a href="personvern.html" class="footer__link" data-i18n="footer.privacy">${MO.t('footer.privacy')}</a>
        <a href="vilkar.html" class="footer__link" data-i18n="footer.terms">${MO.t('footer.terms')}</a>
        <a href="angrerett.html" class="footer__link">Angrerett</a>
      </div>
    </div>
  </div>
  <div class="footer__bottom">
    <p class="footer__copy" data-i18n="footer.copy">${MO.t('footer.copy')}</p>
    <p class="footer__copy">Org.nr: 123 456 789 MVA</p>
    <div class="footer__payments">
      <span class="pay-badge">VISA</span>
      <span class="pay-badge">MC</span>
      <span class="pay-badge">Vipps</span>
      <span class="pay-badge">Klarna</span>
      <span class="pay-badge">AMEX</span>
    </div>
  </div>
</footer>`;

  var overlaysHTML = `
<!-- Cart drawer -->
<div class="drawer-overlay" id="cart-overlay" onclick="MO.closeCart()"></div>
<div class="drawer" id="cart-drawer">
  <div class="drawer__head">
    <span class="drawer__title" data-i18n="cart.title">${MO.t('cart.title')}</span>
    <button class="drawer__close" onclick="MO.closeCart()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
  </div>
  <div class="drawer__body" id="cart-drawer-body"></div>
  <div class="drawer__foot" id="cart-drawer-foot" style="display:none">
    <div class="drawer__total-row">
      <span class="drawer__total-lbl" data-i18n="cart.total">${MO.t('cart.total')}</span>
      <span class="drawer__total-sum" id="cart-drawer-total">0 kr</span>
    </div>
    <a href="cart.html" class="btn btn-primary btn-full btn-lg" onclick="MO.closeCart()" data-i18n="cart.checkout">${MO.t('cart.checkout')}</a>
    <button class="btn btn-ghost btn-full" style="margin-top:8px" onclick="MO.closeCart()" data-i18n="cart.continue">${MO.t('cart.continue')}</button>
  </div>
</div>

<!-- Product modal -->
<div class="modal-overlay" id="pdm-overlay" onclick="if(event.target===this)MO.closePdm()">
  <div class="modal modal--wide">
    <div class="modal__head">
      <span class="modal__title" id="pdm-title"></span>
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

<!-- Chatbot button -->
<button class="chat-btn" onclick="MO.chat.toggle()" aria-label="Chat med oss">
  <div class="chat-btn__dot"></div>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
</button>

<!-- Chat window -->
<div class="chat-window" id="chat-win">
  <div class="chat-head">
    <div class="chat-head__avatar">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    </div>
    <div>
      <div class="chat-head__name">M&O Assistent</div>
      <div class="chat-head__status">● Online nå</div>
    </div>
    <button class="chat-head__close" onclick="MO.chat.toggle()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
  <div class="chat-messages" id="chat-msgs"></div>
  <div class="chat-foot">
    <textarea class="chat-input" id="chat-input" placeholder="Skriv en melding…" rows="1"
      onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();MO.chat.send();}"
      oninput="this.style.height='';this.style.height=Math.min(this.scrollHeight,80)+'px'"></textarea>
    <button class="chat-send" onclick="MO.chat.send()" aria-label="Send">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
    </button>
  </div>
  <p class="chat-disclaimer">Drevet av Claude AI · M&O kundeservice</p>
</div>

<!-- Back to top -->
<button class="back-top" id="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Opp til toppen">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="18 15 12 9 6 15"/></svg>
</button>

<!-- Mobile bottom navigation -->
<nav class="mobile-nav" aria-label="Navigasjon">
  <button class="mobile-nav__btn" id="mbnav-home" onclick="location.href='index.html'">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    <span class="mobile-nav__lbl">Hjem</span>
  </button>
  <button class="mobile-nav__btn" onclick="MO.openSearch()">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <span class="mobile-nav__lbl">Søk</span>
  </button>
  <button class="mobile-nav__btn" onclick="MO.openCart()" style="position:relative">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
    <span class="cart-badge" id="cart-badge-mobile" style="position:absolute;top:6px;right:calc(50% - 16px)"></span>
    <span class="mobile-nav__lbl">Kurv</span>
  </button>
  <button class="mobile-nav__btn" onclick="MO.openMobileMenu()">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    <span class="mobile-nav__lbl">Meny</span>
  </button>
</nav>

<!-- Cookie banner -->
<div class="cookie-bar" id="cookie-bar">
  <p class="cookie-bar__text">Vi bruker informasjonskapsler for å huske innstillinger og gi deg en bedre opplevelse. <a href="faq.html#personvern">Les mer</a></p>
  <div class="cookie-bar__actions">
    <button class="btn btn-ghost btn-sm" onclick="MO.declineCookies()" style="color:rgba(255,255,255,.6);border-color:rgba(255,255,255,.2)">Kun nødvendige</button>
    <button class="btn btn-primary btn-sm" onclick="MO.acceptCookies()">Godta alle</button>
  </div>
</div>

<!-- Toast -->
<div class="toast" id="toast">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
  <span id="toast-msg"></span>
</div>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML + overlaysHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);
  MO.initNav();
};

MO.catFilter = function(btn, cat) {
  document.querySelectorAll('.catbar__btn').forEach(function(b){ b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  var nyttGrid  = document.getElementById('grid-nytt');
  var bruktGrid = document.getElementById('grid-brukt');
  var fn = function(arr){
    if (cat === 'alle') return arr;
    if (cat === 'salg') return arr.filter(function(p){ return Math.round((1-p.price/p.oldPrice)*100) >= 50; });
    return arr.filter(function(p){ return p.cat === cat; });
  };
  if (nyttGrid)  nyttGrid.innerHTML  = fn(MO.products.filter(function(p){return p.type==='nytt';})).map(MO.cardHTML).join('');
  if (bruktGrid) bruktGrid.innerHTML = fn(MO.products.filter(function(p){return p.type==='brukt';})).map(MO.cardHTML).join('');
};

MO.openWishlistPage = function() {
  var title = MO.t('wishlist.title');
  if (MO.wishlist.length === 0) {
    MO.openModal(title,
      '<div style="text-align:center;padding:40px 0;color:var(--text-4)">' +
      '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="margin:0 auto 16px;display:block"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
      '<p style="font-weight:500;margin-bottom:6px;color:var(--text)">' + MO.t('wishlist.empty.title') + '</p>' +
      '<p style="font-size:13px">' + MO.t('wishlist.empty.sub') + '</p></div>'
    );
    return;
  }
  var items = MO.wishlist.map(function(id){
    var p = MO.findProduct(id);
    if (!p) return '';
    return '<div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--gray-100)">' +
      '<div style="width:54px;height:60px;background:var(--gray-100);border-radius:9px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--gray-300)">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg></div>' +
      '<div style="flex:1">' +
      '<p style="font-size:11px;text-transform:uppercase;letter-spacing:.09em;color:var(--text-4)">' + p.brand + '</p>' +
      '<p style="font-size:14px;font-weight:500;margin:2px 0">' + p.name + '</p>' +
      '<p style="font-family:var(--serif);font-size:17px;color:var(--g3)">' + p.price.toLocaleString('no-NO') + ' kr</p></div>' +
      '<button class="btn btn-primary btn-sm" onclick="MO.closeModal();MO.openProduct(\'' + id + '\')">' + MO.t('wishlist.view') + '</button></div>';
  }).join('');
  MO.openModal(title + ' (' + MO.wishlist.length + ')', items);
};

MO.openMobileMenu = function() {
  MO.openModal('Menu',
    '<div style="display:flex;flex-direction:column;gap:4px">' +
    '<a href="index.html" class="btn btn-ghost btn-full" style="justify-content:flex-start;font-size:15px" onclick="MO.closeModal()">' + MO.t('mobile.new') + '</a>' +
    '<a href="index.html#brukt" class="btn btn-ghost btn-full" style="justify-content:flex-start;font-size:15px" onclick="MO.closeModal()">' + MO.t('mobile.used') + '</a>' +
    '<a href="om-oss.html" class="btn btn-ghost btn-full" style="justify-content:flex-start;font-size:15px" onclick="MO.closeModal()">' + MO.t('mobile.about') + '</a>' +
    '<a href="cart.html" class="btn btn-ghost btn-full" style="justify-content:flex-start;font-size:15px" onclick="MO.closeModal()">' + MO.t('mobile.cart') + '</a>' +
    '<hr style="border:none;border-top:1px solid var(--gray-200);margin:6px 0">' +
    '<button class="btn btn-ghost btn-full" style="justify-content:flex-start;font-size:13.5px" onclick="MO.closeModal();MO.showModal(\'kontakt\')">' + MO.t('mobile.contact') + '</button>' +
    '<button class="btn btn-ghost btn-full" style="justify-content:flex-start;font-size:13.5px" onclick="MO.closeModal();MO.showModal(\'selg\')">' + MO.t('mobile.sell') + '</button>' +
    '</div>'
  );
};
