import React from 'react';
import reactDom from 'react-dom/client';
import serviceworker from './src/service-worker';
import App from './src/App';
import './index.css';

const root = reactDom.createRoot(document.getElementById('root'));
root.render(<App />);

serviceworker();
