// MoodFlip Service Worker - Always Network-First (Zero Stale Cache)
const CACHE_NAME = 'moodflip-v2-live';

self.addEventListener('install', (event) => {
  // Force active immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Purge all old caches (including moodflip-v1) immediately
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          return caches.delete(key);
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Always Network-First: Always fetch the latest live updates from Vercel
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        return networkResponse;
      })
      .catch(() => {
        // Fallback to cache ONLY if user is completely offline without internet
        return caches.match(event.request);
      })
  );
});

// Push Notification Listener
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'MoodFlip Reminder', body: 'Time for your 60-second mindset shift! 💜' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [100, 50, 100],
    })
  );
});
