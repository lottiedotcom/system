const CACHE_NAME = 'seiren-os-v52'; 
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  // System Icons
  'https://cdn-icons-png.flaticon.com/512/2919/2919573.png',
  // Default Profile Avatar
  'https://cdn-icons-png.flaticon.com/512/3233/3233508.png',
  // New Ebi (Pet) Image
  'https://i.postimg.cc/13FQckct/Untitled-Artwork-20260110072840-20260110074706.png'
];

// Install Event
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate Event (Cleanup Old Caches)
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

// Fetch Event (Offline Capability)
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
