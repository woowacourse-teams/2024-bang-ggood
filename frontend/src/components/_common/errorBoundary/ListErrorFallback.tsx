import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { FallbackProps } from 'react-error-boundary';

import { RetryIcon } from '@/assets/assets';
import { flexCenter, flexColumn, title4 } from '@/styles/common';

const ListErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.refetchQueries();
    resetErrorBoundary();
  };

  return (
    <S.Container role="alert">
      <S.Message>에러가 발생했습니다 :(</S.Message>
      <S.Error>{error.message}</S.Error>
      <S.RefreshButton onClick={handleRefresh}>
        다시 시도하기
        <RetryIcon width={20} />
      </S.RefreshButton>
    </S.Container>
  );
};

export default ListErrorFallback;

const S = {
  Container: styled.div`
    height: 50vh;
    ${flexColumn}
    ${flexCenter}
    gap: 1.4rem;
    padding: 2rem;

    border-radius: 8px;
  `,
  Message: styled.h2`
    margin-bottom: 1rem;

    color: ${({ theme }) => theme.palette.red500};
    font-size: ${({ theme }) => theme.text.size.medium};
  `,
  Error: styled.pre`
    margin-bottom: 1.5rem;

    color: ${({ theme }) => theme.palette.grey600};
    white-space: pre-wrap;
    word-break: break-word;
  `,
  RefreshButton: styled.button`
    ${flexCenter}
    gap: .5rem;
    padding: 0.8rem 1.6rem;
    border: none;

    background-color: ${({ theme }) => theme.palette.green500};

    color: ${({ theme }) => theme.palette.white};
    ${title4}
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.palette.green600};
    }
  `,
};
