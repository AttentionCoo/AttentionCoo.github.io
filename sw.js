const CACHE_NAME = "attentioncoo-v3-0";
const CORE_ASSETS = [
  "/",
  "/work/",
  "/notes/",
  "/research/",
  "/about/",
  "/notes/why-auditable-agents-matter.html",
  "/notes/designing-a-clinical-reasoning-loop.html",
  "/notes/what-ft-transformer-taught-me.html",
  "/work/stroke-multi-agent-cdss.html",
  "/work/learning-characterizing-mas.html",
  "/work/titanic-ft-transformer.html",
  "/css/site.css",
  "/js/site.js",
  "/js/site-data.js",
  "/js/activity-data.js",
  "/manifest.webmanifest",
  "/feed.xml",
  "/AttentionCoo.vcf",
  "/404.html",
  "/img/avatar.jpg",
  "/img/icon-192.png",
  "/img/icon-512.png",
  "/img/og-home.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).catch(() => undefined));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== location.origin) return;
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/")))
    );
    return;
  }
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
