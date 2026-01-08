const CACHE_NAME = 'seiren-os-v32';
const ASSETS = [
  './',
  './index.html',
  'https://cdn-icons-png.flaticon.com/512/2919/2919573.png'
];

// Install: Cache files
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Force new SW to take over immediately
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // Control all clients immediately
});

// Fetch: Network First, fall back to Cache
// This ensures you always see updates when online!
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // Update cache with new version
        const clone = res.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, clone);
        });
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
