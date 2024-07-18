import { Global, ThemeProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';

import router from '@/Router';
import { baseStyle } from '@/styles/global';
import theme from '@/styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={baseStyle} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
