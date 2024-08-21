import styled from '@emotion/styled';

import { BangBangIcon } from '@/assets/assets';
import Header from '@/components/_common/Header/Header';
import { flexColumn } from '@/styles/common';

const NotFound = () => {
  return (
    <>
      <Header left={<Header.Logo />} />
      <S.Wrapper>
        <BangBangIcon />
        <S.TextWrapper>
          <S.Text> 아직 열심히 작업 중이에요! ;)</S.Text>
          <S.Text> 다음 스프린트에서 만나요~!! ☺️ </S.Text>
        </S.TextWrapper>
      </S.Wrapper>
    </>
  );
};

export default NotFound;

const S = {
  Wrapper: styled.div`
    display: flex;
    width: 100%;
    height: 80vh;
    gap: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Text: styled.div`
    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.large};
  `,
  TextWrapper: styled.div`
    ${flexColumn}
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
  `,
};
