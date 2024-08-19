import styled from '@emotion/styled';
import { useRef } from 'react';

import { LampIcon, PencilIcon } from '@/assets/assets';
import { Bold, Container, Highlight, ImageBox, Text, TextBox } from '@/components/Landing/style';
import useIntersection from '@/hooks/useIntersection';

const FourthSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  const infiniteScrollConfig = { threshold: 0.15, rootMargin: '50px' };
  const { isIntersecting } = useIntersection(infiniteScrollConfig, ref);

  return (
    <Container>
      <TextBox>
        <Text>
          필요한 질문은 <Bold>넣고,</Bold> <br />
          필요없는 질문은 <Bold>빼고!</Bold>
        </Text>
        <Text>
          원하는 질문들만 선택해서 나에게 <br />
          <Highlight>딱 맞는 체크리스트</Highlight>를 만들어 봐요.
        </Text>
        <S.Observer ref={ref} />
        <ImageBox isIntersecting={isIntersecting}>
          <img src="/image/mainScreenShot.png" width="200px" />
        </ImageBox>
        <S.PencilIconBox>
          <PencilIcon width={100} height={120} />
        </S.PencilIconBox>
        <Text margin={40}>
          방 구하기 초보라 아무것도 모르겠다면,
          <br />
          <Highlight> 집 구하기 꿀팁이 담긴 아티클(article)</Highlight>을
          <br /> 읽으면서 방 구하기 고수가 되어보아요!
          <S.LampIconBox>
            <LampIcon width={100} />
          </S.LampIconBox>
        </Text>
      </TextBox>
    </Container>
  );
};

export default FourthSection;

const S = {
  Observer: styled.div`
    height: 20px;
  `,
  PencilIconBox: styled.div`
    position: absolute;
    left: 30px;
  `,
  LampIconBox: styled.div`
    margin-top: 20px;
  `,
};
