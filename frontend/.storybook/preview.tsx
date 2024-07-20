import { Global, ThemeProvider } from '@emotion/react';
import type { Preview } from '@storybook/react';
import React from 'react';
import { withRouter } from 'storybook-addon-remix-react-router';
import theme from '../src/styles/theme';
import { baseStyle } from './global';
const decorator = Story => (
  <>
    <Global styles={baseStyle} />
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  </>
);

const preview: Preview = {
  parameters: {
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
