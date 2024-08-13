import styled from '@emotion/styled';

import { PencilIcon } from '@/assets/assets';
import { boxShadow, flexCenter, title3 } from '@/styles/common';

interface Props {
  onClick?: () => void;
}

const CustomBanner = ({ onClick }: Props) => {
  return (
    <S.Banner onClick={onClick}>
      <PencilIcon width={50} height={70} />
      <S.Title>나에게 최적인 체크리스트 만들기</S.Title>
    </S.Banner>
  );
};

export default CustomBanner;

const S = {
  Banner: styled.div`
    ${flexCenter}

    width: 100%;
    height: 80px;
    padding: 16px;

    border-radius: 16px;

    background-color: ${({ theme }) => theme.palette.yellow300};

    color: ${({ theme }) => theme.palette.black};
    line-height: 1.3;
    box-sizing: border-box;
    justify-content: space-evenly;
    align-items: center;
    gap: 5px;

    ${boxShadow};

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
