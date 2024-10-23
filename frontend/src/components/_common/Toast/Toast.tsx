import styled from '@emotion/styled';

import { ToastConfirm, ToastError, ToastInfo } from '@/assets/assets';
import { FOOTER_SIZE } from '@/constants/style';
import { boxShadowSpread, flexCenter, flexColumn, flexRow, title4 } from '@/styles/common';
import { ToastType } from '@/types/toast';

interface Props {
  type: ToastType;
  message: string;
}

const renderIcon = (type: string) => {
  if (type === 'error') return <ToastError />;
  if (type === 'confirm') return <ToastConfirm />;
  if (type === 'info') return <ToastInfo />;
  return null;
};

const Toast = ({ type, message }: Props) => {
  const formattedMessage = message.split('\n').map((line, index) => <span key={index}>{line}</span>);

  return (
    <S.ToastWrapper>
      <S.Toast>
        {renderIcon(type)}
        <S.Text>{formattedMessage}</S.Text>
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
    bottom: ${FOOTER_SIZE + 1}rem;
    left: 50%;
    z-index: ${({ theme }) => theme.zIndex.TOAST};

    transform: translateX(-50%);

    animation: slideUp 0.5s ease-in-out;
    ${boxShadowSpread}
    ${slideUp}
  `,
  Toast: styled.div`
    ${flexCenter}
    ${flexRow}
    width: 34rem;
    padding: 1rem 2rem;
    border-radius: 1.8rem;
    box-shadow: 0 0.2rem 0.2rem rgb(0 0 0 / 25%);
    box-sizing: border-box;
    opacity: 0.95;
    gap: 1.4rem;

    background-color: ${({ theme }) => theme.palette.grey500};
  `,
  Text: styled.div`
    ${flexColumn};
    width: 100%;

    color: ${({ theme }) => theme.palette.white};
    line-height: 1.2;
    white-space: pre-line;

    ${title4};
  `,
};
