import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BangBangIcon, BangGgoodTextIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import FormField from '@/components/_common/FormField/FormField';
import Header from '@/components/_common/Header/Header';
import CS from '@/components/ResetPassword/style';
import { ROUTE_PATH } from '@/constants/routePath';
import usePostResetPasswordCode from '@/hooks/query/usePostResetPasswordCode';
import useValidateInput from '@/hooks/useValidateInput';
import { ResetPasswordArgs } from '@/types/user';

interface Props {
  args: Pick<ResetPasswordArgs, 'email'>;
  onNext: (value: Pick<ResetPasswordArgs, 'email' | 'code'>) => void;
}

const EmailVerificationCodeStep = ({ args: { email }, onNext }: Props) => {
  const [isComplete, setIsComplete] = useState(false);
  const [postErrorMessage, setPostErrorMessage] = useState('');
  const { mutate: postResetCode } = usePostResetPasswordCode();

  const {
    value: code,
    getErrorMessage: getCodeErrors,
    onChange: onChangeCode,
    isValidated: isCodeValid,
  } = useValidateInput({
    initialValue: '',
    validates: [],
  });

  const handleClickSubmit = () =>
    postResetCode(
      { email, code },
      {
        onSuccess: () => setIsComplete(true),
        onError: error => setPostErrorMessage(error.message),
      },
    );

  const handleClickNext = () => onNext({ code, email });

  const canMove = isCodeValid && isComplete;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && canMove) {
      onNext({ code, email });
    }
  };

  const navigate = useNavigate();
  const handleClickBackward = () => navigate(ROUTE_PATH.root);

  return (
    <>
      <Header left={<Header.Backward onClick={handleClickBackward} />} center="비밀번호 찾기" />
      <CS.Wrapper>
        <CS.LogoBox>
          <BangBangIcon />
          <BangGgoodTextIcon aria-label="방끗 로고" />
        </CS.LogoBox>
        <CS.Box>
          <FormField onKeyDown={handleKeyDown}>
            <FormField.Label label="검증 코드" htmlFor="code" />

            <div style={{ position: 'relative', width: '100%' }}>
              <FormField.Input
                maxLength={254}
                value={code}
                id="code"
                name="code"
                onChange={onChangeCode}
                style={{ width: '100%' }}
              />
              <CS.SendButton onClick={handleClickSubmit} disabled={canMove}>
                확인
              </CS.SendButton>
            </div>
            {getCodeErrors() && <FormField.ErrorMessage value={getCodeErrors()} />}
          </FormField>
          {postErrorMessage && <FormField.ErrorMessage value={postErrorMessage} />}
          <Button label="다음" size="full" isSquare={true} color="dark" onClick={handleClickNext} disabled={!canMove} />
        </CS.Box>
      </CS.Wrapper>
    </>
  );
};

export default EmailVerificationCodeStep;
