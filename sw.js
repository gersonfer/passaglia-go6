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

// instala e faz cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
});

// limpa cache antigo
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => (key !== CACHE ? caches.delete(key) : null))
      )
    )
  );
});

// responde com cache primeiro
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});