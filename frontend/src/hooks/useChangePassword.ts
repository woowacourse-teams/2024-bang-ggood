import usePostResetPassword from '@/hooks/query/usePostResetPassword';
import usePostResetPasswordCode from '@/hooks/query/usePostResetPasswordCode';
import usePostResetPasswordMail from '@/hooks/query/usePostResetPasswordMail';

const useResetPassword = () => {
    
  const { mutate: postToResetPassword } = usePostResetPassword();
  const { mutate: postVerificationCode } = usePostResetPasswordCode();
  const { mutate: postResetMail } = usePostResetPasswordMail();

  return { postToResetPassword, postVerificationCode, postResetMail };
};

export default useResetPassword;
