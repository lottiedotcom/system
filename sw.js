const CACHE_NAME = 'seiren-os-v3'; // Version bumped to force update
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    // CORE ICONS
    'https://cdn-icons-png.flaticon.com/512/2919/2919573.png',
    
    // UI ASSETS
    'https://i.postimg.cc/13FQckct/Untitled-Artwork-20260110072840-20260110074706.png', // Ebi
    'https://i.postimg.cc/9fr6qn0r/152f88be4a1ea59ecb8283bd71e01aa5.jpg', // Pharmacy Card
    'https://i.postimg.cc/8C9qdmfN/a3f6c6b70ab5af6f58240dba296b7556.png', // Reward Icon
    
    // WALLPAPERS (OS & GACHA)
    'https://i.postimg.cc/jSy15jN8/254dfc0d0652f67805de02ae1113f60a.jpg',
    'https://i.postimg.cc/yNBbSzXn/53f33a2e730b5174988e4d58c7e6fbb7.jpg',
    'https://i.postimg.cc/Xv3zy0cw/684495e309f1e7a6b1d1609f033f905c.jpg',
    'https://i.postimg.cc/Jhm2BWcq/7cf07749dc2fcf775ffc407e42a0a53e.jpg',
    'https://i.postimg.cc/YSksmwfs/86c8380a6558035b88292bba20ec14c1.jpg',
    'https://i.postimg.cc/TPG4WXqj/8da7b8d48d6823657b54988755d60dd9.jpg',
    'https://i.postimg.cc/Xv3zy0ck/bd4efa7fd2209b10fc4725c471ece520.jpg',
    'https://i.postimg.cc/6QwmGNLL/d0d6e91da0105b958697e57a47a0d4ca.jpg',
    'https://i.postimg.cc/DzFMbKd6/f17eaffa8a2d53f205b6e7b2718ff2ae.jpg',
    'https://i.postimg.cc/43ZShTb6/f9fc99a5267ad98f2760ee5846f21607.jpg',
    'https://i.postimg.cc/KYFHgyDX/Untitled83_20260118063949.jpg',
    'https://i.postimg.cc/6QwmGNfB/Untitled84_20260118064140.jpg',
    'https://i.postimg.cc/XYfPyYDs/Untitled86_20260119115349.jpg',
    'https://i.postimg.cc/dV2fTVS4/Untitled86_20260119115047.jpg',
    'https://i.postimg.cc/nrX5sK67/Untitled86_20260119115537.jpg',
    'https://i.postimg.cc/wM1Pt5Sc/Untitled86_20260119115338.jpg',
    'https://i.postimg.cc/NFKVy8Wx/Untitled86_20260119115121.jpg',
    'https://i.postimg.cc/WzdKDmQw/Untitled85_20260119113009.jpg',

    // WALLPAPERS (BEDROOM ONLY - NEW)
    'https://i.postimg.cc/DZ5qstqb/10b51003f5fc0df41075f24861363d7d.jpg',
    'https://i.postimg.cc/qRQ8n983/327b16e3d5893b32482b5642782105d5.jpg',
    'https://i.postimg.cc/wvFhJSht/7de5e7ad4933d616d390e74c5405ebc8.jpg',
    'https://i.postimg.cc/mDTYPbFM/891e1ee9f917421887230a1f93c50e74.jpg',
    'https://i.postimg.cc/pTkD8gD5/fdfddf6e776fd0428aa1e486741fe780.jpg',

    // DREAM JOURNAL
    'https://i.postimg.cc/Zn1jB8Lc/Untitled86-20260119120235.jpg',

    // STICKERS (GACHA)
    'https://i.postimg.cc/4dFyJtrX/12d9131d2320519e1e23f5f678427396.png',
    'https://i.postimg.cc/zBPvJW46/3e4f2fa5b124701b5f17089d9ab9b737.png',
    'https://i.postimg.cc/hjGhWMZ5/62695aafc7da6361407abf3a87ecafb6.png',
    'https://i.postimg.cc/1tYX96bb/65794fc54d21b0cdd7b3db4e813c6b11.png',
    'https://i.postimg.cc/4dFyJtrR/9add2a23fa78c0e9fcc21c3a394b02cd.png',
    'https://i.postimg.cc/bJFrzbKc/ed8d7acf0f1516a1b3de4b9df6a3b048.png',
    'https://i.postimg.cc/DyG0TS6t/2f0f42dbd7882d400c9e4f651c9d438d.png',
    'https://i.postimg.cc/P5kxrdFT/363a54d905dfd329fb095af572d6d580.png',
    'https://i.postimg.cc/8k9c9RR9/42616c918cd958cc301cb745852ff27e.png',
    'https://i.postimg.cc/tC6JjsD4/45ca3463cef73aa5c917b57ac0cfd971.png',
    'https://i.postimg.cc/FF8z8yb5/56e20c61dbf4feb80179606c2699d5f1.png',
    'https://i.postimg.cc/CL85gR7v/607d0537e36c5788fe96007288ae5ccc.png',
    'https://i.postimg.cc/05FjFYYL/69e61b8d6420f427e4ac42a32f49eddf.png',
    'https://i.postimg.cc/66gqgrr1/6b1bb26664a8aafcd16a6d4436bcf54a.png',
    'https://i.postimg.cc/PrDJjCKh/7e91ebbf0419972863f456a8aa7c904b.png',
    'https://i.postimg.cc/28WyD1Gs/93e86c6d6b567ece1a03b6c04d04892c.png',
    'https://i.postimg.cc/nhtzcnwr/a09248b8a40f6c9f22285635b90be653.png',
    'https://i.postimg.cc/Mp8TKzrp/abb690b3250b998f75bbc788f7154c55.png',
    'https://i.postimg.cc/fRhLTMgT/af7f389e3f9e09024197d9e164ad33e2.png',
    'https://i.postimg.cc/qMKqTNQt/d1b701f32c7e48282f4a20be48a7fd3f.png',
    'https://i.postimg.cc/vHnTs4Xm/d3092ebc83ae4814d0e75e1af83646e1.png',
    'https://i.postimg.cc/WpCzCGGx/d754b77bd5a2ef644d29367b5ca3a51b.png',
    'https://i.postimg.cc/ncmrJXT8/da7d72fedbce39a1f0d35f89c184c29f.png',
    'https://i.postimg.cc/DyG0TS5f/da828bc90e8f772100995a682a906233.png',
    'https://i.postimg.cc/x1SCT9Fj/deb771ba2ff74c9af0871e8af7bb4cc0.png',
    'https://i.postimg.cc/pXjrHmC1/eb31aaf8301282152f43f7050b39a5fd.png',
    'https://i.postimg.cc/SN9RhnVJ/ee455254fdc48289bf096e1eb048e089.png',
    'https://i.postimg.cc/KvTj21fw/f91a9c969269fdedf2e437391eda83e8.png'
];

// 1. INSTALL: Cache all assets
self.addEventListener('install', (e) => {
    self.skipWaiting(); // FORCE INSTALL
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// 2. ACTIVATE: Clean up old caches & take control
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[SW] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim(); // FORCE CONTROL
});

// 3. FETCH: Serve from cache, fall back to network
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
