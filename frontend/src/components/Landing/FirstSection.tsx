import { ArrowDownSmall, BangBangIcon, BangGgoodTextIcon, KakaoLogo, SmallCheck } from '@/assets/assets';
import S from '@/components/Landing/style';

const FirstSection = ({ handleLogin }: { handleLogin: () => void }) => {
  return (
    <>
      <S.LogoBox>
        <BangBangIcon width="350" height="130" />
        <S.TextWrapper>
          <S.SubtitleText>방 구하기</S.SubtitleText>
          <S.SubtitleText>이거 하나로 끝!</S.SubtitleText>
          <S.CheckIconBox>
            <SmallCheck />
          </S.CheckIconBox>
        </S.TextWrapper>
        <BangGgoodTextIcon width={220} height={50} />
      </S.LogoBox>
      <S.ButtonWrapper>
        <S.KakaoLoginButton onClick={handleLogin}>
          <KakaoLogo />
          <S.Text>카카오로 로그인</S.Text>
        </S.KakaoLoginButton>
      </S.ButtonWrapper>
      <S.MoreBox>
        <S.SubText>방끗을 소개할게요!</S.SubText>
        <S.MoveUpDownAnimationBox>
          <ArrowDownSmall />
        </S.MoveUpDownAnimationBox>
      </S.MoreBox>
    </>
  );
};

export default FirstSection;

// const S = {
//   LogoBox: styled.div`
//     width: 100%;
//     align-items: center;
//     height: 370px;
//     padding-top: 80px;
//     gap: 40px;
//     ${flexColumn}
//   `,
//   CheckIconBox: styled.div`
//     position: absolute;
//     top: 22px;
//     right: 77px;
//   `,
//   TextWrapper: styled.div`
//     display: flex;
//     position: relative;
//     width: 280px;

//     font-size: 18px;
//     line-height: 1.4;
//     flex-direction: column;
//     align-items: center;
//     justify-content: left;
//     gap: 10px;
//   `,
//   ButtonWrapper: styled.div`
//     ${flexCenter}
//     ${flexColumn}
//     gap: 10px;
//     width: 100%;
//     margin-top: 20px;
//   `,
//   SubText: styled.div`
//     font-size: ${({ theme }) => theme.text.size.small};
//   `,
//   KakaoLoginButton: styled.div`
//     width: 300px;
//     height: 50px;
//     ${flexRow}
//     justify-content: space-evenly;
//     align-items: center;
//     border-radius: 8px;

//     background-color: ${({ theme }) => theme.palette.kakao};

//     font-size: ${({ theme }) => theme.text.size.large};
//   `,
//   MoreBox: styled.div`
//     width: 100%;
//     padding-top: 20px;
//     gap: 10px;
//     ${flexColumn}
//     align-items: center;

//     color: ${({ theme }) => theme.palette.grey500};
//   `,
//   AnimationBox: styled.div`
//     height: 40px;

//     animation: ${moveUpDown} 1s infinite;
//   `,
// };
