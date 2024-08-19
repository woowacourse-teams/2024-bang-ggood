import styled from '@emotion/styled';
import { useRef } from 'react';

import { Highlight, ImageBox } from '@/components/Landing/style';
import { INTERSECTION_CONFIG } from '@/constants/system';
import useIntersection from '@/hooks/useIntersection';
import { flexColumn } from '@/styles/common';

const SecondSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { isIntersecting } = useIntersection(INTERSECTION_CONFIG, ref);

  return (
    <S.Container>
      <S.TextBox>
        <S.Text>
          방끗은 방 구할 때 기록하는
          <br />
          <Highlight>체크리스트 서비스</Highlight>에요!
        </S.Text>
        <S.Text>
          새집을 구하러 다니는 당신이 <br />한 방을 둘러보는 시간은 <S.Bold>단 10분 ⏰ </S.Bold>
        </S.Text>
        <S.Text>
          <Highlight>방끗</Highlight>은 그 귀중한 시간을
          <br />
          <S.Bold>효율적으로 쓰도록</S.Bold>
          <br /> 도와주기 위해 태어났어요.
        </S.Text>
      </S.TextBox>
      <S.Observer ref={ref} />
      <ImageBox isIntersecting={isIntersecting}>
        <img src="/image/mainScreenShot.png" width="200px" />
      </ImageBox>
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
    height: 20px;
  `,
  Text: styled.div`
    line-height: 1.5;
    font-size: ${({ theme }) => theme.text.size.medium};
  `,
  Bold: styled.span`
    font-weight: ${({ theme }) => theme.text.weight.semiBold};
  `,
};
export default SecondSection;
