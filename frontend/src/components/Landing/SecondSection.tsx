import { useRef } from 'react';

import { ArrowDownSmall, mainPageScreen } from '@/assets/assets';
import CS from '@/components/Landing/style';
import { INTERSECTION_CONFIG } from '@/constants/system';
import useIntersection from '@/hooks/useIntersection';

const SecondSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { isIntersecting } = useIntersection(INTERSECTION_CONFIG, ref);

  return (
    <>
      <CS.TextBox>
        <CS.Text>
          방끗은 방 구할 때 기록하는
          <br />
          <CS.Highlight>체크리스트 서비스</CS.Highlight>에요!
        </CS.Text>

        <CS.Text>
          새집을 구하러 다니는 당신이 <br />한 방을 둘러보는 시간은 <CS.Bold>단 10분 ⏰ </CS.Bold>
        </CS.Text>
        <CS.Text>
          <CS.Highlight>방끗</CS.Highlight>은 그 귀중한 시간을
          <br />
          <CS.Bold>효율적으로 쓰도록</CS.Bold>
          <br /> 도와주기 위해 태어났어요.
        </CS.Text>
      </CS.TextBox>
      <CS.EmptyBox height={'2rem'} />
      <CS.Observer ref={ref} />
      <CS.AnimationBox isIntersecting={isIntersecting}>
        <CS.ScreenShot src={mainPageScreen} />
      </CS.AnimationBox>
      <CS.MoveUpDownAnimationBox>
        <ArrowDownSmall aria-label="스크롤로 하단의 정보를 확인할 수 있어요" />
      </CS.MoveUpDownAnimationBox>
    </>
  );
};

export default SecondSection;
