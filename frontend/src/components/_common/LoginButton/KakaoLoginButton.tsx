import Button from '@/components/_common/Button/Button';
import useOAuthLogin from '@/hooks/useOAuthLogin';
import { trackKakaoLoginButton } from '@/service/amplitude/trackEvent';

const KakaoLoginButton = () => {
  const { moveToKakao } = useOAuthLogin();

  const handleClickKakao = () => {
    trackKakaoLoginButton();
    moveToKakao();
  };

  return <Button color="primary" size="full" label="카카오톡으로 시작하기" onClick={handleClickKakao} />;
};

export default KakaoLoginButton;
