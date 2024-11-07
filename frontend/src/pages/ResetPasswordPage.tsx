import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EnterVerificationCodeStep from '@/components/ResetPassword/EnterVerificationCodeStep';
import ResetPasswordStep from '@/components/ResetPassword/ResetPasswordStep';
import SendVerificationEmailStep from '@/components/ResetPassword/SendVerificationEmailStep';
import { ROUTE_PATH } from '@/constants/routePath';
import usePostResetPassword from '@/hooks/query/usePostResetPassword';
import usePostResetPasswordCode from '@/hooks/query/usePostResetPasswordCode';
import usePostResetPasswordMail from '@/hooks/query/usePostResetPasswordMail';
import { ResetPasswordArgs } from '@/types/user';

const ResetPasswordPage = () => {
  const [resetPasswordArgs, setResetPasswordArgs] = useState<Partial<ResetPasswordArgs>>({});
  const { mutate: postToResetPassword } = usePostResetPassword();
  const { mutate: postVerificationCode } = usePostResetPasswordCode();
  const { mutate: postResetMail } = usePostResetPasswordMail();

  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  return (
    <>
      {step === 0 && (
        <SendVerificationEmailStep
          onNext={async (value: ResetPasswordArgs['email']) => {
            await postResetMail(value, {
              onSuccess: () => {
                setResetPasswordArgs({ email: value });
                setStep(1);
              },
            });
          }}
        />
      )}
      {step === 1 && (
        <EnterVerificationCodeStep
          args={resetPasswordArgs}
          onNext={async (value: Pick<ResetPasswordArgs, 'email' | 'code'>) => {
            await postVerificationCode(value, {
              onSuccess: () => {
                setResetPasswordArgs(args => ({ ...args, ...value }));
                setStep(2);
              },
            });
          }}
        />
      )}
      {step === 2 && (
        <ResetPasswordStep
          args={resetPasswordArgs}
          onNext={async (value: ResetPasswordArgs) => {
            await postToResetPassword(value, { onSuccess: () => navigate(ROUTE_PATH.signIn) });
          }}
        />
      )}
    </>
  );
};

export default ResetPasswordPage;
