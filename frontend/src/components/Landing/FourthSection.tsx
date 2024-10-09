import { useRef } from 'react';

import { customPageScreen } from '@/assets/assets';
import { default as S } from '@/components/Landing/style';
import { INTERSECTION_CONFIG } from '@/constants/system';
import useIntersection from '@/hooks/useIntersection';

const FourthSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersection(INTERSECTION_CONFIG, ref);
  const ref2 = useRef<HTMLDivElement>(null);

  return (
    <S.Container>
      <S.TextBox>
        <S.Text>
          필요한 질문은 <S.Bold>넣고,</S.Bold> <br />
          필요없는 질문은 <S.Bold>빼고!</S.Bold>
        </S.Text>
        <S.EmptyBox height="1rem" mobileHeight="2rem" />
        <S.Text>
          원하는 질문들만 선택해서 나에게 <br />
          <S.Highlight>딱 맞는 체크리스트</S.Highlight>를 만들어 봐요.
        </S.Text>
        <S.EmptyBox height="1rem" mobileHeight="2rem" />
        <S.Observer ref={ref} />
        <S.AnimationBox isIntersecting={isIntersecting}>
          <S.ScreenShot src={customPageScreen} />
        </S.AnimationBox>
        <S.EmptyBox height="2rem" />
        <S.Text>
          방 구하기 초보라 아무것도 모르겠다면,
          <br />
          <S.Highlight>방 구하기 꿀팁이 담긴 아티클</S.Highlight>을
          <br /> 읽으면서 방 구하기 고수가 되어보아요!
          <S.Observer ref={ref2} />
          <S.EmptyBox height="2rem" />
        </S.Text>
      </S.TextBox>
    </S.Container>
  );
};

export default FourthSection;
