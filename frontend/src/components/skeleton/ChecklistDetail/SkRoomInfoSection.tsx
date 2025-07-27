import styled from '@emotion/styled';

import { flexColumn, flexRow, Skeleton } from '@/styles/common';

const SkRoomInfoSection = () => {
  return (
    <S.Container>
      <S.GreenWrapper />
      <S.GapBox>
        <S.Row />
        <S.Row />
      </S.GapBox>
      <S.Row />
      <S.Row width={'30rem'} />
      <S.Row width={'30rem'} />
      <S.Map />
    </S.Container>
  );
};

export default SkRoomInfoSection;

const S = {
  Container: styled.div`
    box-sizing: border-box;
    width: 100%;
    ${flexColumn}
    gap: 1.6rem;
    margin-bottom: 1rem;
    padding: 1.6rem;

    background-color: ${({ theme }) => theme.color.mono.white};
    border-radius: 0.8rem;
  `,
  GreenWrapper: styled.div`
    width: 100%;
    height: 10rem;
    padding: 1.6rem;

    ${Skeleton}
    box-sizing: border-box;
    border-radius: 1.6rem;
  `,
  Row: styled.div<{ width?: string }>`
    ${Skeleton}
    width:${({ width }) => width || '15rem'};
    height: 5rem;
    ${flexRow}
    gap: 1rem;
  `,
  GapBox: styled.div`
    display: flex;
    gap: 30%;

    @media (width <= 44rem) {
      gap: 6rem;
    }
  `,
  Title: styled.div`
    width: 100%;
    min-height: 4rem;
    word-break: keep-all;
  `,
  Map: styled.div`
    ${Skeleton}
    width: 100%;
    height: 29rem;
  `,
};
