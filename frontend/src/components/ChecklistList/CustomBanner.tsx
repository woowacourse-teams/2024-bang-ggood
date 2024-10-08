import styled from '@emotion/styled';

import { PencilIcon } from '@/assets/assets';
import { boxShadow, flexCenter, flexRow } from '@/styles/common';

interface Props {
  onClick?: () => void;
}

const CustomBanner = ({ onClick }: Props) => {
  return (
    <S.Banner onClick={onClick}>
      <S.Wrapper>
        <PencilIcon width={30} height={30} aria-hidden="true" />
        <S.Title>체크리스트 질문</S.Title>
      </S.Wrapper>
      <S.Button>편집하기</S.Button>
    </S.Banner>
  );
};

export default CustomBanner;

const S = {
  Banner: styled.div`
    ${flexCenter}

    width: 100%;
    height: 5rem;
    padding: 1.6rem;

    border-radius: 1.6rem;

    background-color: ${({ theme }) => theme.palette.white};

    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    ${boxShadow};
  `,
  Wrapper: styled.div`
    ${flexRow}
    gap: .5rem;
  `,
  Title: styled.span`
    ${flexCenter}
  `,
  Button: styled.button`
    padding: 0.4rem 0.8rem;

    background-color: ${({ theme }) => theme.palette.green500};

    color: ${({ theme }) => theme.palette.white};
    border-radius: 0.8rem;

    font-size: ${({ theme }) => theme.text.size.xSmall};

    cursor: pointer;
  `,
};
