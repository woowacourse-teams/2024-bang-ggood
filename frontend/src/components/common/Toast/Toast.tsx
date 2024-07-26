import styled from '@emotion/styled';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { flexCenter, title4 } from '@/styles/common';

interface Props {
  message: string;
  onClose: () => void;
  duration: number;
}

const toastRoot = document.getElementById('toast');

const Toast = (props: Props) => {
  const { message, onClose, duration } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration * 1000);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return createPortal(
    <S.Container>
      <S.InnerBox>{message}</S.InnerBox>
    </S.Container>,
    toastRoot,
  );
};

export default Toast;

const Container = styled.div`
  position: fixed;
  bottom: 50px;
  left: 50%;

  transform: translateX(-50%);
`;

const InnerBox = styled.div`
  z-index: 10;
  width: 314px;
  height: 40px;

  background-color: ${({ theme }) => theme.palette.green500};

  color: white;
  border-radius: 8px;
  box-shadow: 0 2px 2px rgb(0 0 0 / 25%);

  ${title4}
  ${flexCenter};
`;

const S = {
  Container,
  InnerBox,
};
