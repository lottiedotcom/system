const CACHE_NAME = 'seiren-os-v91'; // Bumped version to force update
const URLS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json'
];

// 1. INSTALL: Cache the app shell immediately
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Forces the new SW to take over immediately
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});

// 2. ACTIVATE: Delete old caches to prevent serving old/buggy versions
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Take control of open pages
});

// 3. FETCH: Serve from Cache, but try to update in the background
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
