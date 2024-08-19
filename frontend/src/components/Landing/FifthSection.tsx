import styled from '@emotion/styled';

import { LampIcon } from '@/assets/assets';
import TopButton from '@/components/_common/TopButton/TopButton';
import { Bold, Container, Highlight, Text, TextBox } from '@/components/Landing/style';
import { flexCenter } from '@/styles/common';

const FifthSection = () => {
  return (
    <Container>
      <TextBox>
        <S.RelativeBox>
          <Text>
            <Bold>방끗</Bold>과 함께 당신에게 <br />
            <Highlight>딱 맞는 집을 찾는 여정</Highlight>을 <br />
            시작해 볼까요?
          </Text>
          <S.IconBox>
            <LampIcon width={80} />
          </S.IconBox>
          <S.CenterBox>
            <TopButton text={'시작하기!'} />
          </S.CenterBox>
        </S.RelativeBox>
      </TextBox>
    </Container>
  );
};

const S = {
  RelativeBox: styled.div`
    position: relative;
  `,
  IconBox: styled.div`
    position: absolute;
    left: 80px;
  `,
  CenterBox: styled.div`
    margin-top: 50px;
    ${flexCenter}
  `,
};
export default FifthSection;
