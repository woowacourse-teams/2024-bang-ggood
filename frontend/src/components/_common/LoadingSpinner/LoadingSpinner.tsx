import styled from '@emotion/styled';

export const LoadingSpinner = () => {
  return <S.Container />;
};

const S = {
  Container: styled.div`
    display: inline-block;
    position: relative;
    width: 4.8rem;
    height: 4.8rem;

    ::after,
    ::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 4.8rem;
      height: 4.8rem;

      animation: animloader 2s linear infinite;
      content: '';
      box-sizing: border-box;
      border-radius: 50%;
      background: ${({ theme }) => theme.palette.yellow600};
    }

    ::after {
      animation-delay: 1s;
    }

    @keyframes animloader {
      0% {
        transform: scale(0);
        opacity: 1;
      }

      100% {
        transform: scale(1);
        opacity: 0;
      }
    }
  `,
};
