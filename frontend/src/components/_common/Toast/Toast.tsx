import styled from '@emotion/styled';

import useToast from '@/hooks/useToast';
import { flexCenter, title4 } from '@/styles/common';

export const DEFAULT_DURATION = 2;

const Toast = () => {
  const { toast } = useToast(DEFAULT_DURATION);

  if (!toast) return;

  return (
    <S.Container>
      <S.InnerBox>{toast}</S.InnerBox>
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

const InnerBox = styled.div`
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
