/* 🎀 SEIREN OS SERVICE WORKER 
   Version: 5.0 (Matches App)
   Strategy: Stale-While-Revalidate & Dynamic Caching
*/

const CACHE_NAME = 'seiren-os-cache-v50';

// Files to cache immediately on install
const PRE_CACHE = [
    './',
    './index.html',
    './manifest.json'
];

// 1. INSTALL: Wake up the worker and cache core files
self.addEventListener('install', (event) => {
    console.log('[Seiren SW] Installing... 🎀');
    self.skipWaiting(); // Activate immediately
    
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(PRE_CACHE);
        })
    );
});

// 2. ACTIVATE: Clean up old versions of Seiren OS
self.addEventListener('activate', (event) => {
    console.log('[Seiren SW] Activated! ✨');
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[Seiren SW] Removing old cache:', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

// 3. FETCH: The Magic 🪄
// This intercepts every network request.
// It tries to serve from cache first, then falls back to network,
// AND it saves new images (avatars/stickers) to cache automatically.
self.addEventListener('fetch', (event) => {
    // Ignore chrome-extension requests or non-http
    if (!event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Return cached file if found
            if (cachedResponse) {
                return cachedResponse;
            }

            // Otherwise, go to network
            return fetch(event.request).then((networkResponse) => {
                // Check if valid response
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' && networkResponse.type !== 'cors') {
                    return networkResponse;
                }

                // Clone it to save it
                const responseToCache = networkResponse.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            }).catch(() => {
                // Offline fallback logic could go here
                console.log('[Seiren SW] Offline and item not in cache 😢');
            });
        })
    );
});
