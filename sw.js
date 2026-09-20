const C='ma119-v6';
// Versioned static assets: cache-first, effectively immutable between SW versions
const ASSETS=['./','./index.html','./manifest.json','./icon.svg',
  './css/styles.css','./js/store.js','./js/data.js','./js/app.js'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=e.request.url;
  const isDoc=e.request.destination==='document'||/\/index\.html$/.test(url)||url.endsWith('/');
  if(isDoc){
    // HTML: network-first so every deploy shows up on a normal refresh
    e.respondWith(
      fetch(e.request).then(resp=>{
        const cp=resp.clone();
        caches.open(C).then(c=>c.put('./index.html',cp));
        return resp;
      }).catch(()=>caches.match('./index.html'))
    );
  }else{
    // css/js/manifest/icon: cache-first (bumped together with C on every deploy)
    e.respondWith(
      caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(resp=>{
        if(!resp.ok)return resp;
        const cp=resp.clone();
        caches.open(C).then(c=>c.put(e.request,cp));
        return resp;
      }))
    );
  }
});
