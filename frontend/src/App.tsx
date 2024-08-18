import { Global, ThemeProvider } from '@emotion/react';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';

import Toast from '@/components/_common/Toast/Toast';
import useToast from '@/hooks/useToast';
import router from '@/router';
import { baseStyle } from '@/styles/global';
import theme from '@/styles/theme';

const App = () => {
  const { showToast } = useToast({ type: 'negative' });

  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: { retry: 0, onError: error => showToast(error.message) },
      queries: { retry: 0, throwOnError: true },
    },
    queryCache: new QueryCache({
      onError: error => showToast(error.message),
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={baseStyle} />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
        <Toast />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
