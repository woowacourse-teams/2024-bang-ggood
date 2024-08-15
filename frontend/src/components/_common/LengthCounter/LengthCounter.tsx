import styled from '@emotion/styled';

import { title3 } from '@/styles/common';
import theme from '@/styles/theme';

interface Props {
  color?: string;
  hasBracket?: boolean;
  currentCount: number;
  totalCount: number;
  gap?: number;
}

const LengthCounter = ({
  color = theme.palette.grey500,
  hasBracket = false,
  currentCount,
  gap = 3,
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

const Container = styled.div<{ $color: string; $gap: number }>`
  display: flex;

  color: ${({ $color }) => $color};
  gap: ${({ $gap }) => $gap}px;
  ${title3}
`;

const S = {
  Container,
};

export default LengthCounter;
