var CACHE = 'mando-v2';
var STATIC_CACHE = 'mando-static-v2';
var ASSET_CACHE = 'mando-assets-v2';

var staticUrls = [
  '/',
  '/index.html',
  '/om-oss.html',
  '/cart.html',
  '/produkt.html',
  '/offline.html',
  '/css/style.css',
  '/css/effects.css',
  '/js/app.js',
  '/js/layout.js',
  '/js/effects.js',
  '/favicon.svg',
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
          return k !== STATIC_CACHE && k !== ASSET_CACHE && k !== CACHE;
        }).map(function (k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  var url = new URL(request.url);

  // Always fetch API/Stripe requests from network
  if (url.hostname !== self.location.hostname) {
    return;
  }

  // Cache-first for static assets
  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font' ||
    request.destination === 'image' ||
    url.pathname.match(/\.(css|js|json|woff2?|png|jpg|jpeg|gif|svg|webp|avif)$/)
  ) {
    event.respondWith(
      caches.match(request).then(function (response) {
        return response || fetch(request).then(function (netResponse) {
          var clone = netResponse.clone();
          caches.open(ASSET_CACHE).then(function (cache) {
            cache.put(request, clone);
          });
          return netResponse;
        });
      })
    );
    return;
  }

  // Network-first for HTML pages
  if (request.destination === 'document' || url.pathname === '/' || url.pathname.match(/\.html$/)) {
    event.respondWith(
      fetch(request).then(function (response) {
        var clone = response.clone();
        caches.open(CACHE).then(function (cache) {
          cache.put(request, clone);
        });
        return response;
      }).catch(function () {
        return caches.match(request).then(function (cached) {
          return cached || caches.match('/offline.html');
        });
      })
    );
    return;
  }

  // Default: cache-first
  event.respondWith(
    caches.match(request).then(function (response) {
      return response || fetch(request);
    })
  );
});
