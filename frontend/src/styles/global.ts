import { css } from '@emotion/react';

import { normalize } from '../styles/reset';
import theme from '../styles/theme';

export const baseStyle = css`
  ${normalize}

  html {
    font-size: 62.5%;
    font-family: 'WantedSansStdVariable', sans-serif;
  }

  body {
    line-height: normal;
    letter-spacing: 0.14rem;

    font-size: ${theme.text.size.small};

    @supports (-webkit-touch-callout: none) {
      min-height: -webkit-fill-available;
    }
  }

  input {
    font-family: 'WantedSansStdVariable', sans-serif;
    letter-spacing: 0.14rem;
  }

  div {
    box-sizing: border-box;
  }
`;
