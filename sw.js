const CACHE_NAME = 'seiren-os-v88-force-update';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    'https://cdn-icons-png.flaticon.com/512/2919/2919573.png'
];

// INSTALL: Force new version to jump the line
self.addEventListener('install', (e) => {
    self.skipWaiting(); // THIS LINE IS CRITICAL FOR UPDATES
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

// ACTIVATE: Delete all old caches immediately
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('Removing old cache:', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim(); // Grab control of the page immediately
});

// FETCH: Try Cache, then Network
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            return res || fetch(e.request);
        })
    );
});
