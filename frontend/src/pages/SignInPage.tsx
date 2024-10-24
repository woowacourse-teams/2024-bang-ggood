import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserInfo, postSignIn } from '@/apis/user';
import { BangBangIcon, BangGgoodTextIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import FormField from '@/components/_common/FormField/FormField';
import Header from '@/components/_common/Header/Header';
import { ROUTE_PATH } from '@/constants/routePath';
import usePostSignInQuery from '@/hooks/query/usePostSigninQuery';
import useUserQuery from '@/hooks/query/useUserQuery';
import useToast from '@/hooks/useToast';
import useValidateInput from '@/hooks/useValidateInput';
import { flexCenter, title3, title4 } from '@/styles/common';
import { validateEmail } from '@/utils/authValidation';

const SignInPage = () => {
  const { showToast } = useToast();
  const [postErrorMessage, setPostErrorMessage] = useState('');
  const navigate = useNavigate();

  const {
    value: email,
    getErrorMessage: getEmailErrors,
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

  const { mutate: signIn, isPending, error, isSuccess } = usePostSignInQuery();
  const {} = useUserQuery();
  const handleSubmit2 = async () =>
    signIn({ email, password }, { onSuccess: () => {}, onError: error => setPostErrorMessage(error.message) });

  if (error) {
    setPostErrorMessage(error.message);
  }
  if (isSuccess) {
  }

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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 && !disabled) {
      handleSubmit();
    }
  };

  const handleMoveSignUp = () => {
    navigate(ROUTE_PATH.signUp);
  };

  const handleClickBackward = () => {
    navigate(ROUTE_PATH.root);
  };

  return (
    <>
      <Header left={<Header.Backward onClick={handleClickBackward} />} />
      <S.Wrapper>
        <S.LogoBox>
          <BangBangIcon />
          <BangGgoodTextIcon aria-label="방끗 로고" />
        </S.LogoBox>
        <S.Box>
          <S.Label>로그인</S.Label>
          <FormField onKeyDown={handleKeyDown}>
            <FormField.Label label="이메일" />
            <FormField.Input maxLength={254} value={email} name="email" onChange={onChangeEmail} />
            <FormField.ErrorMessage value={getEmailErrors()} />
          </FormField>
          <FormField>
            <FormField.Label label="비밀번호" />
            <FormField.Input
              maxLength={64}
              value={password}
              name="password"
              onChange={onChangePassword}
              type="password"
            />
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
        <S.NavigateButton onClick={handleMoveSignUp}>아직 방끗 회원이 아니신가요?</S.NavigateButton>
      </S.Wrapper>
    </>
  );
};

export default SignInPage;

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
  Box: styled.div`
    display: flex;
    position: relative;
    width: 30rem;
    flex-direction: column;
    padding: 1.6rem;
    border-radius: 1rem;

    background-color: ${({ theme }) => theme.palette.background};
    gap: 2rem;
  `,
  NavigateButton: styled.div`
    margin-top: 2rem;

    ${title4};
    color: ${({ theme }) => theme.palette.grey400};
    cursor: pointer;

    :hover {
      color: ${({ theme }) => theme.palette.green600};
    }
  `,
};
