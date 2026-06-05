(function () {
  'use strict';
  if (!window.MO) return;

  var MO = window.MO;

  MO.injectLayout = function (activePage) {

    var navHTML = [
      '<div id="searchbar" class="searchbar">',
      '<div class="searchbar__inner">',
      '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" style="color:var(--text-4);flex-shrink:0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
      '<input id="search-input" class="searchbar__input" type="search" placeholder="Søk etter merke, type eller størrelse…" autocomplete="off"/>',
      '<span class="searchbar__cancel" onclick="MO.closeSearch()">Avbryt</span>',
      '</div></div>',
      '<nav class="nav" id="main-nav"><div class="nav__inner">',
      '<a href="index.html" class="nav__logo">M&amp;O</a>',
      '<div class="nav__links">',
      '<a href="index.html" class="nav__link ' + (activePage === 'home' ? 'active' : '') + '"><span class="badge badge-new">Nytt</span></a>',
      '<a href="index.html#brukt" class="nav__link ' + (activePage === 'brukt' ? 'active' : '') + '"><span class="badge badge-used">Brukt</span></a>',
      '<a href="om-oss.html" class="nav__link ' + (activePage === 'om' ? 'active' : '') + '">Om oss</a>',
      '</div><div class="nav__actions">',
      '<button class="nav__icon" onclick="MO.openSearch()" aria-label="Søk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></button>',
      '<button class="nav__icon" onclick="MO.openWishlistPage()" aria-label="Favoritter"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>',
      '<button class="nav__icon" onclick="MO.openCart()" aria-label="Handlekurv"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><span class="cart-badge" id="cart-badge-nav"></span></button>',
      '<button class="nav__icon nav__mobile-btn" onclick="MO.openMobileMenu()" aria-label="Meny"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>',
      '</div></div></nav>',
      '<div class="catbar"><div class="catbar__inner" id="catbar">',
      '<button class="catbar__btn active">Alle</button>',
      '<button class="catbar__btn">Jakker &amp; Yttertøy</button>',
      '<button class="catbar__btn">Mellomlag</button>',
      '<button class="catbar__btn">Bukser</button>',
      '<button class="catbar__btn">Sko &amp; Støvler</button>',
      '<button class="catbar__btn">Tilbehør</button>',
      '<button class="catbar__btn">🔥 Tilbud</button>',
      '</div></div>',
    ].join('');

    var overlaysHTML = [
      '<div class="drawer-overlay" id="cart-overlay" onclick="MO.closeCart()"></div>',
      '<div class="drawer" id="cart-drawer">',
      '<div class="drawer__head"><span class="drawer__title">Handlekurv</span><button class="drawer__close" onclick="MO.closeCart()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>',
      '<div class="drawer__body" id="cart-drawer-body"></div>',
      '<div class="drawer__foot" id="cart-drawer-foot" style="display:none">',
      '<div class="drawer__total-row"><span class="drawer__total-lbl">Total</span><span class="drawer__total-sum" id="cart-drawer-total">0 kr</span></div>',
      '<a href="cart.html" class="btn btn-primary btn-full btn-lg" onclick="MO.closeCart()">Gå til kasse</a>',
      '<button class="btn btn-ghost btn-full" style="margin-top:8px" onclick="MO.closeCart()">Fortsett å handle</button>',
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
      '<button class="mobile-nav__btn" data-mnav="search" aria-label="Søk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><span class="mobile-nav__lbl">Søk</span></button>',
      '<button class="mobile-nav__btn" data-mnav="wish" aria-label="Favoritter"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg><span class="mobile-nav__lbl">Favoritter</span><span class="mobile-nav__badge" id="wish-badge-mobile"></span></button>',
      '<button class="mobile-nav__btn" data-mnav="cart" aria-label="Handlekurv"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><span class="mobile-nav__lbl">Handlekurv</span><span class="cart-badge mobile-nav__badge" id="cart-badge-mobile"></span></button>',
      '<button class="mobile-nav__btn" data-mnav="menu" aria-label="Meny"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg><span class="mobile-nav__lbl">Meny</span></button>',
      '</div>',
    ].join('');

    var backToTopHTML = '<button class="back-top" id="back-top" aria-label="Til toppen"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="18 15 12 9 6 15"/></svg></button>';

    var cookieHTML = [
      '<div class="cookie-bar" id="cookie-bar">',
      '<p class="cookie-bar__text">Vi bruker cookies for å gi deg best mulig opplevelse. <a href="personvern.html">Les mer</a></p>',
      '<div class="cookie-bar__actions">',
      '<button class="btn btn-sm btn-white" data-cookie="all">Godta alle</button>',
      '<button class="btn btn-sm btn-ghost" style="border-color:rgba(255,255,255,.2);color:rgba(255,255,255,.6)" data-cookie="essential">Kun nødvendige</button>',
      '</div></div>',
    ].join('');

    var footerHTML = [
      '<footer>',
      '<div class="footer__top">',
      '<div><div class="footer__logo">M&amp;O</div><p class="footer__tagline">Fjellklær uten kompromiss. Nye og brukte klær fra de beste merkene — til priser som gir mening.</p></div>',
      '<div><p class="footer__col-title">Butikk</p><div class="footer__links">',
      '<a href="index.html" class="footer__link">Nytt sortiment</a>',
      '<a href="index.html#brukt" class="footer__link">Pent brukt</a>',
      '<button class="footer__link" onclick="MO.catFilter(null,\'salg\')">Kampanjer</button>',
      '</div></div>',
      '<div><p class="footer__col-title">Kundeservice</p><div class="footer__links">',
      '<button class="footer__link" onclick="MO.showModal(\'kontakt\')">Kontakt oss</button>',
      '<button class="footer__link" onclick="MO.showModal(\'frakt\')">Frakt &amp; levering</button>',
      '<button class="footer__link" onclick="MO.showModal(\'retur\')">Retur &amp; bytte</button>',
      '<button class="footer__link" onclick="MO.showModal(\'selg\')">Selg til oss</button>',
      '</div></div>',
      '<div><p class="footer__col-title">Om M&amp;O</p><div class="footer__links">',
      '<a href="om-oss.html" class="footer__link">Om oss</a>',
      '<button class="footer__link" onclick="MO.showModal(\'baerekraft\')">Bærekraft</button>',
      '<button class="footer__link" onclick="MO.showModal(\'personvern\')">Personvern</button>',
      '<button class="footer__link" onclick="MO.showModal(\'vilkar\')">Vilkår</button>',
      '</div></div>',
      '</div>',
      '<div class="footer__bottom">',
      '<p class="footer__copy">&copy; 2025 M&amp;O — Mountain &amp; Outdoor. Alle rettigheter forbeholdt.</p>',
      '<p class="footer__copy">Org.nr: 123 456 789 MVA</p>',
      '</div></footer>',
    ].join('');

    document.body.insertAdjacentHTML('afterbegin', navHTML + overlaysHTML + mobileNavHTML + backToTopHTML + cookieHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    MO.initNav();
    MO.initBackToTop();
    MO.initMobileNav();
    MO.initCookieConsent();
  };

})();
