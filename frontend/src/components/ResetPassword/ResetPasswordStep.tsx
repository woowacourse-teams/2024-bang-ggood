import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { BangBangIcon, BangGgoodTextIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import Header from '@/components/_common/Header/Header';
import { ROUTE_PATH } from '@/constants/routePath';
import useValidateInput from '@/hooks/useValidateInput';
import { flexCenter, title3 } from '@/styles/common';
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
      <S.Wrapper>
        <S.LogoBox>
          <BangBangIcon />
          <BangGgoodTextIcon aria-label="방끗 로고" />
        </S.LogoBox>
        <S.Box>
          <S.Label>비밀번호 찾기</S.Label>
          <FormField onKeyDown={handleKeyDown}>
            <FormField.Label label="새 비밀번호" />
            <FlexBox.Horizontal justify="flex-start" align="center">
              <FormField.Input
                maxLength={254}
                value={password}
                name="password"
                onChange={onChangePassword}
                style={{ width: '25rem' }}
              />
            </FlexBox.Horizontal>
            {getPasswordErrors() && <FormField.ErrorMessage value={getPasswordErrors()} />}
          </FormField>
          <FormField onKeyDown={handleKeyDown}>
            <FormField.Label label="새 비밀번호 확인" />
            <FlexBox.Horizontal justify="flex-start" align="center">
              <FormField.Input
                maxLength={254}
                value={passwordConfirm}
                name="password"
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
        </S.Box>
      </S.Wrapper>
    </>
  );
};

export default SendVerificationEmailStep;

const S = {
  Wrapper: styled.div`
    ${flexCenter}
    height:calc(100dvh - 56px);
    flex-direction: column;
    gap: 1rem;
  `,
  LogoBox: styled.div`
    ${flexCenter}
    margin-bottom:50px;
    gap: 2rem;
  `,
  Label: styled.div`
    position: absolute;
    top: -4.2rem;
    padding: 1rem 1.4rem;
    border-radius: 1rem 1rem 0 0;
    ${title3}

    background-color: ${({ theme }) => theme.palette.green500};

    color: ${({ theme }) => theme.palette.white};
  `,
  SendButton: styled.div`
    padding: 0 1.2rem;
    cursor: pointer;

    ${flexCenter}
    background-color: ${({ theme }) => theme.palette.green500};

    color: ${({ theme }) => theme.palette.white};
    font-weight: ${({ theme }) => theme.text.weight.medium};
    font-size: ${({ theme }) => theme.text.size.small};
    line-height: 2;
    white-space: nowrap;
    border-radius: 1rem;
  `,
  Box: styled.div`
    display: flex;
    position: relative;

    width: 30rem;
    margin-bottom: 0.5rem;
    padding: 1.6rem;

    background-color: ${({ theme }) => theme.palette.background};
    flex-direction: column;
    border-radius: 1rem;
    gap: 2rem;
  `,
};
