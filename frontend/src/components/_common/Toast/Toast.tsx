import styled from '@emotion/styled';

import { ToastConfirm, ToastError } from '@/assets/assets';
import { flexCenter, flexRow, title4 } from '@/styles/common';
import { ToastType } from '@/types/toast';

interface Props {
  type: ToastType;
  message: string;
}

const renderIcon = (type: string) => {
  if (type === 'error') return <ToastError />;
  if (type === 'confirm') return <ToastConfirm />;
};

const Toast = ({ type, message }: Props) => {
  return (
    <S.ToastWrapper>
      <S.Toast>
        {renderIcon(type)}
        <S.Text>{message}</S.Text>
      </S.Toast>
    </S.ToastWrapper>
  );
};

export default Toast;

const slideUp = `
  @keyframes slideUp {
    0% {
      transform: translate(-50%, 100%);
      opacity: 0;
    }
    100% {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }
`;

const S = {
  ToastWrapper: styled.div`
    position: fixed;
    bottom: 5rem;
    left: 50%;
    z-index: ${({ theme }) => theme.zIndex.TOAST};

    transform: translateX(-50%);

    animation: slideUp 0.5s ease-in-out;
    ${slideUp}
  `,
  Toast: styled.div`
    ${flexCenter}
    ${flexRow}
    width: 32rem;
    padding: 1rem 2rem;
    border-radius: 1.8rem;
    box-shadow: 0 0.2rem 0.2rem rgb(0 0 0 / 25%);
    box-sizing: border-box;
    opacity: 0.9;

    background-color: ${({ theme }) => theme.palette.grey500};
  `,
  Text: styled.div`
    display: flex;
    flex-grow: 1;

    color: ${({ theme }) => theme.palette.white};

    ${title4}
    ${flexCenter};
  `,
};
