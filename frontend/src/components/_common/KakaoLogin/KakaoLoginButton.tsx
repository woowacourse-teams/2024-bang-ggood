import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { KakaoLogo } from '@/assets/assets';
import { KAKAO_AUTH_URL } from '@/constants/oAuth';
import { ROUTE_PATH } from '@/constants/routePath';
import { flexRow } from '@/styles/common';

interface Props {
  afterLoginPath: string;
}

const KakaoLoginButton = ({ afterLoginPath }: Props) => {
  const navigate = useNavigate();

  const handleMoveLogin = () => {
    localStorage.setItem('afterLoginPath', afterLoginPath);
    navigate(ROUTE_PATH.login);

    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <S.KakaoLoginButton onClick={handleMoveLogin}>
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
