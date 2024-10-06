import styled from '@emotion/styled';

import { KakaoLogo } from '@/assets/assets';
import useLogin from '@/hooks/useLogin';
import { flexRow } from '@/styles/common';

const KakaoLoginButton = () => {
  const { moveToKakao } = useLogin();

  return (
    <S.KakaoLoginButton onClick={moveToKakao}>
      <KakaoLogo />
      <S.Text>카카오톡으로 시작하기</S.Text>
    </S.KakaoLoginButton>
  );
};

export default KakaoLoginButton;

const S = {
  KakaoLoginButton: styled.div`
    width: 100%;
    height: 5rem;
    ${flexRow}
    justify-content: space-evenly;
    align-items: center;
    border-radius: 0.8rem;

    background-color: ${({ theme }) => theme.palette.kakao};

    font-size: ${({ theme }) => theme.text.size.large};
    cursor: pointer;
  `,
  Text: styled.div`
    margin: 0.5rem;

    font-size: ${({ theme }) => theme.text.size.medium};
    line-height: 1.5;
  `,
};
