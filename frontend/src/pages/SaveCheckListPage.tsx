import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import BangGgoodIcon from '@/assets/bang-ggood-icon.svg';
import HeaderWithLogo from '@/components/HeaderWithLogo';

const SaveCheckListPage = () => {
  return (
    <>
      <HeaderWithLogo />

      <S.Wrapper>
        <BangGgoodIcon />
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
    width: 100%;
    height: 80vh;
    gap: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Text: styled.div`
    font-size: ${({ theme }) => theme.text.size.large};
    font-weight: ${({ theme }) => theme.text.weight.bold};
  `,
  TextWrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  `,
  Button: styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 24px;
    border-radius: 8px;
    font-size: ${({ theme }) => theme.text.size.large};
    font-weight: ${({ theme }) => theme.text.weight.bold};
    color: ${({ theme }) => theme.palette.white};
    background-color: ${({ theme }) => theme.palette.green500};

    &:hover,
    &:active {
      background-color: ${({ theme }) => theme.palette.green200};
    }
  `,
};
