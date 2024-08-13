import '@/styles/font';
import './index.css';
import './sentry';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/App';

async function enableMocking() {
  if (process.env.DEV_MODE === 'off') {
    return;
  }

  if (process.env.DEV_MODE === 'api') {
    document.cookie = `token=${process.env.COOKIE}`;
    return;
  }

  const { worker } = await import('./mocks/browser');

  await worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
