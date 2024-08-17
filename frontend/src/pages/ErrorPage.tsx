import styled from '@emotion/styled';
import { useNavigate, useRouteError } from 'react-router-dom';

import { BangBangCryIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import { flexColumn } from '@/styles/common';

const ErrorPage = () => {
  const error = useRouteError();
  const { message } = error as Error;

  const navigate = useNavigate();

  const reset = () => {
    navigate('/', { replace: true });
  };

  return (
    <>
      <Header left={<Header.Logo />} />
      <S.Wrapper>
        <BangBangCryIcon width={300} height={100} />
        <S.TextWrapper>
          <S.Text>에러가 발생했습니다!</S.Text>
          <S.Text>{message}</S.Text>
          <Button onClick={reset} label="홈페이지로 돌아가기" />
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
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Text: styled.div<{ $cursor?: boolean }>`
    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.large};
    ${({ $cursor }) => $cursor && `cursor:pointer;`}
  `,
  TextWrapper: styled.div`
    ${flexColumn}
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  `,
};
