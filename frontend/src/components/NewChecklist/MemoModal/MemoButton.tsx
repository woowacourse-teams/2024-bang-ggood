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
    z-index: ${({ theme }) => theme.zIndex.FLOATING_BUTTON};

    justify-content: center;

    @media (width >= 600px) {
      left: 50%;
      max-width: 600px;
      transform: translateX(-50%);
    }

    width: 100%;
  `,
  Button: styled.button`
    display: flex;
    width: 120px;
    padding: 12px;
    align-items: center;
    justify-content: center;
    border: none;

    border-radius: 15px 15px 0 0;
    ${title3};
    ${boxShadow};
    outline: none;
    cursor: pointer;

    background-color: ${({ theme }) => theme.palette.yellow500};
  `,
};
