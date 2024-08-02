import { css } from '@emotion/react';

import { normalize } from '../styles/reset';
import theme from '../styles/theme';

export const baseStyle = css`
  @font-face {
    font-family: 'SUIT';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'SUIT';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  ${normalize}

  body {
    font-family: 'SUIT';
    max-width: 600px;
    min-height: 100vh;
    margin: 0px auto;
    box-sizing: border-box;
    border-left: 1px solid ${theme.palette.grey200};
    border-right: 1px solid ${theme.palette.grey200};
    box-shadow: 0 0 20px ${theme.palette.grey100};
  }
`;
