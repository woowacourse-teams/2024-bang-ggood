import { ArrowDownSmall, BangBangIcon, BangGgoodTextIcon, SmallCheck } from '@/assets/assets';
import KakaoLoginButton from '@/components/_common/KakaoLogin/KakaoLoginButton';
import S from '@/components/Landing/style';
import { ROUTE_PATH } from '@/constants/routePath';

const FirstSection = () => {
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
        <KakaoLoginButton redirectUri="root" afterLoginPath={ROUTE_PATH.home} />
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
