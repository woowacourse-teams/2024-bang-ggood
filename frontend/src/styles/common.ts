import { css } from '@emotion/react';

import theme from '@/styles/theme';

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flexRow = css`
  display: flex;
  flex-direction: row;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const flexSpaceBetween = css`
  display: flex;
  justify-content: space-between;
`;

/** text */
export const title1 = css`
  font-size: ${theme.text.size.xLarge};
  font-weight: ${theme.text.weight.bold};
`;

export const title2 = css`
  font-size: ${theme.text.size.large};
  font-weight: ${theme.text.weight.bold};
`;

export const title3 = css`
  font-size: ${theme.text.size.medium};
  font-weight: ${theme.text.weight.bold};
`;

export const title4 = css`
  font-size: ${theme.text.size.small};
  font-weight: ${theme.text.weight.semiBold};
`;

/* style */
export const boxShadow = css`
  box-shadow: 0 4px 8px rgb(0 0 0 / 5%);
`;
