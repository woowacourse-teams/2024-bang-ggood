import { ArrowDownSmall, BangBangIcon, BangGgoodTextIcon, KakaoLogo, SmallCheck } from '@/assets/assets';
import S from '@/components/Landing/style';
import { KAKAO_AUTH_URL } from '@/constants/oAuth';

const FirstSection = () => {
  const handleMoveLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

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
        <S.KakaoLoginButton onClick={handleMoveLogin}>
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
