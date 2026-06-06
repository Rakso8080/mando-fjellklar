var CACHE = 'mando-v1';
var urlsToCache = [
  '/',
  '/index.html',
  '/om-oss.html',
  '/cart.html',
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
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
