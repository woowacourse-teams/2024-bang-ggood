import styled from '@emotion/styled';

import { ToastConfirmIcon, ToastErrorIcon, ToastInfoIcon } from '@/assets/assets';
import { FOOTER_SIZE } from '@/constants/style';
import { boxShadowSpread, flexCenter, flexColumn, flexRow } from '@/styles/common';
import { ToastType } from '@/types/toast';
import { fontStyle } from '@/utils/fontStyle';
import { getOpacityColor } from '@/utils/getOpacityColor';

interface Props {
  type: ToastType;
  message: string;
}

const renderIcon = (type: string) => {
  if (type === 'error') return <ToastErrorIcon />;
  if (type === 'confirm') return <ToastConfirmIcon />;
  if (type === 'info') return <ToastInfoIcon />;
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
    border-radius: 1rem;
    box-shadow: 0 0.2rem 0.2rem rgb(0 0 0 / 25%);
    box-sizing: border-box;
    gap: 1.4rem;

    background-color: ${({ theme }) => getOpacityColor(theme.color.gray[600], 0.85)};
  `,
  Text: styled.div`
    ${flexColumn};
    width: 100%;

    color: ${({ theme }) => theme.color.mono.white};
    white-space: pre-line;
    ${({ theme }) => fontStyle(theme.font.body[2].B)}
  `,
};
