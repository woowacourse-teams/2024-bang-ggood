import { Global, ThemeProvider } from '@emotion/react';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';

import ToastContainer from '@/components/_common/Toast/ToastContainer';
import useToast from '@/hooks/useToast';
import router from '@/routers/router';
import { baseStyle } from '@/styles/global';
import theme from '@/styles/theme';

const App = () => {
  const { showToast } = useToast();

  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: { onError: error => showToast({ message: error.message }) },
      queries: { throwOnError: true },
    },
    queryCache: new QueryCache({
      // get 일때 return => fallback
      onError: error => showToast({ message: error.message }),
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <Global styles={baseStyle} />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
