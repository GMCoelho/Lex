importScripts('js/npm.js');

var CACHE_VERSION = 'app-v1';
var CACHE_FILES = [
        '/index.html'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(CACHE_FILES);
            })
    );
});

self.addEventListener('activate', function(event){
    console.log(event);
});

self.addEventListener('fetch', function(event){
  console.log(event.request.url);
  // return something for each interception
});


