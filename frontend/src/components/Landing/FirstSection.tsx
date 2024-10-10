import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { ArrowDownSmall, BangBangIcon, BangGgoodTextIcon, SmallCheck } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import KakaoLoginButton from '@/components/_common/KakaoLogin/KakaoLoginButton';
import CS from '@/components/Landing/style';
import { ROUTE_PATH } from '@/constants/routePath';
import { moveUpDown } from '@/styles/animation';
import { flexCenter, flexColumn } from '@/styles/common';

const FirstSection = () => {
  const navigate = useNavigate();

  return (
    <S.CenterBox>
      <CS.EmptyBox height="5rem" mobileHeight="12rem" />
      <S.LogoTextBox>
        <S.BangBangIcon />
        <S.LogoBox>
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
      </S.LogoTextBox>
      <CS.EmptyBox mobileHeight="2rem" height="4rem" />
      <S.ButtonWrapper>
        <KakaoLoginButton />
        <S.Button label="방끗 둘러보기" size="full" isSquare onClick={() => navigate(ROUTE_PATH.home)} />
      </S.ButtonWrapper>
      <CS.EmptyBox height="5rem" mobileHeight="10rem" />
      <S.MoreBox>
        <S.SubText>방끗을 소개할게요. 아래를 클릭해보세요!</S.SubText>
        <CS.MoveUpDownAnimationBox>
          <ArrowDownSmall aria-label="스크롤로 하단의 정보를 확인할 수 있어요" />
        </CS.MoveUpDownAnimationBox>
      </S.MoreBox>
    </S.CenterBox>
  );
};

const S = {
  LogoTextBox: styled.div`
    ${flexCenter};
    flex-direction: column;
    gap: 2rem;

    @media (height <= ${({ theme }) => theme.viewport.TABLET}px) {
      gap: 5rem;
    }
  `,
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
    font-size: 2.8rem;

    @media (height <= ${({ theme }) => theme.viewport.TABLET}px) {
      font-size: 2rem;
    }
  `,
  Button: styled(Button)`
    height: 5rem;

    font-size: ${({ theme }) => theme.text.size.medium};
    border-radius: 1rem;
  `,
  LogoBox: styled.div`
    width: 100%;
    align-items: center;
    gap: 1.5rem;
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
    position: absolute;
    bottom: 5rem;

    font-size: ${({ theme }) => theme.text.size.medium};
  `,
  MoreBox: styled.div`
    width: 100%;
    ${flexColumn}
    align-items: center;

    color: ${({ theme }) => theme.palette.grey500};
  `,
  BangBangIcon: styled(BangBangIcon)`
    width: 30rem;
    height: 15rem;

    animation: ${moveUpDown} 1s infinite;

    @media (height <= ${({ theme }) => theme.viewport.TABLET}px) {
      width: 30rem;
      height: 10rem;
    }
  `,
  BangGgoodTextIcon: styled(BangGgoodTextIcon)`
    width: 15rem;
    height: 10rem;

    @media (height <= ${({ theme }) => theme.viewport.TABLET}px) {
      width: 15rem;
      height: 7rem;
    }
  `,
};

export default FirstSection;
