const CACHE_NAME = 'invoice-app-v5';
const urlsToCache = [
  './invoice.html',
  './logo/logo_new.webp',
  'https://fonts.googleapis.com/css2?family=Almarai:wght@400;700;800;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // We use catch to avoid failing the whole install if one remote asset fails
        return Promise.allSettled(urlsToCache.map(url => cache.add(url)));
      })
  );
  self.skipWaiting();
});

// Network-first strategy for dynamic updates
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).then(response => {
      // It's a valid response, let's cache it for future offline use
      if (response && (response.status === 200 || response.status === 0) && (response.type === 'basic' || response.type === 'cors' || response.type === 'opaque')) {
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
      }
      return response;
    }).catch(() => {
      // If network fails, fallback to cache
      return caches.match(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
