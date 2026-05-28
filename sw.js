// ═══════════════════════════════════════════════════════════
// SERVICE WORKER — Merdi & Bénédicte Fat Loss Apps
// Compatible GitHub Pages
// ═══════════════════════════════════════════════════════════

const CACHE_NAME = 'fatLoss-v2';
const STATIC_ASSETS = [
  './merdi_fat_loss_v3_responsive.html',
  './benedicte_fat_loss_v3_responsive.html',
  './icon_merdi_192.png',
  './icon_merdi_512.png',
  './icon_benedicte_192.png',
  './icon_benedicte_512.png',
  './manifest_merdi.json',
  './manifest_benedicte.json'
];

// Installation
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

// Activation
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch : ne pas intercepter Firestore ni Google APIs
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Laisser passer toutes les requêtes réseau externes
  if (url.includes('firestore.googleapis.com') ||
      url.includes('googleapis.com') ||
      url.includes('fonts.gstatic.com') ||
      url.includes('fonts.googleapis.com') ||
      url.includes('firebase') ||
      !url.startsWith(self.location.origin)) {
    return;
  }

  // Icônes et manifests : Cache First
  if (url.match(/\.(png|ico|json)$/)) {
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request)
          .then(res => {
            if (res && res.status === 200) {
              caches.open(CACHE_NAME).then(c => c.put(event.request, res.clone()));
            }
            return res;
          })
        )
    );
    return;
  }

  // HTML : Network First avec fallback cache
  if (event.request.mode === 'navigate' || url.match(/\.html$/)) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          if (res && res.status === 200) {
            caches.open(CACHE_NAME).then(c => c.put(event.request, res.clone()));
          }
          return res;
        })
        .catch(() => caches.match(event.request)
          .then(cached => cached || new Response(
            '<html><body style="font-family:sans-serif;text-align:center;padding:2rem;background:#050a14;color:#fff"><h2>📵 Hors ligne</h2><p>Reconnecte-toi pour synchroniser tes données.</p></body></html>',
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          ))
        )
    );
    return;
  }
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
