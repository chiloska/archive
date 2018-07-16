const VERSION = 'v8';


log('Installing Serverworker');

self.addEventListener('install', event => {
    event.waitUntil(installServiceWorker());
})


self.addEventListener('activate', () => {
    log('version is activated');
})


self.addEventListener('fetch', event => {
    log('Inside Fetch');
    event.respondWith(showOfflineIfError(event));
})


async function showOfflineIfError(event) {

    let response;

    try {
        log('Calling Network: ' + event.request.url)
        response = await fetch(event.request);
    }
    catch (err) {
        log('Network Request Fail');

        const cache = await caches.open('app-cache');

        response = cache.match("offline.html");
    }

    return response;
}

async function installServiceWorker() {

    log('Service Worker installation Started');

    const request = new Request('offline.html');

    const response = await fetch(request);

    log('Response receive from download offline.html ' + response.status);

    if (response.status !== 200) {
        throw new Error('Could not load offline page!');
    }

    const cache = await caches.open('app-cache');

    cache.put(request, response);

    log('Cached offline page');
}

function log(message) {
    console.log(VERSION, message);
}
