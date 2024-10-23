import { css, Global, ThemeProvider } from '@emotion/react';
import type { Preview } from '@storybook/react';
import React from 'react';
import { withRouter } from 'storybook-addon-remix-react-router';
import { normalize } from '../src/styles/reset';
import theme from '../src/styles/theme';

const decorator = Story => (
  <>
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
