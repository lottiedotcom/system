const CACHE_NAME = 'seiren-os-v72-force-update';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    'https://cdn-icons-png.flaticon.com/512/2919/2919573.png'
];

// 1. INSTALL: Force the new worker to jump the line
self.addEventListener('install', (e) => {
    self.skipWaiting(); 
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

// 2. ACTIVATE: Delete all old versions of the site immediately
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('Cleaning up old cache:', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim(); // Take control of the page right away
});

// 3. FETCH: Serve cached files if available, otherwise fetch from network
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            return res || fetch(e.request);
        })
    );
});

