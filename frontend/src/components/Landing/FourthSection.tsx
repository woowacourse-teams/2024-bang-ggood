import { useRef } from 'react';

import { customPageScreen } from '@/assets/assets';
import S from '@/components/Landing/style';
import { INTERSECTION_CONFIG } from '@/constants/system';
import useIntersection from '@/hooks/useIntersection';

const FourthSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersection(INTERSECTION_CONFIG, ref);

  return (
    <S.Container>
      <S.TextBox>
        <S.Text>
          필요한 질문은 <S.Bold>넣고,</S.Bold> <br />
          필요없는 질문은 <S.Bold>빼고!</S.Bold>
        </S.Text>
        <S.EmptyBox height={'1rem'} />
        <S.Text>
          원하는 질문들만 선택해서 나에게 <br />
          <S.Highlight>딱 맞는 체크리스트</S.Highlight>를 만들어 봐요.
        </S.Text>
        <S.EmptyBox height={'1rem'} />
        <S.Observer ref={ref} />
        <S.AnimationBox isIntersecting={isIntersecting}>
          <S.ScreenShot src={customPageScreen} />
        </S.AnimationBox>
      </S.TextBox>
    </S.Container>
  );
};

export default FourthSection;
