import styled from '@emotion/styled';

import { Memo } from '@/assets/assets';
import { boxShadow, title3 } from '@/styles/common';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

const MemoButton = ({ onClick }: Props) => {
  return (
    <S.Wrapper>
      <S.Button onClick={onClick}>
        <Memo />
        <span>메모</span>
      </S.Button>
    </S.Wrapper>
  );
};

export default MemoButton;

const S = {
  Wrapper: styled.div`
    display: flex;
    position: fixed;
    bottom: 0;
    left: 50%;
    z-index: ${({ theme }) => theme.zIndex.FLOATING_BUTTON};

    width: 100%;

    justify-content: center;
    max-width: 60rem;
    transform: translateX(-50%);
  `,
  Button: styled.button`
    display: flex;
    width: 12rem;
    padding: 1.2rem;
    align-items: center;
    justify-content: center;
    border: none;
    gap: 1rem;
    border-radius: 1.5rem 1.5rem 0 0;
    ${title3};
    ${boxShadow};
    outline: none;
    cursor: pointer;

    background-color: ${({ theme }) => theme.palette.yellow500};
  `,
};
