
const VERSION = 'v15';


log('Installing Service Worker');


self.addEventListener('install', event => event.waitUntil(installServiceWorker()));

/*

    These are the files that we want to download and install on the background

        '/',
        '/polyfills.bundle.js',
        '/inline.bundle.js',
        '/styles.bundle.js',
        '/vendor.bundle.js',
        '/main.bundle.js',
        '/assets/bundle.css',
        '/assets/angular-pwa-course.png',
        '/assets/main-page-logo-small-hat.png'
*/

async function installServiceWorker() {

    log("Service Worker installation started ");

    const cache = await caches.open(getCacheName());

    return cache.addAll([
        '/',
        '/polyfills.bundle.js',
        '/inline.bundle.js',
        '/styles.bundle.js',
        '/vendor.bundle.js',
        '/main.bundle.js',
        '/assets/bundle.css',
        '/assets/angular-pwa-course.png',
        '/assets/main-page-logo-small-hat.png'
    ])

}

self.addEventListener('activate', () => activeSW());

async function activeSW() {

    log('Service Worker activated');

    const cacheKeys = await caches.keys();

    cacheKeys.forEach(cacheKey => {
        if (cacheKey !== getCacheName()) {
            caches.delete(cacheKey);
        }
    })

    return clients.claim();
}



self.addEventListener('fetch', event => event.respondWith(cacheThenNetwork(event)));


async function cacheThenNetwork(event) {

    const cache = await caches.open(getCacheName());

    const cachedResponse = await cache.match(event.request);

    if (cachedResponse) {
        log('Call From Cache ' + event.request.url)
        return cachedResponse;
    }


    const networkResponse = await fetch(event.request);

    log('Call from Network ' + event.request.url);
    return networkResponse;
}

function getCacheName() {
    return "app-cache" + VERSION;
}





function log(message, ...data) {
    if (data.length > 0) {
        console.log(VERSION, message, data);
    }
    else {
        console.log(VERSION, message);
    }
}

















