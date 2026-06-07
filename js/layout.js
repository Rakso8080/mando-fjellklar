(function () {
  'use strict';
  if (!window.MO) return;

  var MO = window.MO;

  MO.injectLayout = function (activePage) {

    var navHTML = [
      '<div id="searchbar" class="searchbar">',
      '<div class="searchbar__inner">',
      '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" style="color:var(--text-4);flex-shrink:0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
      '<input id="search-input" class="searchbar__input" type="search" placeholder="" autocomplete="off"/>',
      '<span class="searchbar__cancel" onclick="MO.closeSearch()">Avbryt</span>',
      '</div><div class="searchbar__results" id="search-results"></div></div>',
      '<nav class="nav" id="main-nav"><div class="nav__inner">',
      '<a href="index.html" class="nav__logo"><svg viewBox="0 0 64 64" class="nav__logo-img" aria-label="M&O"><rect width="64" height="64" rx="12" fill="var(--g5)"/><polygon points="32,14 52,48 12,48" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="1.5" stroke-linejoin="round"/><polygon points="32,22 48,48 16,48" fill="rgba(255,255,255,.08)"/><path d="M18 44 L18 28 L26 38 L32 28 L38 38 L46 28 L46 44" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg></a>',
      '<div class="nav__links">',
      '<a href="index.html" class="nav__link ' + (activePage === 'home' ? 'active' : '') + '"><span class="badge badge-new" data-i18n="nav.nytt">Nytt</span></a>',
      '<a href="index.html#brukt" class="nav__link ' + (activePage === 'brukt' ? 'active' : '') + '"><span class="badge badge-used" data-i18n="nav.brukt">Brukt</span></a>',
      '<a href="om-oss.html" class="nav__link ' + (activePage === 'om' ? 'active' : '') + '" data-i18n="nav.om">Om oss</a>',
      '</div><div class="nav__actions">',
      '<button class="nav__icon nav__lang" id="lang-btn" onclick="MO.toggleLang()" aria-label="Language">NO</button>',
      '<button class="nav__icon theme-toggle" id="theme-btn" onclick="MO.toggleTheme()" aria-label="Bytt fargetema" style="font-size:16px;line-height:1">🎨<span class="theme-tip">Tema</span></button>',
      '<button class="nav__icon" onclick="MO.openSearch()" aria-label="Søk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></button>',
      '<button class="nav__icon" onclick="MO.openWishlistPage()" aria-label="Favoritter"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg><span class="cart-badge" id="wish-badge-nav"></span></button>',
      '<button class="nav__icon" onclick="MO.openCart()" aria-label="Handlekurv"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><span class="cart-badge" id="cart-badge-nav"></span></button>',
      '<button class="nav__icon nav__mobile-btn" onclick="MO.openMobileMenu()" aria-label="Meny"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>',
      '</div></div></nav>',
    ].join('');

    var overlaysHTML = [
      '<div class="drawer-overlay" id="cart-overlay" onclick="MO.closeCart()"></div>',
      '<div class="drawer" id="cart-drawer">',
      '<div class="drawer__head"><span class="drawer__title" data-i18n="cart.title">Handlekurv</span><button class="drawer__close" onclick="MO.closeCart()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>',
      '<div class="drawer__body" id="cart-drawer-body"></div>',
      '<div class="drawer__foot" id="cart-drawer-foot" style="display:none">',
      '<div class="drawer__total-row"><span class="drawer__total-lbl" data-i18n="cart.total">Total</span><span class="drawer__total-sum" id="cart-drawer-total">0 kr</span></div>',
      '<a href="cart.html" class="btn btn-primary btn-full btn-lg" onclick="MO.closeCart()" data-i18n="cart.checkout">Gå til kasse</a>',
      '<button class="btn btn-ghost btn-full" style="margin-top:8px" onclick="MO.closeCart()" data-i18n="cart.continue">Fortsett å handle</button>',
      '</div></div>',
      '<div class="modal-overlay" id="pdm-overlay" onclick="if(event.target===this)MO.closePdm()"><div class="modal modal--wide">',
      '<div class="modal__head"><span class="modal__title" id="pdm-title">Produkt</span><button class="modal__close" onclick="MO.closePdm()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>',
      '<div class="modal__body" id="pdm-body"></div></div></div>',
      '<div class="modal-overlay" id="modal-overlay" onclick="if(event.target===this)MO.closeModal()"><div class="modal">',
      '<div class="modal__head"><span class="modal__title" id="gm-title"></span><button class="modal__close" onclick="MO.closeModal()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>',
      '<div class="modal__body" id="gm-body"></div></div></div>',
      '<div class="toast" id="toast"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg><span id="toast-msg"></span></div>',
    ].join('');

    var mobileNavHTML = [
      '<div class="mobile-nav" id="mobile-nav">',
      '<button class="mobile-nav__btn" data-mnav="search" aria-label="Søk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><span class="mobile-nav__lbl" data-i18n="nav.search">Søk</span></button>',
      '<button class="mobile-nav__btn" data-mnav="wish" aria-label="Favoritter"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg><span class="mobile-nav__lbl" data-i18n="nav.favorites">Favoritter</span><span class="mobile-nav__badge" id="wish-badge-mobile"></span></button>',
      '<button class="mobile-nav__btn" data-mnav="cart" aria-label="Handlekurv"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><span class="mobile-nav__lbl" data-i18n="nav.cart">Handlekurv</span><span class="cart-badge mobile-nav__badge" id="cart-badge-mobile"></span></button>',
      '<button class="mobile-nav__btn" data-mnav="menu" aria-label="Meny"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg><span class="mobile-nav__lbl" data-i18n="nav.menu">Meny</span></button>',
      '</div>',
    ].join('');

    var backToTopHTML = '<button class="back-top" id="back-top" aria-label="Til toppen" data-i18n="backtop"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="18 15 12 9 6 15"/></svg></button>';

    var cookieHTML = [
      '<div class="cookie-bar" id="cookie-bar">',
      '<p class="cookie-bar__text" data-i18n="cookie.text">Vi bruker cookies for å gi deg best mulig opplevelse. <a href="personvern.html" data-i18n="cookie.read">Les mer</a></p>',
      '<div class="cookie-bar__actions">',
      '<button class="btn btn-sm btn-white" data-cookie="all" data-i18n="cookie.accept">Godta alle</button>',
      '<button class="btn btn-sm btn-ghost" style="border-color:rgba(255,255,255,.2);color:rgba(255,255,255,.6)" data-cookie="essential" data-i18n="cookie.essential">Kun nødvendige</button>',
      '</div></div>',
    ].join('');

    var footerHTML = [
      '<footer>',
      '<div class="footer__top">',
      '<div><div class="footer__logo"><svg viewBox="0 0 64 64" class="footer__logo-img" aria-label="M&O"><rect width="64" height="64" rx="12" fill="var(--g6)"/><polygon points="32,14 52,48 12,48" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="1.5" stroke-linejoin="round"/><polygon points="32,22 48,48 16,48" fill="rgba(255,255,255,.08)"/><path d="M18 44 L18 28 L26 38 L32 28 L38 38 L46 28 L46 44" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><p class="footer__tagline" data-i18n="footer.tagline">Fjellklær uten kompromiss. Nye og brukte klær fra de beste merkene — til priser som gir mening.</p></div>',
      '<div><p class="footer__col-title" data-i18n="footer.shop">Butikk</p><div class="footer__links">',
      '<a href="index.html" class="footer__link" data-i18n="footer.new">Nytt sortiment</a>',
      '<a href="index.html#brukt" class="footer__link" data-i18n="footer.used">Pent brukt</a>',
      '<button class="footer__link" onclick="MO.catFilter(null,\'salg\')" data-i18n="footer.sale">Kampanjer</button>',
      '</div></div>',
      '<div><p class="footer__col-title" data-i18n="footer.service">Kundeservice</p><div class="footer__links">',
      '<button class="footer__link" onclick="MO.showModal(\'kontakt\')" data-i18n="footer.contact">Kontakt oss</button>',
      '<button class="footer__link" onclick="MO.showModal(\'frakt\')" data-i18n="footer.shipping">Frakt &amp; levering</button>',
      '<button class="footer__link" onclick="MO.showModal(\'retur\')" data-i18n="footer.returns">Retur &amp; bytte</button>',
      '<button class="footer__link" onclick="MO.showModal(\'selg\')" data-i18n="footer.sell">Selg til oss</button>',
      '</div></div>',
      '<div><p class="footer__col-title" data-i18n="footer.about">Om M&amp;O</p><div class="footer__links">',
      '<a href="om-oss.html" class="footer__link" data-i18n="footer.about">Om oss</a>',
      '<button class="footer__link" onclick="MO.showModal(\'baerekraft\')" data-i18n="footer.sustainability">Bærekraft</button>',
      '<button class="footer__link" onclick="MO.showModal(\'personvern\')" data-i18n="footer.privacy">Personvern</button>',
      '<button class="footer__link" onclick="MO.showModal(\'vilkar\')" data-i18n="footer.terms">Vilkår</button>',
      '</div></div>',
      '</div>',
      '<div class="footer__bottom">',
      '<p class="footer__copy" data-i18n="footer.copyright">&copy; 2025 M&amp;O — Mountain &amp; Outdoor. Alle rettigheter forbeholdt.</p>',
      '<p class="footer__copy" data-i18n="footer.org">Org.nr: 123 456 789 MVA</p>',
      '</div></footer>',
      '<div class="footer footer--glow"></div>',
    ].join('');

    /* Store current lang for applyLang to use after injection */
    window._mo_lang = MO.lang;

    document.body.insertAdjacentHTML('afterbegin', navHTML + overlaysHTML + mobileNavHTML + backToTopHTML + cookieHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    MO.initNav();
    MO.initParallax();
    MO.initBackToTop();
    MO.initMobileNav();
    MO.initCookieConsent();
  };

})();
