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

const S = {
  Container: styled.div`
    position: fixed;
    bottom: 5rem;
    left: 50%;
    z-index: ${({ theme }) => theme.zIndex.TOAST};

    transform: translateX(-50%);
  `,
  InnerBox: styled.div<{ colorType: ToastType }>`
    width: 32rem;
    height: 4rem;

    background-color: ${({ theme, colorType }) =>
      colorType === 'positive' ? theme.palette.green500 : theme.palette.red500};

    color: ${({ theme }) => theme.palette.white};
    border-radius: 0.8rem;
    box-shadow: 0 0.2rem 0.2rem rgb(0 0 0 / 25%);

    ${title4}
    ${flexCenter};
  `,
};
