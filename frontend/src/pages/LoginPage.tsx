import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { postKakaoCode } from '@/apis/login';
import { BangBangIcon, KakaoLogo } from '@/assets/assets';
import Layout from '@/components/_common/layout/Layout';
import { KAKAO_AUTH_URL } from '@/constants/oAuth';
import { ROUTE_PATH } from '@/constants/routePath';
import { flexCenter, flexColumn, flexRow } from '@/styles/common';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    const postLogin = async () => {
      if (code) {
        await postKakaoCode(code).then(async () => {
          navigate(ROUTE_PATH.home);
        });
      }
    };

    postLogin();
  }, []);

  const handleLogin = async () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Layout>
      <S.Wrapper>
        <BangBangIcon width="350" height="150" />
        <S.TextWrapper>
          <S.Text isBold={true}>방끗</S.Text>
          <S.Text>방 구하기 끗! 그래서 방긋 :)</S.Text>
        </S.TextWrapper>
        <S.ButtonWrapper>
          <S.SubText>지금 가입하고 체크리스트 작성하기</S.SubText>
          <S.KakaoLoginButton onClick={handleLogin}>
            <KakaoLogo />
            <span>카카오로 로그인</span>
          </S.KakaoLoginButton>
        </S.ButtonWrapper>
      </S.Wrapper>
    </Layout>
  );
};

export default LoginPage;

const S = {
  Wrapper: styled.div`
    ${flexCenter}
    ${flexColumn}
    width: 100%;
    height: calc(100vh - 3.2rem);
    gap: 7rem;
  `,
  TextWrapper: styled.div`
    width: 28rem;

    align-items: center;
    justify-content: left;
    gap: 1rem;
  `,
  Text: styled.div<{ isBold?: boolean }>`
    ${({ isBold, theme }) =>
      isBold &&
      `
    font-weight: ${theme.text.weight.bold};
  `};
    font-size: ${({ theme }) => theme.text.size.xLarge};
  `,
  ButtonWrapper: styled.div`
    ${flexCenter}
    ${flexColumn}
    gap: 1rem;
    width: 100%;
    margin-top: 2rem;
  `,
  SubText: styled.div`
    font-size: ${({ theme }) => theme.text.size.small};
  `,
  KakaoLoginButton: styled.div`
    width: 30rem;
    height: 5rem;
    ${flexRow}
    justify-content: space-evenly;
    align-items: center;
    border-radius: 0.8rem;

    background-color: ${({ theme }) => theme.palette.kakao};

    font-size: ${({ theme }) => theme.text.size.large};
  `,
};
