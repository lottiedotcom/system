const CACHE_NAME = 'seiren-os-v54'; 
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  // System Icons
  'https://cdn-icons-png.flaticon.com/512/2919/2919573.png',
  // Default Profile Avatar
  'https://cdn-icons-png.flaticon.com/512/3233/3233508.png',
  // New Ebi (Pet) Image - IMPORTANT for offline loading
  'https://i.postimg.cc/13FQckct/Untitled-Artwork-20260110072840-20260110074706.png'
];

// 1. Install Event - Caches assets immediately
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Activate Event - Cleans up old versions (v53, v52, etc.)
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
  self.clients.claim();
});

// 3. Fetch Event - Serves from cache, falls back to network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // Clone and cache any new images/files encountered
        const clone = res.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, clone);
        });
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
