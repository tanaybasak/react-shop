/* eslint-disable no-promise-executor-return */
// import { lazy } from 'react';

// function promiseExecuter(delay) {
// 	return new Promise((resolve) => setTimeout(resolve, delay));
// }

// function lazyDelayed(path, delay = 300) {
// 	return lazy(async () => Promise.all([
// 		await import(path),
// 		await promiseExecuter(delay),
// 	])
// 		.then(([moduleExports]) => moduleExports));
// }

// export default lazyDelayed;
