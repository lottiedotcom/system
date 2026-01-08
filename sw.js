const CACHE_NAME = 'seiren-os-v27-mood';
const urlsToCache = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.map(n => n !== CACHE_NAME && caches.delete(n))))); self.clients.claim(); });
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
