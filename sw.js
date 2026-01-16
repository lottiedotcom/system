const CACHE_NAME = 'seiren-os-v76-pk-update';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    'https://cdn-icons-png.flaticon.com/512/2919/2919573.png'
];

// 1. INSTALL: Force the new worker to skip the waiting line
self.addEventListener('install', (e) => {
    self.skipWaiting(); 
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

// 2. ACTIVATE: Delete ALL old caches immediately
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('Nuking old cache:', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim(); // Grab control of the page immediately
});

// 3. FETCH: Network First, then Cache
// This ensures you always get the live version if you have internet.
self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request)
            .then((res) => {
                const clone = res.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
                return res;
            })
            .catch(() => {
                return caches.match(e.request);
            })
    );
});
