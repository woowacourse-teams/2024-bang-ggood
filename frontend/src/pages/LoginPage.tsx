import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { postDummyData } from '@/apis/checklist';
import { postKakaoCode } from '@/apis/login';
import { BangBangIcon, KakaoLogo } from '@/assets/assets';
import Layout from '@/components/_common/layout/Layout';
import { STORAGE_KEYS } from '@/constants/localStorage';
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
          await postDummyData();
          localStorage.setItem(STORAGE_KEYS.LOGIN, 'true');
          navigate(ROUTE_PATH.checklistList);
        });
      }
    };

    postLogin();
  }, [navigate]);

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
    height: calc(100vh - 32px);
    gap: 70px;
  `,
  TextWrapper: styled.div`
    width: 280px;

    line-height: 1.4;

    /* ${flexColumn} */
    align-items: center;
    justify-content: left;
    gap: 10px;
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
    gap: 10px;
    width: 100%;
    margin-top: 20px;
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
};
