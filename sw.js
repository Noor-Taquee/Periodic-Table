const CACHE_NAME = 'periodic table';
const ASSETS = [
  'index.html',
  'style.css',
  'script.js',
  'elementsData.json',
  'src/favicon.ico',
  'src/android-chrome-512x512.png'
];

// Install the service worker and cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Intercept requests to serve from cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});