import { css } from '@emotion/react';

import { normalize } from '../styles/reset';
import theme from '../styles/theme';

export const baseStyle = css`
  ${normalize}

  body {
    line-height: normal;
    font-family: 'SUITE Variable';
    font-size: 62.5%;

    max-width: 60rem;
    min-height: 100vh;

    margin: 0 auto;
    box-sizing: border-box;

    border-left: 0.1rem solid ${theme.palette.grey200};
    border-right: 0.1rem solid ${theme.palette.grey200};
    box-shadow: 0 0 2rem ${theme.palette.grey100};

    @supports (-webkit-touch-callout: none) {
      min-height: -webkit-fill-available;
    }
  }
`;
