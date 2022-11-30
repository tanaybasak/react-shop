import React from 'react';
import reactDom from 'react-dom/client';
import App from './src/App';
import './index.css';
import serviceworker from './src/service-worker';

const root = reactDom.createRoot(document.getElementById('root'));
root.render(<App />);

serviceworker();
