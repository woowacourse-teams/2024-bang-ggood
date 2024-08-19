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
      //TODO: 에러 핸들링 끝나고 retry : 0 삭제 필요
      mutations: { onError: error => showToast(error.message), retry: 0 },
      queries: { throwOnError: true, retry: 0 },
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
