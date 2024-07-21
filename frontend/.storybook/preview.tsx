import { Global, ThemeProvider } from '@emotion/react';
import type { Preview } from '@storybook/react';
import React from 'react';
import theme from '../src/styles/theme';
import { baseStyle } from './global';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

export const decorators = [
  Story => (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={baseStyle} />
        <Story />
      </ThemeProvider>
    </>
  ),
];
