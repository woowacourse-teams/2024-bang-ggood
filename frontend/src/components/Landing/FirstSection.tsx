import { useNavigate } from 'react-router-dom';

import { ArrowDownSmall, BangBangIcon, BangGgoodTextIcon, SmallCheck } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import KakaoLoginButton from '@/components/_common/KakaoLogin/KakaoLoginButton';
import S from '@/components/Landing/style';
import { ROUTE_PATH } from '@/constants/routePath';

const FirstSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <S.LogoBox>
        <BangBangIcon width="350" height="130" aria-hidden="true" />
        <S.TextWrapper>
          <S.SubtitleText>방 구하기</S.SubtitleText>
          <S.SubtitleText>이거 하나로 끝!</S.SubtitleText>
          <S.CheckIconBox>
            <SmallCheck aria-hidden="true" />
          </S.CheckIconBox>
        </S.TextWrapper>
        <BangGgoodTextIcon width={220} height={50} aria-hidden="true" />
      </S.LogoBox>
      <S.ButtonWrapper>
        <KakaoLoginButton />
        <Button label="방끗 둘러보기" size="full" isSquare onClick={() => navigate(ROUTE_PATH.home)} />
      </S.ButtonWrapper>
      <S.MoreBox>
        <S.SubText>방끗을 소개할게요!</S.SubText>
        <S.MoveUpDownAnimationBox>
          <ArrowDownSmall aria-hidden="true" />
        </S.MoveUpDownAnimationBox>
      </S.MoreBox>
    </>
  );
};

export default FirstSection;
