import React from 'react';
import reactDom from 'react-dom/client';
import App from './src/App';
import './index.css';
import * as serviceWorkerRegistration from './src/serviceWorkerRegistration';

const root = reactDom.createRoot(document.getElementById('root'));
root.render(<App />);

serviceWorkerRegistration.register();
