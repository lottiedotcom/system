const CACHE_NAME = 'seiren-os-v30-network-first';
const urlsToCache = ['./', './index.html', './manifest.json'];

// 1. INSTALL: Force immediate takeover
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// 2. ACTIVATE: Delete ALL previous caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        if (cacheName !== CACHE_NAME) {
          console.log('Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        }
      })
    ))
  );
  self.clients.claim();
});

// 3. FETCH: NETWORK FIRST STRATEGY
// Always try the internet first. If it fails, use the cache.
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // If we got a valid response, update the cache and return it
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      })
      .catch(() => {
        // If network fails (offline), return cached version
        return caches.match(event.request);
      })
  );
});
