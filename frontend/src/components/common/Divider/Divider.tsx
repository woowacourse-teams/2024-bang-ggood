import styled from '@emotion/styled';

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

const Container = styled.div<{ $direction: DirectionType; $size: string; $isBold: boolean }>`
  width: ${({ $size, $direction }) => $direction === 'horizontal' && $size};
  height: ${({ $size, $direction }) => $direction === 'vertical' && $size};
  border-left: ${({ $direction, theme, $isBold }) =>
    $direction === 'vertical' && !$isBold
      ? `1px solid ${theme.palette.grey200}`
      : $direction === 'vertical' && $isBold
        ? `1.5px solid ${theme.palette.grey200}`
        : 'none'};
  border-bottom: ${({ $direction, theme, $isBold }) =>
    $direction === 'horizontal' && !$isBold
      ? `1px solid ${theme.palette.grey200}`
      : $direction === 'horizontal' && $isBold
        ? `1.5px solid ${theme.palette.grey200}`
        : 'none'};
`;

export const S = {
  Container,
};
