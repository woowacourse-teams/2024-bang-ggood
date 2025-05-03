import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BangBangIcon, BangGgoodTextIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import FormField from '@/components/_common/FormField/FormField';
import Header from '@/components/_common/Header/Header';
import { ROUTE_PATH } from '@/constants/routePath';
import usePostSignInQuery from '@/hooks/query/usePostSignInQuery';
import useValidateInput from '@/hooks/useValidateInput';
import { flexCenter, flexRow, title3 } from '@/styles/common';
import { validateEmail } from '@/utils/authValidation';
import { fontStyle } from '@/utils/fontStyle';

const SignInPage = () => {
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

  const { mutate: signIn } = usePostSignInQuery();

  const handleSubmit = () =>
    signIn(
      { email, password },
      {
        onError: error => setPostErrorMessage(error.message),
      },
    );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !disabled) {
      handleSubmit();
    }
  };

  const handleMoveToSignUp = () => navigate(ROUTE_PATH.signUp);
  const handleMoveToResetPassword = () => navigate(ROUTE_PATH.resetPassword);
  const handleClickBackward = () => navigate(ROUTE_PATH.root);

  return (
    <>
      <Header left={<Header.Backward onClick={handleClickBackward} />} center="로그인" />
      <S.Wrapper>
        <S.LogoBox>
          <BangBangIcon />
          <BangGgoodTextIcon aria-label="방끗 로고" />
        </S.LogoBox>
        <S.Box>
          <FormField onKeyDown={handleKeyDown}>
            <FormField.Label label="이메일" />
            <FormField.Input maxLength={254} value={email} name="email" onChange={onChangeEmail} />
            {getEmailErrors() && <FormField.ErrorMessage value={getEmailErrors()} />}
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
          {postErrorMessage && <FormField.ErrorMessage value={postErrorMessage} />}
        </S.Box>
        <Button
          label="로그인 하기"
          size="full"
          isSquare={true}
          color={'dark'}
          onClick={handleSubmit}
          disabled={disabled}
          style={{ marginTop: '3rem', marginBottom: '5.6rem' }}
        />
        <S.NavigateButton onClick={handleMoveToSignUp}>아직 방끗 회원이 아니신가요?</S.NavigateButton>
        <S.NavigateButton onClick={handleMoveToResetPassword}>비밀번호를 잊으셨나요?</S.NavigateButton>
      </S.Wrapper>
    </>
  );
};

export default SignInPage;

const S = {
  Wrapper: styled.div`
    ${flexCenter}
    width: calc(100% - 3rem);
    height: calc(100dvh - 56px);
    margin: 0 auto;
    flex-direction: column;
    gap: 1rem;
  `,
  LogoBox: styled.div`
    width: 100%;
    margin-bottom: 8.5rem;
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
    width: 100%;
    flex-direction: column;
    border-radius: 1rem;
    gap: 1.2rem;
  `,
  NavigateButton: styled.div`
    ${flexRow}
    ${flexCenter}
    height: 4.8rem;
    ${({ theme }) => fontStyle(theme.font.body[1].B)}

    color: ${({ theme }) => theme.palette.grey400};
    cursor: pointer;

    :hover {
      color: ${({ theme }) => theme.palette.green600};
    }
  `,
};
