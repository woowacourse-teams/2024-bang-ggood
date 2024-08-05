import './sentry'; // Sentry initialization should be imported first!

import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import Toast from '@/components/common/Toast/Toast';
import router from '@/router';
import { baseStyle } from '@/styles/global';
import theme from '@/styles/theme';

async function enableMocking() {
  if (process.env.DEV_MODE === 'off') return;
  if (process.env.NODE_ENV !== 'development') {
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
  const queryClient = new QueryClient();
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Global styles={baseStyle} />
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
          <Toast />
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
});
