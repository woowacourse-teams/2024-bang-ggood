import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { BangBangIcon, BangGgoodTextIcon, ScrollArrow } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import EmailLoginButton from '@/components/_common/LoginButton/EmailLoginButton';
import KakaoLoginButton from '@/components/_common/LoginButton/KakaoLoginButton';
import CS from '@/components/Landing/style';
import { ROUTE_PATH } from '@/constants/routePath';
import amplitudeInitializer from '@/service/amplitude/amplitudeInitializer';
import { trackGuestLoginButton } from '@/service/amplitude/trackEvent';
import { moveUpDown } from '@/styles/animation';
import { flexCenter, flexColumn } from '@/styles/common';
import { fontStyle } from '@/utils/fontStyle';

const FirstSection = () => {
  const { init } = amplitudeInitializer();
  const navigate = useNavigate();

  return (
    <S.CenterBox>
      <CS.EmptyBox height="5rem" mobileHeight="12rem" />
      <S.LogoTextBox>
        <S.BangBangIcon />
        <CS.EmptyBox height="1rem" />
        <S.LogoBox>
          <S.TextWrapper>
            <S.SubtitleText>방 구하기</S.SubtitleText>
            <S.SubtitleText>
              이거 하나로
              <S.CheckRelativeText>{' 끝!'}</S.CheckRelativeText>
            </S.SubtitleText>
          </S.TextWrapper>
          <S.BangGgoodTextIcon />
        </S.LogoBox>
      </S.LogoTextBox>
      <CS.EmptyBox mobileHeight="0rem" height="0.5rem" />
      <S.ButtonWrapper>
        <KakaoLoginButton />
        <EmailLoginButton />
        <Button
          label="방끗 둘러보기"
          variant="outlined-gray"
          color="light"
          onClick={() => {
            init();
            navigate(ROUTE_PATH.home);
            trackGuestLoginButton();
          }}
        />
      </S.ButtonWrapper>
      <CS.EmptyBox height="5rem" mobileHeight="10rem" />
      <S.MoreBox>
        <S.SubText>방끗을 소개할게요. 아래를 클릭하세요!</S.SubText>
        <CS.MoveUpDownAnimationBox>
          <ScrollArrow aria-label="스크롤로 하단의 정보를 확인할 수 있어요" />
        </CS.MoveUpDownAnimationBox>
      </S.MoreBox>
    </S.CenterBox>
  );
};

const S = {
  LogoTextBox: styled.div`
    ${flexCenter};
    flex-direction: column;
    gap: 0.5rem;

    @media (height <= ${({ theme }) => theme.viewport.TABLET}px) {
      gap: 1rem;
    }
  `,
  CheckRelativeText: styled.span`
    position: relative;
  `,
  CenterBox: styled.div`
    ${flexCenter};
    gap: 2rem;
    flex-direction: column;
    height: 100%;

    @media (height <= ${({ theme }) => theme.viewport.TABLET}px) {
      gap: 1rem;
    }
  `,
  SubtitleText: styled.div`
    ${({ theme }) => fontStyle(theme.font.heading[2].R)}
  `,
  Button: styled(Button)`
    border-radius: 0.8rem;

    height: 4.5rem;
  `,
  LogoBox: styled.div`
    width: 100%;
    align-items: center;
    gap: 1.5rem;
    ${flexColumn}
  `,

  TextWrapper: styled.div`
    display: flex;
    width: 280px;

    font-size: 18px;
    line-height: 1.4;
    flex-direction: column;
    align-items: center;
    justify-content: left;
  `,
  ButtonWrapper: styled.div`
    ${flexColumn}
    width: calc(100% - 3rem);
    margin: 0 1rem;
    box-sizing: border-box;

    gap: 1rem;
  `,
  SubText: styled.div`
    position: absolute;
    bottom: 5rem;

    ${({ theme }) => fontStyle(theme.font.body[1].B)}
    color:${({ theme }) => theme.color.gray[400]}
  `,
  MoreBox: styled.div`
    width: 100%;
    ${flexColumn}
    align-items: center;

    color: ${({ theme }) => theme.palette.grey500};
  `,
  BangBangIcon: styled(BangBangIcon)`
    width: 25rem;
    height: 13rem;

    animation: ${moveUpDown} 1s infinite;
  `,
  BangGgoodTextIcon: styled(BangGgoodTextIcon)`
    width: 6.8rem;
    height: 3.6rem;

    @media (height <= ${({ theme }) => theme.viewport.TABLET}px) {
      width: 6.8rem;
      height: 3rem;
    }
  `,
};

export default FirstSection;
