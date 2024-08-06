import styled from '@emotion/styled';

import { PencilIcon } from '@/assets/assets';
import { flexCenter, title3 } from '@/styles/common';

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

    background-color: ${({ theme }) => theme.palette.yellow200};

    color: ${({ theme }) => theme.palette.black};
    line-height: 1.3;
    box-sizing: border-box;
    justify-content: space-evenly;
    align-items: center;
    gap: 10px;

    &:hover,
    &:active {
      background-color: ${({ theme }) => theme.palette.yellow300};
    }
  `,
  Title: styled.span`
    ${flexCenter}
    ${title3}
  `,
};
