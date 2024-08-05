import styled from '@emotion/styled';

import { PencilIcon } from '@/assets/assets';
import { title3 } from '@/styles/common';

interface Props {
  onClick?: () => void;
}

const EditBanner = ({ onClick }: Props) => {
  return (
    <S.Banner onClick={onClick}>
      <PencilIcon />
      <S.Title>
        체크리스트
        <br />
        커스텀하기
      </S.Title>
      {/* <ArrowRightYellow /> */}
    </S.Banner>
  );
};

export default EditBanner;

const S = {
  Banner: styled.div`
    display: flex;

    width: 50%;
    height: 75px;
    padding: 16px;

    background-color: ${({ theme }) => theme.palette.green300};

    color: ${({ theme }) => theme.palette.black};
    line-height: 1.3;
    box-sizing: border-box;
    justify-content: space-evenly;
    align-items: center;
    gap: 10px;

    &:hover,
    &:active {
      background-color: ${({ theme }) => theme.palette.green500};
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
