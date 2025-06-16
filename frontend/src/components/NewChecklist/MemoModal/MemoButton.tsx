import styled from '@emotion/styled';

import Button from '@/components/_common/Button/Button';
import { flexCenter } from '@/styles/common';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

const MemoButton = ({ onClick }: Props) => {
  return (
    <S.Wrapper>
      <S.ButtonWrapper>
        <Button label="메모" onClick={onClick} rounded size="full" />
      </S.ButtonWrapper>
    </S.Wrapper>
  );
};

export default MemoButton;

const S = {
  Wrapper: styled.div`
    ${flexCenter}
    position: fixed;
    bottom: 0;
    z-index: ${({ theme }) => theme.zIndex.FLOATING_BUTTON};

    width: 100%;
    max-width: 60rem;
    height: 8rem;

    justify-content: center;

    background-color: ${({ theme }) => theme.color.gray[200]};
    border-radius: 1.2rem 1.2rem 0 0;
  `,
  ButtonWrapper: styled.div`
    width: 80%;
  `,
};
