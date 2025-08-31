import { useRef } from 'react';

import { articleScreen, ScrollArrow } from '@/assets/assets';
import CS from '@/components/Landing/style';
import { INTERSECTION_CONFIG } from '@/constants/system';
import useIntersection from '@/hooks/useIntersection';

const FourthSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersection(INTERSECTION_CONFIG, ref);
  const ref2 = useRef<HTMLDivElement>(null);

  return (
    <CS.Container>
      <CS.EmptyBox height="10px" />

      <CS.Title>
        방 구하기
        <CS.Highlight>꿀팁</CS.Highlight>을
        <br />
        보기 쉽게 정리했어요
      </CS.Title>

      <img src={articleScreen} width="100%" />

      <CS.MoveUpDownAnimationBox>
        <ScrollArrow aria-label="스크롤로 하단의 정보를 확인할 수 있어요" />
      </CS.MoveUpDownAnimationBox>
    </CS.Container>
  );
};

export default FourthSection;
