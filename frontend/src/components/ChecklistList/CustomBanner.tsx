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
    height: 8rem;
    padding: 1.6rem;

    border-radius: 1.6rem;

    background-color: ${({ theme }) => theme.palette.green500};

    color: ${({ theme }) => theme.palette.white};
    line-height: 1.3rem;
    box-sizing: border-box;
    justify-content: space-evenly;
    align-items: center;
    gap: 0.5rem;

    ${boxShadow};

    &:hover,
    &:active {
      background-color: ${({ theme }) => theme.palette.green600};
    }
  `,
  Title: styled.span`
    ${flexCenter}
    ${title3}
  `,
};
