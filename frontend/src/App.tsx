import { css, Global, ThemeProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';

import router from '@/Router';
import theme from '@/styles/theme';

const baseStyle = css`
  body {
    width: 600px;
    height: 100vh;
    margin: auto;
    border-right: 1px solid ${theme.palette.grey200};
    border-left: 1px solid ${theme.palette.grey200};
    box-shadow: 0 0 20px ${theme.palette.grey100};
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={baseStyle} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
