import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserInfo, postSignIn } from '@/apis/user';
import { BangBangIcon, BangGgoodTextIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import FormField from '@/components/_common/FormField/FormField';
import { ROUTE_PATH } from '@/constants/routePath';
import useToast from '@/hooks/useToast';
import useValidateInput from '@/hooks/useValidateInput';
import { flexCenter, title3 } from '@/styles/common';
import { validateEmail } from '@/utils/validate';

const SignInPage = () => {
  const { showToast } = useToast();
  const [postErrorMessage, setPostErrorMessage] = useState('');
  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    const response = await postSignIn({ email, password });
    if (response.status === 200) {
      const result = await getUserInfo();
      showToast({ message: `${result?.userName}님, 환영합니다.`, type: 'confirm' });
      return navigate(ROUTE_PATH.home);
    } else {
      const errorData = await response.json();
      const errorMessage = errorData.message;
      setPostErrorMessage(errorMessage);
    }
  };

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
        <FormField.ErrorMessage value={postErrorMessage} />
        <Button
          label="로그인 하기"
          size="full"
          isSquare={true}
          color={'dark'}
          onClick={handleSubmit}
          disabled={disabled}
        />
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
