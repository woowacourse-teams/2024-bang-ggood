import styled from '@emotion/styled';

import { flexCenter, title4 } from '@/styles/common';
import SUBWAY_LINE_PALLETE, { SubwayLineName } from '@/styles/subway';

const SubwayLineIcon = ({ lineName }: { lineName: SubwayLineName }) => {
  const lineColor = SUBWAY_LINE_PALLETE[lineName];

  const isNumberTypeSubwayName = lineName.slice(-2) === '호선' && lineName.length === 3;

  return (
    <S.Box color={lineColor} isCircle={isNumberTypeSubwayName}>
      <S.Text>{isNumberTypeSubwayName ? lineName.slice(0, lineName.length - 2) : lineName}</S.Text>
    </S.Box>
  );
};

const S = {
  Box: styled.span<{ color: string; isCircle: boolean }>`
    display: inline-block;

    width: ${({ isCircle }) => isCircle && '2rem'};
    height: 2rem;
    padding: ${({ isCircle }) => (isCircle ? '0.3rem' : '0.3rem 0.6rem')};
    border-radius: 2rem;

    background-color: ${({ color, theme }) => (color ? color : theme.palette.grey400)};

    text-align: center;
  `,
  Text: styled.span`
    width: 100%;
    height: 100%;

    ${flexCenter};
    color: ${({ theme }) => theme.palette.white};
    ${title4}
  `,
};

export default SubwayLineIcon;
