import styled from '@emotion/styled';

import { postSignUp } from '@/apis/user';
import { BangBangIcon, BangGgoodTextIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import FormField from '@/components/_common/FormField/FormField';
import useValidateInput from '@/hooks/useValidateInput';
import { flexCenter, title3 } from '@/styles/common';
import { validateEmail, validateLength, validatePassword, validatePasswordConfirm } from '@/utils/validate';

const AuthPage = () => {
  const {
    value: email,
    errors: emailErrors,
    onChange: onChangeEmail,
    isValidated: isEmailValidated,
  } = useValidateInput({
    initialValue: '',
    validates: [validateEmail],
  });

  const {
    value: name,
    errors: nameErrors,
    onChange: onChangeName,
    isValidated: isNameValidated,
  } = useValidateInput({
    initialValue: '',
    validates: [(value: string) => validateLength(value, 2, 20)],
  });

  const {
    value: password,
    errors: passwordErrors,
    onChange: onChangePassword,
    isValidated: isPasswordValidated,
  } = useValidateInput({
    initialValue: '',
    validates: [validatePassword],
  });

  const {
    value: passwordConfirm,
    errors: passwordConfirmErrors,
    onChange: onChangePasswordConfirm,
    isValidated: isPasswordConfirmValidated,
  } = useValidateInput({
    initialValue: '',
    validates: [(value: string) => validatePasswordConfirm(value, password)],
  });

  const disabled = !isEmailValidated || !isNameValidated || !isPasswordValidated || !isPasswordConfirmValidated;

  const handleSubmit = async () => {
    const response = await postSignUp();
    if (response.status === 201) {
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
            <FormField.ErrorMessage value={Array.from(emailErrors)[0]} />
          </FormField>
          <FormField>
            <FormField.Label label="닉네임" />
            <FormField.Input
              value={name}
              name="name"
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChangeName(e)}
            />
            <FormField.ErrorMessage value={Array.from(nameErrors)[0]} />
          </FormField>
          <FormField>
            <FormField.Label label="비밀번호" />
            <FormField.Input
              value={password}
              name="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChangePassword(e)}
            />
            <FormField.ErrorMessage value={Array.from(passwordErrors)[0]} />
          </FormField>
          <FormField>
            <FormField.Label label="비밀번호 확인" />
            <FormField.Input
              value={passwordConfirm}
              name="passwordConfirm"
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChangePasswordConfirm(e)}
            />
            <FormField.ErrorMessage value={Array.from(passwordConfirmErrors)[0]} />
          </FormField>
          <Button
            label="회원가입"
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

export default AuthPage;

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
