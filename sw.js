const CACHE_NAME = 'seiren-os-v57'; 
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  // App Icon
  'https://cdn-icons-png.flaticon.com/512/2919/2919573.png',
  // Default Fallback Avatar
  'https://cdn-icons-png.flaticon.com/512/3233/3233508.png',
  // Ebi (Pet) Image
  'https://i.postimg.cc/13FQckct/Untitled-Artwork-20260110072840-20260110074706.png'
];

// 1. Install - Caches assets
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Forces this SW to become active immediately
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Activate - Cleans up old versions
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
  self.clients.claim(); // Takes control of the page immediately
});

// 3. Fetch - Serves from cache, falls back to network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // Cache new files automatically
        const clone = res.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, clone);
        });
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
