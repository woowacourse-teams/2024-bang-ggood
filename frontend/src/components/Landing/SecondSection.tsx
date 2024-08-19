import styled from '@emotion/styled';
import { useRef } from 'react';

import useIntersection from '@/hooks/useIntersection';
import { fadeIn } from '@/styles/animation';
import { flexCenter, flexColumn } from '@/styles/common';

const SecondSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  const infiniteScrollConfig = { threshold: 0.25, rootMargin: '50px' };
  const { isIntersecting } = useIntersection(infiniteScrollConfig, ref);

  return (
    <S.Container>
      <S.TextBox>
        <S.Text>
          방끗은 방 구할 때 기록하는
          <br />
          <S.Bold>체크리스트 서비스</S.Bold>에요!
        </S.Text>
        <S.Text>
          새집을 구하러 다니는 당신이 <br />한 방을 둘러보는 시간은 <S.Bold>단 10분!</S.Bold>
        </S.Text>
        <S.Text>
          방끗은 그 귀중한 시간을
          <br />
          <S.Bold>효율적으로 쓰도록</S.Bold>
          <br /> 도와주기 위해 태어났어요.
        </S.Text>
      </S.TextBox>
      <S.Observer ref={ref} />
      <S.ImageBox isIntersecting={isIntersecting}>
        <img src="/image/mainScreenShot.png" width="200px" />
      </S.ImageBox>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    ${flexColumn}
  `,
  TextBox: styled.div`
    ${flexColumn};
    width: 100%;
    gap: 20px;
    justify-content: center;
    margin-top: 30px;
    text-align: center;
  `,
  Observer: styled.div`
    height: 10px;
  `,
  Text: styled.div`
    line-height: 1.5;
    font-size: ${({ theme }) => theme.text.size.medium};
  `,
  Highlight: styled.span`
    width: fit-content;
    padding: 6px;
    background-color: ${({ theme }) => theme.palette.yellow500};
  `,
  Bold: styled.span`
    font-weight: ${({ theme }) => theme.text.weight.semiBold};
  `,
  ImageBox: styled.div<{ isIntersecting: boolean }>`
    width: 100%;
    ${flexCenter};
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.5s ease-out,
      transform 0.5s ease-out;

    ${({ isIntersecting }) =>
      isIntersecting &&
      `
        opacity: 1;
        transform: translateY(0);
        animation: ${fadeIn} 0.5s ease-out forwards;
      `}
  `,
};
export default SecondSection;
