const CACHE_NAME = 'reactfurniPwa';

const urlCache = [
	'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css',
	'/main.js',
	'/src_components_Home_index_js.js',
	'/favicon.png',
	'/ws',
	'/manifest.json',
	'/assets/icons/favicon192.png',
	'/',
	// '/static/media/circles-bg.d775f2a29fd5b233570fcba404385f39.svg',
];

// install service worker
this.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) => cache.addAll(urlCache)),
	);
});

// fetch cache data
this.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request)
			.then((response) => {
				if (response) {
					return response; // if valid response is found in cache return it
				}
				return fetch(event.request) // fetch from internet
					.then((res) => caches.open(CACHE_NAME)
						.then((cache) => {
							cache.put(event.request.url, res.clone()); // save the response for future
							return res; // return the fetched data
						}));
			}),
	);
});
