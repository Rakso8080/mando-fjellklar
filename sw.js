var CACHE = 'mando-v3';
var STATIC_CACHE = 'mando-static-v3';
var ASSET_CACHE = 'mando-assets-v3';

var staticUrls = [
  '/',
  '/index.html',
  '/om-oss.html',
  '/cart.html',
  '/produkt.html',
  '/kategori.html',
  '/sjekkut.html',
  '/bekreftelse.html',
  '/login.html',
  '/account.html',
  '/faq.html',
  '/personvern.html',
  '/vilkar.html',
  '/angrerett.html',
  '/offline.html',
  '/css/style.css',
  '/data/products.js',
  '/js/app.js',
  '/js/layout.js',
  '/js/effects.js',
  '/favicon.svg',
  '/favicon.png',
  '/manifest.json'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(function (cache) {
      return cache.addAll(staticUrls);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) {
          return k.indexOf('mando-') === 0 && k !== STATIC_CACHE && k !== ASSET_CACHE && k !== CACHE;
        }).map(function (k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  var url = new URL(request.url);

  if (url.hostname !== self.location.hostname) return;

  var isAsset = request.destination === 'style' || request.destination === 'script' ||
    request.destination === 'font' || request.destination === 'image' ||
    url.pathname.match(/\.(css|js|json|woff2?|png|jpg|jpeg|gif|svg|webp|avif)$/);

  var isDoc = request.destination === 'document' || url.pathname === '/' || url.pathname.match(/\.html$/);

  /* Stale-while-revalidate for assets */
  if (isAsset) {
    event.respondWith(
      caches.match(request).then(function (cached) {
        var fetchPromise = fetch(request).then(function (net) {
          var clone = net.clone();
          caches.open(ASSET_CACHE).then(function (cache) { cache.put(request, clone); });
          return net;
        }).catch(function () { return cached; });
        return cached || fetchPromise;
      })
    );
    return;
  }

  /* Network-first for HTML with offline fallback */
  if (isDoc) {
    event.respondWith(
      fetch(request).then(function (response) {
        var clone = response.clone();
        caches.open(CACHE).then(function (cache) { cache.put(request, clone); });
        return response;
      }).catch(function () {
        return caches.match(request).then(function (cached) {
          return cached || caches.match('/offline.html');
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(function (cached) {
      return cached || fetch(request).then(function (net) {
        var clone = net.clone();
        caches.open(ASSET_CACHE).then(function (cache) { cache.put(request, clone); });
        return net;
      });
    })
  );
});
