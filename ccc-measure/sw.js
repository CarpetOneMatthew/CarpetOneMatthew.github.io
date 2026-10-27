// The takeoff app moved from /ccc-measure/ to /ridge/ (renamed Ridge, 2026-10-26). Browsers that kept its
// offline copy here keep opening that old build until its worker goes, and they fetch this file when they
// check for an update. So this replaces the old worker: it takes over, sends any open window on to /ridge/,
// and unregisters itself. The cached files stay (same origin as the new app, whose worker tidies them).
// Don't remove it while anyone may still have the old copy.

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    await self.clients.claim();
    for (const c of await self.clients.matchAll({ type: 'window' })) {
      const u = new URL(c.url);
      c.navigate('/ridge/' + u.search + u.hash).catch(() => {});
    }
    await self.registration.unregister();
  })());
});
