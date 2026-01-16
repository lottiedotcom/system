const CACHE_NAME = 'seiren-os-v55'; 
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn-icons-png.flaticon.com/512/2919/2919573.png',
  'https://cdn-icons-png.flaticon.com/512/3233/3233508.png',
  'https://i.postimg.cc/13FQckct/Untitled-Artwork-20260110072840-20260110074706.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keyList) => Promise.all(keyList.map((key) => {
    if (key !== CACHE_NAME) return caches.delete(key);
  }))));
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request).then((res) => {
    const clone = res.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
    return res;
  }).catch(() => caches.match(e.request)));
});
