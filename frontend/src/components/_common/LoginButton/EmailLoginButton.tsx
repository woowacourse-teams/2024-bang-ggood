import { useNavigate } from 'react-router-dom';

import Button from '@/components/_common/Button/Button';
import { ROUTE_PATH } from '@/constants/routePath';
import { trackEmailLoginButton } from '@/service/amplitude/trackEvent';

const EmailLoginButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      label="이메일로 로그인하기"
      size="full"
      color="dark"
      onClick={() => {
        navigate(ROUTE_PATH.signIn);
        trackEmailLoginButton();
      }}
    />
  );
};

export default EmailLoginButton;
