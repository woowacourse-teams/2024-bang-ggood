import styled from '@emotion/styled';
import { useNavigate, useRouteError } from 'react-router-dom';

import HttpError from '@/apis/error/HttpError';
import { BangBangCryIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import { flexColumn } from '@/styles/common';

const ErrorPage = () => {
  const error = useRouteError() as Error;
  const navigate = useNavigate();

  const reset = () => {
    navigate('/', { replace: true });
  };

  const { message } = error as HttpError;

  return (
    <>
      <Header left={<Header.Logo />} />
      <S.Wrapper>
        <BangBangCryIcon width={300} height={100} />
        <S.TextWrapper>
          <S.Text>에러가 발생했습니다!</S.Text>
          <S.Text>{message}</S.Text>
          <S.HomeButton onClick={reset} label="홈페이지로 돌아가기" />
        </S.TextWrapper>
      </S.Wrapper>
    </>
  );
};

export default ErrorPage;

const S = {
  Wrapper: styled.div`
    display: flex;
    width: 100%;
    height: 80vh;
    gap: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Text: styled.div<{ $cursor?: boolean }>`
    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.medium};
    ${({ $cursor }) => $cursor && `cursor:pointer;`}
  `,
  TextWrapper: styled.div`
    ${flexColumn}
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
  `,
  HomeButton: styled(Button)`
    margin-top: 3rem;
  `,
};
