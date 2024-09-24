import styled from '@emotion/styled';

import { flexCenter, title2 } from '@/styles/common';
import SUBWAY_LINE_PALLETE, { SubwayLineName } from '@/styles/subway';

const SubwayLineIcon = ({ lineName }: { lineName: SubwayLineName }) => {
  const lineColor = SUBWAY_LINE_PALLETE[lineName];

  const excludedSubwayNames = ['인천1호선', '인천2호선'];

  const isNumberSubwayName = lineName.slice(-2) === '호선' && !excludedSubwayNames.includes(lineName);

  return (
    <S.Box color={lineColor} isCircle={isNumberSubwayName}>
      <S.Text>{isNumberSubwayName ? lineName.slice(0, lineName.length - 2) : lineName}</S.Text>
    </S.Box>
  );
};

const S = {
  Box: styled.span<{ color: string; isCircle: boolean }>`
    display: inline-block;

    width: ${({ isCircle }) => isCircle && '3.2rem'};
    height: 3rem;
    padding: ${({ isCircle }) => (isCircle ? '0.4rem 0.4rem 0.6rem 0.4rem' : '0.4rem 1.2rem 0.6rem;')};
    border-radius: 2rem;

    background-color: ${({ color }) => (color ? color : 'black')};

    text-align: center;
  `,
  Text: styled.span`
    width: 100%;
    height: 100%;
    padding-top: 0.3rem;

    ${flexCenter};
    color: ${({ theme }) => theme.palette.white};
    ${title2}
  `,
};

export default SubwayLineIcon;
