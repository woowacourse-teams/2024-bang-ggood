import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { postSignUp } from '@/apis/user';
import { BangBangIcon, BangGgoodTextIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import FormField from '@/components/_common/FormField/FormField';
import { ROUTE_PATH } from '@/constants/routePath';
import useToast from '@/hooks/useToast';
import useValidateInput from '@/hooks/useValidateInput';
import { flexCenter, title3 } from '@/styles/common';
import { validateEmail, validateLength, validatePassword, validatePasswordConfirm } from '@/utils/authValidation';

const SignUpPage = () => {
  const { showToast } = useToast();
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

  const handleSubmit = async () => {
    const response = await postSignUp({ name, email, password });
    if (response.status === 201) {
      showToast({ message: '회원가입이 완료되었습니다.', type: 'confirm' });
      navigate(ROUTE_PATH.signIn);
    } else {
      const errorData = await response.json();
      const errorMessage = errorData.message;
      setPostErrorMessage(errorMessage);
    }
  };

  return (
    <>
      <S.Wrapper>
        <S.LogoBox>
          <BangBangIcon />
          <BangGgoodTextIcon aria-label="방끗 로고" />
        </S.LogoBox>
        <S.Box>
          <S.Label>회원가입</S.Label>
          <FormField>
            <FormField.Label label="이메일" />
            <FormField.Input
              value={email}
              name="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChangeEmail(e)}
            />
            <FormField.ErrorMessage value={getEmailError()} />
          </FormField>
          <FormField>
            <FormField.Label label="닉네임" />
            <FormField.Input
              value={name}
              name="name"
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChangeName(e)}
            />
            <FormField.ErrorMessage value={getNameError()} />
          </FormField>
          <FormField>
            <FormField.Label label="비밀번호" />
            <FormField.Input
              value={password}
              name="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChangePassword(e)}
            />
            <FormField.ErrorMessage value={getPasswordError()} />
          </FormField>
          <FormField>
            <FormField.Label label="비밀번호 확인" />
            <FormField.Input
              value={passwordConfirm}
              name="passwordConfirm"
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChangePasswordConfirm(e)}
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
      </S.Wrapper>
    </>
  );
};

export default SignUpPage;

const S = {
  Wrapper: styled.div`
    ${flexCenter}
    height:100dvh;
    flex-direction: column;
    gap: 10px;
  `,
  LogoBox: styled.div`
    ${flexCenter}
    margin-bottom:50px;
    gap: 20px;
  `,
  Label: styled.div`
    position: absolute;
    top: -42px;
    padding: 10px 14px;
    border-radius: 10px 10px 0 0;
    ${title3}

    background-color: ${({ theme }) => theme.palette.green400};

    color: ${({ theme }) => theme.palette.white};
  `,
  Box: styled.div`
    display: flex;
    position: relative;
    width: 300px;
    flex-direction: column;
    padding: 16px;
    border-radius: 10px;

    background-color: ${({ theme }) => theme.palette.background};
    gap: 20px;
  `,
};
