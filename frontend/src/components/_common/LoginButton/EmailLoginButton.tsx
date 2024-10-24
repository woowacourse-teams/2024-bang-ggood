import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/_common/Button/Button';
import { ROUTE_PATH } from '@/constants/routePath';
import { trackBasicLoginButton } from '@/service/amplitude/trackEvent';

const EmailLoginButton = () => {
  const navigate = useNavigate();

  return (
    <S.EmailLoginButton
      label="이메일로 로그인하기"
      size="full"
      isSquare
      onClick={() => {
        navigate(ROUTE_PATH.signIn);
        trackBasicLoginButton();
      }}
    />
  );
};

export default EmailLoginButton;

const S = {
  EmailLoginButton: styled(Button)`
    background-color: ${({ theme }) => theme.palette.green500};
    border-radius: 0.8rem;

    color: ${({ theme }) => theme.palette.white};

    &:hover {
      background-color: ${({ theme }) => theme.palette.green600};
    }
  `,
};
