import { css } from '@emotion/react';

import { normalize } from '../styles/reset';
import theme from '../styles/theme';

export const baseStyle = css`
  ${normalize}

  body {
    line-height: normal;
    font-family: 'SUITE Variable';
    max-width: 600px;
    min-height: 100vh;
    margin: 0px auto;
    box-sizing: border-box;
    border-left: 1px solid ${theme.palette.grey200};
    border-right: 1px solid ${theme.palette.grey200};
    box-shadow: 0 0 20px ${theme.palette.grey100};

    @supports (-webkit-touch-callout: none) {
      min-height: -webkit-fill-available;
    }
  }
`;
