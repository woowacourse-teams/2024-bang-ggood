import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { ArrowDownSmall, BangBangIcon, BangGgoodTextIcon, SmallCheck } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import KakaoLoginButton from '@/components/_common/KakaoLogin/KakaoLoginButton';
import CS from '@/components/Landing/style';
import { ROUTE_PATH } from '@/constants/routePath';
import { arrowMove, moveUpDown } from '@/styles/animation';
import { flexCenter, flexColumn } from '@/styles/common';

const FirstSection = () => {
  const navigate = useNavigate();

  return (
    <S.CenterBox>
      <CS.EmptyBox height="5rem" mobileHeight="12rem" />
      <S.LogoBox>
        <S.BangBangIcon />
        <S.TextWrapper>
          <S.SubtitleText>방 구하기</S.SubtitleText>
          <S.SubtitleText>
            이거 하나로
            <S.CheckRelativeText>
              {' '}
              끝!
              <S.CheckIconBox>
                <SmallCheck />
              </S.CheckIconBox>
            </S.CheckRelativeText>
          </S.SubtitleText>
        </S.TextWrapper>
        <S.BangGgoodTextIcon />
      </S.LogoBox>
      <CS.EmptyBox mobileHeight="2rem" height="0" />
      <S.ButtonWrapper>
        <KakaoLoginButton />
        <S.Button label="방끗 둘러보기" size="full" isSquare onClick={() => navigate(ROUTE_PATH.home)} />
      </S.ButtonWrapper>
      <CS.EmptyBox mobileHeight="2rem" height="0" />
      <S.MoreBox>
        <S.SubText>방끗을 소개할게요!</S.SubText>
        <S.MoveUpDownAnimationBox>
          <ArrowDownSmall />
        </S.MoveUpDownAnimationBox>
      </S.MoreBox>
    </S.CenterBox>
  );
};

const S = {
  CheckRelativeText: styled.span`
    position: relative;
  `,
  CenterBox: styled.div`
    ${flexCenter};
    gap: 4rem;
    flex-direction: column;
    height: 100%;

    @media (height <= ${({ theme }) => theme.viewport.TABLET}px) {
      gap: 1rem;
    }
  `,
  SubtitleText: styled.div`
    @media (width >= ${({ theme }) => theme.viewport.MOBILE}px) {
      font-size: 3rem;
    }

    font-size: ${({ theme }) => theme.text.size.large};
  `,
  Button: styled(Button)`
    height: 5rem;

    font-size: ${({ theme }) => theme.text.size.medium};
    border-radius: 1rem;
  `,
  LogoBox: styled.div`
    width: 100%;
    align-items: center;
    gap: 2.5rem;
    ${flexColumn}
  `,
  CheckIconBox: styled.div`
    position: absolute;
    right: 1rem;
    bottom: 3rem;

    @media (width <= ${({ theme }) => theme.viewport.MOBILE}px) {
      bottom: 2rem;
    }
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
    width: calc(100% - 10rem);
    margin: 0 2rem;
    box-sizing: border-box;

    gap: 2rem;
  `,
  GuestLoginButton: styled.button`
    width: 100%;
    height: 5rem;
    border: 3px solid ${({ theme }) => theme.palette.yellow500};
    box-sizing: border-box;

    font-size: ${({ theme }) => theme.text.size.medium};
    border-radius: 0.8rem;
    cursor: pointer;
  `,
  SubText: styled.div`
    font-size: ${({ theme }) => theme.text.size.large};

    @media (width <= ${({ theme }) => theme.viewport.MOBILE}px) {
      font-size: ${({ theme }) => theme.text.size.small};
    }
  `,
  MoreBox: styled.div`
    width: 100%;
    ${flexColumn}
    align-items: center;

    color: ${({ theme }) => theme.palette.grey500};
  `,
  MoveUpDownAnimationBox: styled.div`
    margin-top: 1.5rem;

    animation: ${arrowMove} 1s infinite;
  `,
  BangBangIcon: styled(BangBangIcon)`
    width: 30rem;
    height: 17rem;
    margin-bottom: 2rem;

    animation: ${moveUpDown} 1s infinite;

    @media (height <= ${({ theme }) => theme.viewport.MOBILE}px) {
      width: 38rem;
      height: 16rem;
    }
  `,
  BangGgoodTextIcon: styled(BangGgoodTextIcon)`
    width: 20rem;
    height: 15rem;

    @media (height <= ${({ theme }) => theme.viewport.TABLET}px) {
      width: 15rem;
      height: 8rem;
    }
  `,
};

export default FirstSection;
