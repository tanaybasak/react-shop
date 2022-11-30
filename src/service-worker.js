import { Workbox } from 'workbox-window';

function serviceworker() {
	if (process.env.NODE_ENV !== 'production') {
		return;
	}

	if ('serviceWorker' in navigator) {
		const wb = new Workbox('sw.js');

		wb.addEventListener('installed', (e) => {
			if (!e.isUpdate) {
				console.log('Service worker activated for the first time!');

				// If your service worker is configured to precache assets, those
				// assets should all be available now.
			}
		});

		wb.register();
	}
}

export default serviceworker;
