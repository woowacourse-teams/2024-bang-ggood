import { LampIcon } from '@/assets/assets';
import TopButton from '@/components/_common/TopButton/TopButton';
import S from '@/components/Landing/style';

//TODO: 여기만 200px
const FifthSection = () => {
  return (
    <S.Container>
      <S.TextBox>
        <S.RelativeBox>
          <S.Text>
            <S.Bold>방끗</S.Bold>과 함께 당신에게 <br />
            <S.Highlight>딱 맞는 집을 찾는 여정</S.Highlight>을 <br />
            시작해 볼까요?
          </S.Text>
          <S.IconBox>
            <LampIcon width={80} />
          </S.IconBox>
          <S.EmptyBox height={'2rem'} />
          <S.CenterBox>
            <TopButton text={'시작하기!'} />
          </S.CenterBox>
        </S.RelativeBox>
      </S.TextBox>
    </S.Container>
  );
};

export default FifthSection;
