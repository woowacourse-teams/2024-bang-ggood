import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { ArrowRightYellow, BangBangIcon } from '@/assets/assets';
import { title3 } from '@/styles/common';

const CompareBanner = () => {
  return (
    // TODO: 비교 페이지로 링크 변경
    <Link to="/">
      <S.Banner>
        <BangBangIcon />
        <S.Title> 가장 최적인 방 비교하러 가기 </S.Title>
        <ArrowRightYellow />
      </S.Banner>
    </Link>
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
      background-color: ${({ theme }) => theme.palette.yellow500};
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
