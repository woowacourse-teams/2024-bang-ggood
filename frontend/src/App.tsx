import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Toast from '@/components/common/Toast/Toast';
import { baseStyle } from '@/styles/global';
import theme from '@/styles/theme';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={baseStyle} />
        <ReactQueryDevtools initialIsOpen={false} />
        <Toast />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
