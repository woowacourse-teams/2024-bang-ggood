import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BangBangIcon, BangGgoodTextIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import FormField from '@/components/_common/FormField/FormField';
import Header from '@/components/_common/Header/Header';
import CS from '@/components/ResetPassword/style';
import { ROUTE_PATH } from '@/constants/routePath';
import usePostResetPasswordMail from '@/hooks/query/usePostResetPasswordMail';
import useValidateInput from '@/hooks/useValidateInput';
import { ResetPasswordArgs } from '@/types/user';
import { validateEmail } from '@/utils/authValidation';

interface Props {
  onNext: (value: ResetPasswordArgs['email']) => void;
}

const SendVerificationEmailStep = ({ onNext }: Props) => {
  const [isComplete, setIsComplete] = useState(false);
  const [postErrorMessage, setPostErrorMessage] = useState('');
  const { mutate: postResetMail } = usePostResetPasswordMail();

  const {
    value: email,
    getErrorMessage: getEmailErrors,
    onChange: onChangeEmail,
    isValidated: isEmailValid,
  } = useValidateInput({
    initialValue: '',
    validates: [validateEmail],
  });

  const handleClickSubmit = () =>
    postResetMail(email, {
      onSuccess: () => setIsComplete(true),
      onError: error => setPostErrorMessage(error.message),
    });
  const handleClickNext = () => onNext(email);

  const canMove = isEmailValid && isComplete;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && canMove) {
      onNext(email);
    }
  };

  const navigate = useNavigate();
  const handleClickBackward = () => navigate(ROUTE_PATH.root);

  return (
    <>
      <Header left={<Header.Backward onClick={handleClickBackward} />} />
      <CS.Wrapper>
        <CS.LogoBox>
          <BangBangIcon />
          <BangGgoodTextIcon aria-label="방끗 로고" />
        </CS.LogoBox>
        <CS.Box>
          <FormField onKeyDown={handleKeyDown}>
            <FormField.Label label="이메일" htmlFor="email" />
            <div style={{ position: 'relative', width: '100%' }}>
              <FormField.Input
                maxLength={254}
                value={email}
                id="email"
                name="email"
                onChange={onChangeEmail}
                style={{ width: '100%' }}
              />
              <CS.SendButton onClick={handleClickSubmit} disabled={canMove || !isEmailValid}>
                전송
              </CS.SendButton>
            </div>
            {getEmailErrors() && <FormField.ErrorMessage value={getEmailErrors()} />}
          </FormField>
          {postErrorMessage && <FormField.ErrorMessage value={postErrorMessage} />}
          <Button
            label="다음"
            size="full"
            isSquare={true}
            color={'dark'}
            onClick={handleClickNext}
            disabled={!canMove}
            style={{ marginTop: '3rem' }}
          />
        </CS.Box>
      </CS.Wrapper>
    </>
  );
};

export default SendVerificationEmailStep;
