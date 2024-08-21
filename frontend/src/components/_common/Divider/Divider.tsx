import { css } from '@emotion/react';
import styled from '@emotion/styled';

import theme from '@/styles/theme';

type DirectionType = 'vertical' | 'horizontal';

interface Props {
  direction?: DirectionType;
  size?: string;
  isBold?: boolean;
}

const Divider = ({ direction = 'horizontal', size = '100%', isBold = false }: Props) => {
  return <S.Container $direction={direction} $size={size} $isBold={isBold} />;
};

export default Divider;

const LINE_STYLE = {
  bold: css`
    border-width: 0.15rem;
  `,
  medium: css`
    border-width: 0.1rem;
  `,
  vertical: css`
    border-left: solid ${theme.palette.grey200};
  `,
  horizontal: css`
    border-bottom: solid ${theme.palette.grey200};
  `,
};

export const S = {
  Container: styled.div<{ $direction: DirectionType; $size: string; $isBold: boolean }>`
    width: ${({ $size, $direction }) => $direction === 'horizontal' && $size};
    height: ${({ $size, $direction }) => $direction === 'vertical' && $size};
    ${({ $direction, $isBold }) => css`
      ${$isBold ? LINE_STYLE.bold : LINE_STYLE.medium};
      ${$direction === 'horizontal' ? LINE_STYLE.horizontal : LINE_STYLE.vertical};
    `}
  `,
};
