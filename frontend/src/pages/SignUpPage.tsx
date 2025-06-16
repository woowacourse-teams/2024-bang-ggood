import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BangBangIcon, BangGgoodTextIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import FormField from '@/components/_common/FormField/FormField';
import Header from '@/components/_common/Header/Header';
import { ROUTE_PATH } from '@/constants/routePath';
import usePostSignUpQuery from '@/hooks/query/usePostSignUpQuery';
import useValidateInput from '@/hooks/useValidateInput';
import { flexCenter, title3, title4 } from '@/styles/common';
import { validateEmail, validateLength, validatePassword, validatePasswordConfirm } from '@/utils/authValidation';

const SignUpPage = () => {
  const [postErrorMessage, setPostErrorMessage] = useState('');
  const navigate = useNavigate();

  const {
    value: email,
    getErrorMessage: getEmailError,
    onChange: onChangeEmail,
    isValidated: isEmailValidated,
  } = useValidateInput({
    initialValue: '',
    validates: [validateEmail],
  });

  const {
    value: name,
    getErrorMessage: getNameError,
    onChange: onChangeName,
    isValidated: isNameValidated,
  } = useValidateInput({
    initialValue: '',
    validates: [(value: string) => validateLength(value, 2, 20)],
  });

  const {
    value: password,
    getErrorMessage: getPasswordError,
    onChange: onChangePassword,
    isValidated: isPasswordValidated,
  } = useValidateInput({
    initialValue: '',
    validates: [validatePassword],
  });

  const {
    value: passwordConfirm,
    getErrorMessage: getPasswordConfirmError,
    onChange: onChangePasswordConfirm,
    isValidated: isPasswordConfirmValidated,
  } = useValidateInput({
    initialValue: '',
    validates: [(value: string) => validatePasswordConfirm(value, password)],
  });

  const disabled = !isEmailValidated || !isNameValidated || !isPasswordValidated || !isPasswordConfirmValidated;

  const { mutate, isSuccess } = usePostSignUpQuery();
  if (isSuccess) navigate(ROUTE_PATH.signIn);

  const handleSubmit = () => {
    mutate(
      { name, email, password },
      {
        onError: error => setPostErrorMessage(error.message),
        onSuccess: () => setPostErrorMessage(''),
      },
    );
  };

  const handleMoveSignIn = () => {
    navigate(ROUTE_PATH.signIn);
  };

  const handleClickLanding = () => {
    navigate(ROUTE_PATH.root);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !disabled) {
      handleSubmit();
    }
  };

  return (
    <>
      <Header left={<Header.Backward onClick={handleClickLanding} />} />
      <S.Wrapper>
        <S.LogoBox>
          <BangBangIcon />
          <BangGgoodTextIcon aria-label="방끗 로고" />
        </S.LogoBox>
        <S.Box>
          <S.Label>회원가입</S.Label>
          <FormField onKeyDown={handleKeyDown}>
            <FormField.Label label="이메일" />
            <FormField.Input value={email} name="email" onChange={onChangeEmail} maxLength={254} />
            <FormField.ErrorMessage value={getEmailError()} />
          </FormField>
          <FormField>
            <FormField.Label label="닉네임" />
            <FormField.Input value={name} name="name" onChange={onChangeName} maxLength={20} />
            <FormField.ErrorMessage value={getNameError()} />
          </FormField>
          <FormField>
            <FormField.Label label="비밀번호" />
            <FormField.Input
              value={password}
              name="password"
              onChange={onChangePassword}
              type="password"
              maxLength={64}
            />
            <FormField.ErrorMessage value={getPasswordError()} />
          </FormField>
          <FormField>
            <FormField.Label label="비밀번호 확인" />
            <FormField.Input
              value={passwordConfirm}
              name="passwordConfirm"
              onChange={onChangePasswordConfirm}
              type="password"
              maxLength={64}
            />
            <FormField.ErrorMessage value={getPasswordConfirmError()} />
          </FormField>
          <FormField.ErrorMessage value={postErrorMessage} />
          <Button
            label="회원가입 하기"
            size="full"
            isSquare={true}
            color={'dark'}
            onClick={handleSubmit}
            disabled={disabled}
          />
        </S.Box>
        <S.NavigateButton onClick={handleMoveSignIn}>방끗 로그인</S.NavigateButton>
      </S.Wrapper>
    </>
  );
};

export default SignUpPage;

const S = {
  Wrapper: styled.div`
    ${flexCenter}
    height:calc(100dvh - 56px);
    flex-direction: column;
    gap: 1rem;
  `,
  LogoBox: styled.div`
    ${flexCenter}
    margin-bottom:4rem;
    gap: 2rem;
  `,
  Label: styled.div`
    position: absolute;
    top: -4.2rem;
    padding: 1rem 1.4rem;
    border-radius: 1rem 1rem 0 0;
    ${title3}

    background-color: ${({ theme }) => theme.palette.green500};

    color: ${({ theme }) => theme.color.mono.white};
  `,
  Box: styled.div`
    display: flex;
    position: relative;
    width: 30rem;
    flex-direction: column;
    padding: 1.6rem;
    border-radius: 1rem;

    background-color: ${({ theme }) => theme.palette.background};
    gap: 1.5rem;
  `,
  NavigateButton: styled.div`
    ${title4};
    color: ${({ theme }) => theme.palette.grey400};
    cursor: pointer;

    :hover {
      color: ${({ theme }) => theme.palette.green600};
    }
  `,
};
