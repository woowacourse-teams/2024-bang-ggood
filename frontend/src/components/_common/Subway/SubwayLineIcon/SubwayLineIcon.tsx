import styled from '@emotion/styled';

import { flexCenter } from '@/styles/common';
import SUBWAY_LINE_PALLETE, { SubwayLineName } from '@/styles/subway';

type Size = 'small' | 'medium';
interface Props {
  lineName: SubwayLineName;
  size?: Size;
}

const sizeMap = { small: '1.4rem', medium: '2rem' };

const SubwayLineIcon = ({ lineName, size = 'medium' }: Props) => {
  const lineColor = SUBWAY_LINE_PALLETE[lineName];

  const isNumberTypeSubwayName = lineName.slice(-2) === '호선' && lineName.length === 3;

  return (
    <S.Box size={size} color={lineColor} isCircle={isNumberTypeSubwayName}>
      <S.Text size={size}>{isNumberTypeSubwayName ? lineName.slice(0, lineName.length - 2) : lineName}</S.Text>
    </S.Box>
  );
};

const S = {
  Box: styled.span<{ color: string; isCircle: boolean; size: Size }>`
    display: inline-block;
    width: ${({ isCircle, size }) => isCircle && sizeMap[size]};
    height: ${({ isCircle, size }) => isCircle && sizeMap[size]};
    padding: ${({ isCircle }) => (isCircle ? '0.3rem' : '0.3rem 0.6rem')};
    border-radius: 2rem;

    background-color: ${({ color, theme }) => (color ? color : theme.palette.grey400)};

    text-align: center;
  `,
  Text: styled.span<{ size: Size }>`
    width: 100%;
    height: 100%;

    ${flexCenter};
    color: ${({ theme }) => theme.palette.white};
    font-weight: ${({ theme }) => theme.text.weight.semiBold};
    font-size: ${({ theme, size }) => (size === 'small' ? theme.text.size.xSmall : theme.text.size.small)};
  `,
};

export default SubwayLineIcon;
