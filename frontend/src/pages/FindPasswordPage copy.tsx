import { useState } from 'react';

import SendVerificationCodeStep from '@/components/FindPassword/SendVerificationCodeStep';

const FindPasswordPage = () => {
  const [step, setStep] = useState(0);
  return (
    <>
      {step === 0 && (
        <SendVerificationCodeStep
          onNext={() => {
            setStep(1);
          }}
        />
      )}
      {step === 1 && (
        <SendVerificationCodeStep
          onNext={() => {
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <SendVerificationCodeStep
          onNext={() => {
            /**제출 및 로그인페이지 복귀 */
          }}
        />
      )}
    </>
  );
};

export default FindPasswordPage;
