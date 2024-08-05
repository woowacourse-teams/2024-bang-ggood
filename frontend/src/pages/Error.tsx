import styled from '@emotion/styled';

import { BangBangIcon } from '@/assets/assets';
import Header from '@/components/common/Header/Header';
import { flexColumn } from '@/styles/common';

const Error = () => {
  return (
    <>
      <Header left={<Header.Logo />} />
      <S.Wrapper>
        <BangBangIcon />
        <S.TextWrapper>
          <S.Text> 에러가 발생했어요 ;)</S.Text>
          <S.Text> 재접속 해주세요~!! ☺️ </S.Text>
        </S.TextWrapper>
      </S.Wrapper>
    </>
  );
};

export default Error;

const S = {
  Wrapper: styled.div`
    display: flex;
    width: 100%;
    height: 80vh;
    gap: 10px;
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
    gap: 10px;
    margin-top: 20px;
  `,
};
