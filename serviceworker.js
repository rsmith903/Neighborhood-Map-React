var staticCacheName = 'neighborhood-map-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        'Map.js',
        'Places.js',
        'App.js',
        'index.js',
        'Header.js',
        'Sidebar.js',
        'Yelp.js',
        'Yelp_trademark_RGB_outline.png',
        'YelpAPI.php',
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('neighborhood-map-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', message => {
  if(message.data === 'skip'){
    this.skipWaiting();
  }
});
