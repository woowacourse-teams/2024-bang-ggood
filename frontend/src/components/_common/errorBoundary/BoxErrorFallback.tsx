import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { FallbackProps } from 'react-error-boundary';

import { RetryIcon } from '@/assets/assets';
import { flexCenter, flexColumn } from '@/styles/common';

const BoxErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.refetchQueries();
    resetErrorBoundary();
  };

  return (
    <S.Container role="alert">
      <S.Message aria-live="polite">에러가 발생했습니다 :(</S.Message>
      <S.Error>{error.message}</S.Error>
      <S.RefreshButton onClick={handleRefresh} tabIndex={1}>
        다시 시도하기
        <RetryIcon width={15} />
      </S.RefreshButton>
    </S.Container>
  );
};

export default BoxErrorFallback;

const S = {
  Container: styled.div`
    ${flexColumn}
    ${flexCenter}
    gap: 1rem;
    padding: 2rem;

    border-radius: 8px;
  `,
  Message: styled.h2`
    margin-bottom: 0.8rem;

    color: ${({ theme }) => theme.palette.red500};
    font-size: ${({ theme }) => theme.text.size.small};
  `,
  Error: styled.pre`
    margin-bottom: 1rem;

    color: ${({ theme }) => theme.palette.grey600};
    white-space: pre-wrap;
    word-break: break-word;
  `,
  RefreshButton: styled.button`
    ${flexCenter}
    gap: .5rem;
    padding: 0.6rem 1.2rem;
    border: none;

    background-color: ${({ theme }) => theme.palette.green500};

    color: ${({ theme }) => theme.palette.white};
    font-size: ${({ theme }) => theme.text.size.small};
    border-radius: 4px;
    cursor: pointer;

    &:hover,
    &:active {
      background-color: ${({ theme }) => theme.palette.green600};
    }
  `,
};
