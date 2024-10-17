import styled from '@emotion/styled';

import { BangBangIcon, BangGgoodTextIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import FormField from '@/components/_common/FormField/FormField';
import useValidateInput from '@/hooks/useValidateInput';
import { flexCenter, title3 } from '@/styles/common';
import { validateEmail } from '@/utils/validate';

const SignInPage = () => {
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
    value: password,
    onChange: onChangePassword,
    isValidated: isPasswordValidated,
  } = useValidateInput({
    initialValue: '',
    validates: [],
  });

  const disabled = !isEmailValidated || !isPasswordValidated;

  return (
    <S.Wrapper>
      <S.LogoBox>
        <BangBangIcon />
        <BangGgoodTextIcon aria-label="방끗 로고" />
      </S.LogoBox>
      <S.Box>
        <S.Label>로그인</S.Label>
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
          <FormField.Label label="비밀번호" />
          <FormField.Input
            value={password}
            name="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChangePassword(e)}
          />
          {/*로그인 오류 메세지 넣어주기*/}
          <FormField.ErrorMessage value={''} />
        </FormField>
        <Button label="로그인 하기" size="full" isSquare={true} color={'dark'} onClick={() => {}} disabled={disabled} />
      </S.Box>
    </S.Wrapper>
  );
};

export default SignInPage;

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
