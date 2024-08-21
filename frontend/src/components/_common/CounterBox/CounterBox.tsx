import styled from '@emotion/styled';

import { flexRow, title3 } from '@/styles/common';
import theme from '@/styles/theme';

interface Props {
  color?: string;
  hasBracket?: boolean;
  currentCount: number;
  totalCount: number;
  gap?: number;
}

const CounterBox = ({
  color = theme.palette.grey500,
  hasBracket = false,
  currentCount,
  gap = 0.03,
  totalCount,
}: Props) => {
  return (
    <S.Container $color={color} $gap={gap}>
      {hasBracket && <span>(</span>}
      <span>{currentCount}</span>
      <span>/</span>
      <span>{totalCount}</span>
      {hasBracket && <span>)</span>}
    </S.Container>
  );
};

const S = {
  Container: styled.div<{ $color: string; $gap: number }>`
    ${flexRow}
    color: ${({ $color }) => $color};
    gap: ${({ $gap }) => $gap}rem;
    ${title3}
  `,
};

export default CounterBox;
