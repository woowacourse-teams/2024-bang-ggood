import styled from '@emotion/styled';

type DirectionType = 'vertical' | 'horizontal';

interface Props {
  direction?: DirectionType;
  size?: string;
}

const Divider = ({ direction = 'horizontal', size = '100%' }: Props) => {
  return <S.Container $direction={direction} $size={size} />;
};

export default Divider;

const Container = styled.div<{ $direction: DirectionType; $size: string }>`
  width: ${({ $size, $direction }) => $direction === 'horizontal' && $size};
  height: ${({ $size, $direction }) => $direction === 'vertical' && $size};
  border-left: ${({ $direction, theme }) =>
    $direction === 'vertical' ? `1px solid ${theme.palette.grey200}` : 'none'};
  border-bottom: ${({ $direction, theme }) =>
    $direction === 'horizontal' ? `1px solid ${theme.palette.grey200}` : 'none'};
`;

export const S = {
  Container,
};
