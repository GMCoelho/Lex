self.addEventListener('install', (event) => {
  event.waitUntil(

    // Open a cache store called `v1`
    caches.open('v1').then((cache) => {

      // Cache all these files
      return cache.addAll([
        '/',
        '/index.html',
        '/css/Lex.css',
        '/fonts/glyphicons-halflings-regular.svg',
        '/js/Lex.js',
		'/js/Lex_mapa.js',
		'/js/bootstrap.js',
		'/js/booststrap.min.js',
		'/js/npm.js'
      ]);
    })
  );
});
