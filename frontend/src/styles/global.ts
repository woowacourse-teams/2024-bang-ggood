import { css } from '@emotion/react';

import { normalize } from '../styles/reset';
import theme from '../styles/theme';

export const baseStyle = css`
  ${normalize}

  body {
    max-width: 600px;
    height: 100vh;
    margin: 0px auto;
    outline-offset: -1px;
    box-shadow: 0 0 20px ${theme.palette.grey100};
  }
`;
