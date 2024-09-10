import { Global, ThemeProvider } from '@emotion/react';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';

import Toast from '@/components/_common/Toast/Toast';
import useToast from '@/hooks/useToast';
import router from '@/routers/router';
import { baseStyle } from '@/styles/global';
import theme from '@/styles/theme';

const App = () => {
  const { showToast } = useToast();

  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: { onError: error => showToast(error.message) },
      queries: { throwOnError: true },
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
