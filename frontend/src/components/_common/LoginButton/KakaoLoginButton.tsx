import styled from '@emotion/styled';

import { KakaoLogo } from '@/assets/assets';
import useLogin from '@/hooks/useLogin';
import { trackKakaoLoginButton } from '@/service/amplitude/trackEvent';
import { flexRow } from '@/styles/common';

const KakaoLoginButton = () => {
  const { moveToKakao } = useLogin();

  const handleClickKakao = () => {
    trackKakaoLoginButton();
    moveToKakao();
  };

  return (
    <S.KakaoLoginButton onClick={handleClickKakao} tabIndex={1}>
      <KakaoLogo aria-hidden="true" />
      <S.Text>카카오톡으로 시작하기</S.Text>
    </S.KakaoLoginButton>
  );
};

export default KakaoLoginButton;

const S = {
  KakaoLoginButton: styled.button`
    width: 100%;
    height: 4.5rem;
    ${flexRow}
    gap: 1rem;
    justify-content: center;
    align-items: center;
    border-radius: 0.8rem;

    background-color: ${({ theme }) => theme.palette.kakao};
    cursor: pointer;
  `,
  Text: styled.div`
    margin: 0.5rem;

    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.small};
    line-height: 1.5;
  `,
};
