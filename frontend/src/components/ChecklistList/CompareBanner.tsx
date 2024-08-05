import styled from '@emotion/styled';

import { ArrowRightYellow, BangBangIcon } from '@/assets/assets';
import { title3 } from '@/styles/common';

interface Props {
  onClick?: () => void;
}

const CompareBanner = ({ onClick }: Props) => {
  return (
    <S.Banner onClick={onClick}>
      <BangBangIcon />
      <S.Title> 가장 최적인 방 비교하러 가기 </S.Title>
      <ArrowRightYellow />
    </S.Banner>
  );
};

export default CompareBanner;

const S = {
  Banner: styled.div`
    display: flex;

    width: 100%;
    height: 75px;
    padding: 16px;
    box-sizing: border-box;

    background-color: ${({ theme }) => theme.palette.yellow200};

    color: ${({ theme }) => theme.palette.black};
    justify-content: space-evenly;
    align-items: center;
    gap: 20px;

    &:hover,
    &:active {
      background-color: ${({ theme }) => theme.palette.yellow300};
    }
  `,
  Box: styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
  `,
  Title: styled.span`
    ${title3}
  `,
};
