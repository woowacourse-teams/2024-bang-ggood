import styled from '@emotion/styled';

import { BangBangIcon, BangGgoodTextIcon } from '@/assets/assets';
import FormField from '@/components/_common/FormField/FormField';
import { flexCenter, title3 } from '@/styles/common';

const AuthPage = () => {
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
            <FormField.Input />
          </FormField>
          <FormField>
            <FormField.Label label="닉네임" />
            <FormField.Input />
          </FormField>
          <FormField>
            <FormField.Label label="비밀번호" />
            <FormField.Input />
          </FormField>
          <FormField>
            <FormField.Label label="비밀번호 확인" />
            <FormField.Input />
          </FormField>
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
    height: 400px;
    flex-direction: column;
    padding: 16px;
    border-radius: 10px;

    background-color: ${({ theme }) => theme.palette.background};
    gap: 20px;
  `,
};
