import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';

import ToastContainer from '@/components/_common/Toast/ToastContainer';
import useToast from '@/hooks/useToast';
import router from '@/routers/router';
import { baseStyle } from '@/styles/global';
import theme from '@/styles/theme';

export const queryClient = new QueryClient({});
const App = () => {
  queryClient.setDefaultOptions({
    mutations: { onError: error => showToast({ message: error.message, type: 'error' }) },
    queries: { throwOnError: true },
  });
  const { showToast } = useToast();

  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <Global styles={baseStyle} />
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
};

export default App;
