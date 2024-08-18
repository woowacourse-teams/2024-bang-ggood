import styled from '@emotion/styled';

import useToast from '@/hooks/useToast';
import { ToastType } from '@/store/useToastStore';
import { flexCenter, title4 } from '@/styles/common';

const Toast = () => {
  const { toast, colorType } = useToast();

  if (!toast) return;

  return (
    <S.Container>
      <S.InnerBox colorType={colorType}>{toast}</S.InnerBox>
    </S.Container>
  );
};

export default Toast;

const Container = styled.div`
  position: fixed;
  bottom: 50px;
  left: 50%;
  z-index: ${({ theme }) => theme.zIndex.TOAST};

  transform: translateX(-50%);
`;

const InnerBox = styled.div<{ colorType: ToastType }>`
  width: 314px;
  height: 40px;

  background-color: ${({ theme, colorType }) =>
    colorType === 'positive' ? theme.palette.green500 : theme.palette.red500};

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
