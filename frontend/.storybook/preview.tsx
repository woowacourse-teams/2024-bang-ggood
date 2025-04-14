import { css, Global, ThemeProvider } from '@emotion/react';
import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { withRouter } from 'storybook-addon-remix-react-router';
import { normalize } from '../src/styles/reset';
import theme from '../src/styles/theme';

const queryClient = new QueryClient({
  defaultOptions: {},
});

const decorator = Story => (
  <QueryClientProvider client={queryClient}>
    <Global
      styles={css`
        ${normalize}
        html {
          font-size: 62.5%;
        }
      `}
    />
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  </QueryClientProvider>
);

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'gray',
      values: [
        { name: 'gray', value: '#f1f1f1' },
        { name: 'dark', value: '#333' },
        { name: 'white', value: '#ffffff' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withRouter, decorator],
};

export default preview;
