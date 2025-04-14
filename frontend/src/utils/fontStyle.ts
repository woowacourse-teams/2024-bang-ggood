import { css } from '@emotion/react';

export const fontStyle = ({ size, lineHeight, weight }: { size: string; lineHeight: string; weight: number }) => css`
  font-size: ${size};
  line-height: ${lineHeight};
  font-weight: ${weight};
`;
