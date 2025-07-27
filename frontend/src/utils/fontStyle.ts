import { css } from '@emotion/react';

export const fontStyle = ({
  size,
  lineHeight,
  weight,
  letterSpacing,
}: {
  size: string;
  lineHeight: string;
  weight: number;
  letterSpacing: string;
}) => css`
  font-size: ${size};
  line-height: ${lineHeight};
  font-weight: ${weight};
  letter-spacing: ${letterSpacing};
`;
