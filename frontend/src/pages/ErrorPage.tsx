import styled from '@emotion/styled';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';

import { BangBangIcon } from '@/assets/assets';
import Header from '@/components/common/Header/Header';
import { flexColumn } from '@/styles/common';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const reset = () => {
    navigate('/', { replace: true });
  };

  if (isRouteErrorResponse(error)) {
    return <div onClick={reset}>라우터 에러: {error.statusText}</div>;
  }

  return (
    <>
      <Header left={<Header.Logo />} />
      <S.Wrapper>
        <BangBangIcon />
        <S.TextWrapper>
          <S.Text> 에러가 발생했어요 ;)</S.Text>
          <S.Text> 재접속 해주세요~!! ☺️ </S.Text>
          <S.Text>에러유형: {isRouteErrorResponse(error) ? `라우터 에러 - ${error.statusText}` : `일반 에러`} </S.Text>
          <S.Text onClick={reset} $cursor>
            홈페이지로 돌아가기
          </S.Text>
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