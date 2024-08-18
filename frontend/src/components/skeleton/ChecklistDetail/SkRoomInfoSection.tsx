import styled from '@emotion/styled';

import { flexColumn, flexRow, Skeleton, title1 } from '@/styles/common';

const SkRoomInfoSection = () => {
  return (
    <>
      <Sk.Container>
        <Sk.GreenWrapper />
        <Sk.GapBox>
          <Sk.Row />
          <Sk.Row />
        </Sk.GapBox>
        <Sk.Row />
        <Sk.Row width={'300px'} />
        <Sk.Row width={'300px'} />
        <Sk.Map />
      </Sk.Container>
    </>
  );
};

export default SkRoomInfoSection;

const Sk = {
  Container: styled.div`
    box-sizing: border-box;
    width: 100%;
    ${flexColumn}
    gap: 16px;
    margin-bottom: 10px;
    padding: 16px;

    background-color: ${({ theme }) => theme.palette.white};
    border-radius: 8px;

    font-size: ${({ theme }) => theme.text.size.medium};
    line-height: 1.5;
    letter-spacing: 0.05rem;
  `,
  MoneyText: styled.div`
    font-size: ${({ theme }) => theme.text.size.medium};
  `,
  GreenWrapper: styled.div`
    width: 100%;
    height: 100px;
    padding: 16px;

    ${Skeleton}
    box-sizing: border-box;
    border-radius: 16px;
  `,
  Row: styled.div<{ width?: string }>`
    ${Skeleton}
    width:${({ width }) => width || '150px'};
    height: 50px;
    ${flexRow}
    gap: 10px;
  `,
  GapBox: styled.div`
    display: flex;
    gap: 30%;

    @media (width <= 440px) {
      gap: 60px;
    }
  `,
  Title: styled.div`
    width: 100%;
    ${title1}
    min-height: 40px;
    word-break: keep-all;
  `,
  Map: styled.div`
    ${Skeleton}
    width: 100%;
    height: 290px;
  `,
};
