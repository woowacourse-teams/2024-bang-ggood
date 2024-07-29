import { Global, ThemeProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';

import { ToastProvider } from '@/components/common/Toast/ToastContext';
import router from '@/Router';
import { baseStyle } from '@/styles/global';
import theme from '@/styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <Global styles={baseStyle} />
        <RouterProvider router={router} />
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
