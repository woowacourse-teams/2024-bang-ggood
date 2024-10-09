import { LampIcon } from '@/assets/assets';
import TopButton from '@/components/_common/TopButton/TopButton';
import CS from '@/components/Landing/style';

//TODO: 여기만 200px
const FifthSection = () => {
  return (
    <CS.Container>
      <CS.TextBox>
        <CS.RelativeBox>
          <CS.Text>
            <CS.Bold>방끗</CS.Bold>과 함께 당신에게 <br />
            <CS.Highlight>딱 맞는 집을 찾는 여정</CS.Highlight>을 <br />
            시작해 볼까요?
          </CS.Text>
          <CS.IconBox>
            <LampIcon width={80} />
          </CS.IconBox>
          <CS.EmptyBox height="2rem" />
          <CS.CenterBox>
            <TopButton text={'시작하기!'} />
          </CS.CenterBox>
        </CS.RelativeBox>
      </CS.TextBox>
    </CS.Container>
  );
};

export default FifthSection;
