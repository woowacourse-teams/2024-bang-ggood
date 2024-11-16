import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EnterVerificationCodeStep from '@/components/ResetPassword/EnterVerificationCodeStep';
import ResetPasswordStep from '@/components/ResetPassword/ResetPasswordStep';
import SendVerificationEmailStep from '@/components/ResetPassword/SendVerificationEmailStep';
import { TOAST_MESSAGE } from '@/constants/messages/message';
import { ROUTE_PATH } from '@/constants/routePath';
import usePostResetPassword from '@/hooks/query/usePostResetPassword';
import useToast from '@/hooks/useToast';
import { ResetPasswordArgs } from '@/types/user';

const ResetPasswordPage = () => {
  const [resetPasswordArgs, setResetPasswordArgs] = useState<Partial<ResetPasswordArgs>>({});
  const { mutate: postToResetPassword } = usePostResetPassword();

  const { showToast } = useToast();

  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  return (
    <>
      {step === 0 && (
        <SendVerificationEmailStep
          onNext={async (value: ResetPasswordArgs['email']) => {
            setResetPasswordArgs({ email: value });
            setStep(1);
          }}
        />
      )}
      {step === 1 && (
        <EnterVerificationCodeStep
          args={resetPasswordArgs as Pick<ResetPasswordArgs, 'email'>}
          onNext={async (value: Pick<ResetPasswordArgs, 'email' | 'code'>) => {
            setResetPasswordArgs(args => ({ ...args, ...value }));
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <ResetPasswordStep
          args={resetPasswordArgs as Pick<ResetPasswordArgs, 'email' | 'code'>}
          onNext={async (value: ResetPasswordArgs) => {
            await postToResetPassword(value, {
              onSuccess: () => {
                showToast({ message: TOAST_MESSAGE.RESET_PASSWORD_COMPLETE, type: 'confirm' });
                navigate(ROUTE_PATH.signIn);
              },
            });
          }}
        />
      )}
    </>
  );
};

export default ResetPasswordPage;
