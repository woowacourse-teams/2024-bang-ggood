import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { BangBangIcon } from '@/assets/assets';
import Header from '@/components/_common/Header/Header';

const SaveCheckListPage = () => {
  return (
    <>
      <Header />

      <S.Wrapper>
        <BangBangIcon />
        <S.TextWrapper>
          <S.Text> 체크리스트가 저장되었습니다</S.Text>
        </S.TextWrapper>
        <Link to="/checklist/1">
          <S.Button>저장된 체크리스트 보러가기</S.Button>
        </Link>
      </S.Wrapper>
    </>
  );
};

export default SaveCheckListPage;

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
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
  `,
  Button: styled.div`
    display: flex;
    margin-top: 3rem;
    padding: 1.6rem 2.4rem;

    background-color: ${({ theme }) => theme.palette.green500};

    color: ${({ theme }) => theme.palette.white};
    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.large};
    justify-content: center;
    align-items: center;
    border-radius: 0.8rem;

    &:hover,
    &:active {
      background-color: ${({ theme }) => theme.palette.green200};
    }
  `,
};
