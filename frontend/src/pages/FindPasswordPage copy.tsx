import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SendVerificationCodeStep from '@/components/FindPassword/SendVerificationCodeStep';
import { ROUTE_PATH } from '@/constants/routePath';
import usePostResetPassword from '@/hooks/query/usePostResetPassword';
import usePostResetPasswordCode from '@/hooks/query/usePostResetPasswordCode';
import usePostResetPasswordMail from '@/hooks/query/usePostResetPasswordMail';

const ResetPasswordPage = () => {
  const { mutate: postToResetPassword } = usePostResetPassword();
  const { mutate: postVerificationCode } = usePostResetPasswordCode();
  const { mutate: postResetMail } = usePostResetPasswordMail();

  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  return (
    <>
      {step === 0 && (
        <SendVerificationCodeStep
          onNext={async (value: Parameters<typeof postResetMail>[0]) => {
            await postResetMail(value, { onSuccess: () => setStep(1) });
          }}
        />
      )}
      {step === 1 && (
        <SendVerificationCodeStep
          onNext={async (value: Parameters<typeof postVerificationCode>[0]) => {
            await postVerificationCode(value, { onSuccess: () => setStep(2) });
          }}
        />
      )}
      {step === 2 && (
        <SendVerificationCodeStep
          onNext={async (value: Parameters<typeof postToResetPassword>[0]) => {
            await postToResetPassword(value, { onSuccess: () => navigate(ROUTE_PATH.signIn) });
          }}
        />
      )}
    </>
  );
};

export default ResetPasswordPage;
