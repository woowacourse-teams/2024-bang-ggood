import styled from '@emotion/styled';

import { ArrowDownSmall, BangBangIcon, BangGgoodTextIcon, KakaoLogo, SmallCheck } from '@/assets/assets';
import { moveUpDown } from '@/styles/animation';
import { flexCenter, flexColumn, flexRow } from '@/styles/common';

const FirstSection = () => {
  return (
    <>
      <S.LogoBox>
        <BangBangIcon width="350" height="130" />
        <S.TextWrapper>
          <S.Text>방 구하기</S.Text>
          <S.Text>이거 하나로 끝!</S.Text>
          <S.CheckIconBox>
            <SmallCheck />
          </S.CheckIconBox>
        </S.TextWrapper>
        <BangGgoodTextIcon width={220} height={50} />
      </S.LogoBox>
      <S.ButtonWrapper>
        <S.KakaoLoginButton onClick={() => {}}>
          <KakaoLogo />
          <span>카카오로 로그인</span>
        </S.KakaoLoginButton>
      </S.ButtonWrapper>
      <S.MoreBox>
        <S.SubText>방끗을 소개할게요!</S.SubText>
        <S.AnimationBox>
          <ArrowDownSmall />
        </S.AnimationBox>
      </S.MoreBox>
    </>
  );
};

export default FirstSection;

const S = {
  LogoBox: styled.div`
    width: 100%;
    align-items: center;
    height: 370px;
    padding-top: 80px;
    gap: 40px;
    ${flexColumn}
  `,
  CheckIconBox: styled.div`
    position: absolute;
    right: 77px;
    top: 22px;
  `,
  TextWrapper: styled.div`
    width: 280px;
    position: relative;
    line-height: 1.4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: left;
    font-size: 18px;
    gap: 10px;
  `,
  Text: styled.div`
    font-size: ${({ theme }) => theme.text.size.large};
    font-weight: ${({ theme }) => theme.text.weight.semiBold};
  `,
  ButtonWrapper: styled.div`
    ${flexCenter}
    ${flexColumn}
    gap: 10px;
    width: 100%;
  `,
  SubText: styled.div`
    font-size: ${({ theme }) => theme.text.size.small};
  `,
  KakaoLoginButton: styled.div`
    width: 300px;
    height: 50px;
    ${flexRow}
    justify-content: space-evenly;
    align-items: center;
    border-radius: 8px;

    background-color: ${({ theme }) => theme.palette.kakao};

    font-size: ${({ theme }) => theme.text.size.large};
  `,
  MoreBox: styled.div`
    padding-top: 40px;
    gap: 10px;
    width: 100%;
    ${flexColumn}
    align-items: center;
    color: ${({ theme }) => theme.palette.grey500};
  `,
  AnimationBox: styled.div`
    height: 40px;
    animation: ${moveUpDown} 1s infinite;
  `,
};
