import { ScrollArrow } from '@/assets/assets';
import CS from '@/components/Landing/style';

const IntroSection = () => {
  return (
    <CS.Container>
      <CS.CenterBox>
        <CS.Title>부동산 체크리스트, 방끗</CS.Title>
        <CS.BigTitle>
          방을 둘러보는 시간은
          <br />단 10분!
        </CS.BigTitle>
      </CS.CenterBox>

      <CS.MoveUpDownAnimationBox>
        <ScrollArrow aria-label="스크롤로 하단의 정보를 확인할 수 있어요" />
      </CS.MoveUpDownAnimationBox>
    </CS.Container>
  );
};

export default IntroSection;
