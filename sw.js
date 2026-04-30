const CACHE = "go6-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/og-go6.jpg",
  "/favicon.ico",
  "/favicon-32.png",
  "/favicon-16.png",
  "/apple-touch-icon.png",
  "/android-chrome-192.png",
  "/android-chrome-512.png",
  "/img/lemans.webp",
  "/img/ProTrackSystem.png",
  "/img/Scaleauto.png",
  "/img/oxigen.jpg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE ? caches.delete(k) : null)))
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request))
  );
});