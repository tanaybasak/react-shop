import { clientsClaim, skipWaiting } from 'workbox-core';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

// const CACHE_NAME = 'reactfurniPwa';

// const urlCache = [
// 	'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css',
// 	'/main.js',
// 	'/src_components_Home_index_js.js',
// 	'/favicon.png',
// 	'/ws',
// 	'/256.js',
// 	'/manifest.json',
// 	'/assets/icons/favicon192.png',
// 	'/',
// 	'/static/media/circles-bg.d775f2a29fd5b233570fcba404385f39.svg',
// ];

clientsClaim();

skipWaiting();
cleanupOutdatedCaches();
// eslint-disable-next-line no-underscore-dangle, no-restricted-globals
precacheAndRoute(self.__WB_MANIFEST || []);
