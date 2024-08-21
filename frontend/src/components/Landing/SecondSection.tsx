import { useRef } from 'react';

import MainScreenShot from '@/assets/image/checkScreenShot.png';
import S from '@/components/Landing/style';
import { INTERSECTION_CONFIG } from '@/constants/system';
import useIntersection from '@/hooks/useIntersection';

const SecondSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { isIntersecting } = useIntersection(INTERSECTION_CONFIG, ref);

  return (
    <>
      <S.TextBox>
        <S.Text>
          방끗은 방 구할 때 기록하는
          <br />
          <S.Highlight>체크리스트 서비스</S.Highlight>에요!
        </S.Text>
        <S.EmptyBox height={10} />
        <S.Text>
          새집을 구하러 다니는 당신이 <br />한 방을 둘러보는 시간은 <S.Bold>단 10분 ⏰ </S.Bold>
        </S.Text>
        <S.EmptyBox height={10} />
        <S.Text>
          <S.Highlight>방끗</S.Highlight>은 그 귀중한 시간을
          <br />
          <S.Bold>효율적으로 쓰도록</S.Bold>
          <br /> 도와주기 위해 태어났어요.
        </S.Text>
      </S.TextBox>
      <S.Observer ref={ref} />
      <S.AnimationBox isIntersecting={isIntersecting}>
        <img src={MainScreenShot} width="200px" />
      </S.AnimationBox>
    </>
  );
};

export default SecondSection;
