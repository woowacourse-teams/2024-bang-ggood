import { useNavigate } from 'react-router-dom';

import { BangBangIcon, BangGgoodTextIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import Header from '@/components/_common/Header/Header';
import CS from '@/components/ResetPassword/style';
import { ROUTE_PATH } from '@/constants/routePath';
import useValidateInput from '@/hooks/useValidateInput';
import { ResetPasswordArgs } from '@/types/user';
import { validatePassword, validatePasswordConfirm } from '@/utils/authValidation';

interface Props {
  args: Pick<ResetPasswordArgs, 'email' | 'code'>;
  onNext: (value: ResetPasswordArgs) => void;
}

const SendVerificationEmailStep = ({ args: { email, code }, onNext }: Props) => {
  const {
    value: password,
    getErrorMessage: getPasswordErrors,
    onChange: onChangePassword,
    isValidated: isPasswordValid,
  } = useValidateInput({
    initialValue: '',
    validates: [validatePassword],
  });

  const {
    value: passwordConfirm,
    getErrorMessage: getPasswordConfirmError,
    onChange: onChangePasswordConfirm,
    isValidated: isPasswordConfirmValidad,
  } = useValidateInput({
    initialValue: '',
    validates: [(value: string) => validatePasswordConfirm(value, password)],
  });

  const canMove = isPasswordValid && isPasswordConfirmValidad;

  const handleClickNext = () => onNext({ email, code, newPassword: password });
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && canMove) {
      handleClickNext();
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
          <CS.Label>비밀번호 찾기</CS.Label>
          <FormField onKeyDown={handleKeyDown}>
            <FormField.Label label="새 비밀번호" htmlFor="password" />
            <FlexBox.Horizontal justify="flex-start" align="center">
              <FormField.Input
                maxLength={254}
                value={password}
                id="password"
                name="password"
                onChange={onChangePassword}
                style={{ width: '25rem' }}
              />
            </FlexBox.Horizontal>
            {getPasswordErrors() && <FormField.ErrorMessage value={getPasswordErrors()} />}
          </FormField>
          <FormField onKeyDown={handleKeyDown}>
            <FormField.Label label="새 비밀번호 확인" htmlFor="passwordConfirm" />
            <FlexBox.Horizontal justify="flex-start" align="center">
              <FormField.Input
                id="passwordConfirm"
                maxLength={254}
                value={passwordConfirm}
                name="passwordConfirm"
                onChange={onChangePasswordConfirm}
                style={{ width: '25rem' }}
              />
            </FlexBox.Horizontal>
            {getPasswordConfirmError() && <FormField.ErrorMessage value={getPasswordConfirmError()} />}
          </FormField>
          <Button
            label="다음"
            size="full"
            isSquare={true}
            color={'dark'}
            onClick={handleClickNext}
            disabled={!canMove}
          />
        </CS.Box>
      </CS.Wrapper>
    </>
  );
};

export default SendVerificationEmailStep;
