import { css } from '@emotion/react';

import { normalize } from '../styles/reset';
import theme from '../styles/theme';

export const baseStyle = css`
  ${normalize}

  body {
    height: 100vh;
    margin: 0 auto;

    background-color: ${theme.palette.grey100};
    max-width: 600px;
    box-sizing: border-box;
    border-right: 1px solid ${theme.palette.grey200};
    border-left: 1px solid ${theme.palette.grey200};
    box-shadow: 0 0 20px ${theme.palette.grey100};
  }
`;
