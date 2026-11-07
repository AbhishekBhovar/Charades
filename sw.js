// Dumb Charades recovery service worker. Versioned to replace legacy 186-film shell.
const CACHE = 'dc-v39-restored-1939';
const CORE = ['./index.html','./movies.csv'];
const OPTIONAL = ['./marquee.webp','./admit-one.webp','./manifest.webmanifest','./icon.png','./apple-touch-icon.png','./movies.json'];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache=await caches.open(CACHE);
    await Promise.all(CORE.map(async url => {
      try { const res=await fetch(url,{cache:'reload'}); if(res.ok) await cache.put(url,res); } catch(_) {}
    }));
    await Promise.all(OPTIONAL.map(async url => {
      try { const res=await fetch(url,{cache:'reload'}); if(res.ok) await cache.put(url,res); } catch(_) {}
    }));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE && (k.startsWith('dc-') || k.startsWith('charades'))).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  if(event.request.method!=='GET') return;
  const request=event.request;
  if(request.mode==='navigate' || request.destination==='document') {
    event.respondWith((async()=>{
      try { const fresh=await fetch(request,{cache:'no-store'}); if(fresh.ok) {
          const cache=await caches.open(CACHE); await cache.put('./index.html',fresh.clone()); }
        return fresh;
      } catch(_) { return (await caches.match('./index.html')) || Response.error(); }
    })());return;
  }
  event.respondWith((async()=>{
    try { const fresh=await fetch(request,{cache:'no-store'}); if(fresh.ok) {
        const cache=await caches.open(CACHE); await cache.put(request,fresh.clone()); }
      return fresh;
    } catch(_) {return (await caches.match(request)) || Response.error();}
  })());
});
