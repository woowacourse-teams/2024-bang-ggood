import { css } from '@emotion/react';

import { normalize } from '../styles/reset';
import theme from '../styles/theme';

export const baseStyle = css`
  ${normalize}

  html {
    font-size: 62.5%;
  }

  body {
    font-family: 'SUITE Variable', sans-serif;
    line-height: normal;
    letter-spacing: 0.14rem;

    font-size: ${theme.text.size.small};

    max-width: 60rem;
    min-height: 100dvh;

    margin: 0 auto;
    box-sizing: border-box;

    border-left: 0.1rem solid ${theme.palette.grey200};
    border-right: 0.1rem solid ${theme.palette.grey200};
    box-shadow: 0 0 2rem ${theme.palette.grey100};

    @supports (-webkit-touch-callout: none) {
      min-height: -webkit-fill-available;
    }
  }

  input {
    font-family: 'SUITE Variable', sans-serif;
    letter-spacing: 0.14rem;
  }
`;
