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
  font-weight: ${theme.text.weight.bold};
  font-size: ${theme.text.size.xLarge};
`;

export const title2 = css`
  font-weight: ${theme.text.weight.bold};
  font-size: ${theme.text.size.large};
`;

export const title3 = css`
  font-weight: ${theme.text.weight.bold};
  font-size: ${theme.text.size.medium};
`;

export const title4 = css`
  font-weight: ${theme.text.weight.semiBold};
  font-size: ${theme.text.size.small};
`;

/* style */
export const boxShadow = css`
  box-shadow: 0 4px 4px rgb(0 0 0 / 5%);
`;

export const boxShadowSpread = css`
  box-shadow: 0 0 12px 5px rgb(0 0 0 / 5%);
`;
