import { useRef } from 'react';

import { customPageScreen } from '@/assets/assets';
import CS from '@/components/Landing/style';
import { INTERSECTION_CONFIG } from '@/constants/system';
import useIntersection from '@/hooks/useIntersection';

const FourthSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersection(INTERSECTION_CONFIG, ref);
  const ref2 = useRef<HTMLDivElement>(null);

  return (
    <CS.Container>
      <CS.TextBox>
        <CS.Text>
          필요한 질문은 <CS.Bold>넣고,</CS.Bold> <br />
          필요없는 질문은 <CS.Bold>빼고!</CS.Bold>
        </CS.Text>
        <CS.EmptyBox height="1rem" mobileHeight="2rem" />
        <CS.Text>
          원하는 질문들만 선택해서 나에게 <br />
          <CS.Highlight>딱 맞는 체크리스트</CS.Highlight>를 만들어 봐요.
        </CS.Text>
        <CS.EmptyBox height="1rem" mobileHeight="2rem" />
        <CS.Observer ref={ref} />
        <CS.AnimationBox isIntersecting={isIntersecting}>
          <CS.ScreenShot src={customPageScreen} />
        </CS.AnimationBox>
        <CS.EmptyBox height="2rem" />
        <CS.Text>
          방 구하기 초보라 아무것도 모르겠다면,
          <br />
          <CS.Highlight>방 구하기 꿀팁이 담긴 아티클</CS.Highlight>을
          <br /> 읽으면서 방 구하기 고수가 되어보아요!
          <CS.Observer ref={ref2} />
          <CS.EmptyBox height="2rem" />
        </CS.Text>
      </CS.TextBox>
    </CS.Container>
  );
};

export default FourthSection;
