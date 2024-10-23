import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';

import ToastContainer from '@/components/_common/Toast/ToastContainer';
import useToast from '@/hooks/useToast';
import router from '@/routers/router';
import AmplitudeInitializer from '@/service/amplitude/AmplitudeInitializer';
import { baseStyle } from '@/styles/global';
import theme from '@/styles/theme';

const App = () => {
  const { showToast } = useToast();

  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: { onError: error => showToast({ message: error.message, type: 'error' }) },
      queries: { throwOnError: true },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        <AmplitudeInitializer>
          <ThemeProvider theme={theme}>
            <ToastContainer />
            <Global styles={baseStyle} />
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </AmplitudeInitializer>
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
};

export default App;
