import styled from '@emotion/styled';

import { PencilIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import { boxShadow, flexCenter, flexRow } from '@/styles/common';

interface Props {
  onClick?: () => void;
}

const CustomBanner = ({ onClick }: Props) => {
  return (
    <S.Banner onClick={onClick}>
      <S.Wrapper>
        <PencilIcon width={30} height={30} aria-hidden="true" />
        <S.Title>체크리스트 질문 템플릿</S.Title>
      </S.Wrapper>
      <S.Button aria-label="체크리스트 질문 템플릿을 편집하려면 이 버튼을 누르세요." label={'수정하기'} />
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
  Button: styled(Button)`
    padding: 0.6rem 1rem;

    background-color: ${({ theme }) => theme.palette.green500};

    color: ${({ theme }) => theme.palette.white};
    border-radius: 0.8rem;

    font-size: ${({ theme }) => theme.text.size.small};

    cursor: pointer;
  `,
};
