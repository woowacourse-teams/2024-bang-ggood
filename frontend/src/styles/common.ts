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
  box-shadow: 0 0.4rem 0.4rem rgb(0 0 0 / 5%);
`;

export const boxShadowSpread = css`
  box-shadow: 0 0 1.2rem 0.5rem rgb(0 0 0 / 5%);
`;

export const boxSpread = css`
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

/* box shadow */
export const boxEffect = {
  1: css`
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.08);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.8);
  `,
  2: css`
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.8);
  `,
  3: css`
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
  `,
  4: css`
    box-shadow: 0 16px 20px rgba(0, 0, 0, 0.12);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
  `,
};

/* skeleton */
export const Skeleton = `
  background: linear-gradient(-90deg, #E2E2E2, #f0f0f0,  #E2E2E2, #f0f0f0);
  background-size: 400%;
  animation: skeleton-animation 5s infinite ease-out;
  border-radius: 0.8rem;

  @keyframes skeleton-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export const omitText = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;
