import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants/routePath';
import { boxShadowSpread, flexRow, title2, title3 } from '@/styles/common';

const AdminPage = () => {
  return (
    <S.PageWrapper>
      <S.QuestionBox>
        <S.QuestionText>Is Hailey God?</S.QuestionText>
        <S.ButtonWrapper>
          <S.Button color={'red'}>No</S.Button>
          <Link to={ROUTE_PATH.articleEditor}>
            <S.Button>Yes</S.Button>
          </Link>
        </S.ButtonWrapper>
      </S.QuestionBox>
    </S.PageWrapper>
  );
};

export default AdminPage;

const S = {
  PageWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* 전체 화면 높이에 맞춰 정렬 */

    background-color: ${({ theme }) => theme.palette.white};
  `,

  QuestionBox: styled.div`
    padding: 2rem;

    background-color: ${({ theme }) => theme.palette.white};

    text-align: center;
    border-radius: 10px;
    ${boxShadowSpread}
  `,

  QuestionText: styled.h2`
    margin-bottom: 2rem;

    color: ${({ theme }) => theme.palette.black};
    ${title2}
  `,
  ButtonWrapper: styled.div`
    ${flexRow}
    justify-content: center;
    gap: 1rem;
  `,
  Button: styled.button<{ color?: string }>`
    padding: 0.8rem 2rem;
    border: none;

    background-color: ${({ theme, color }) => (color === 'red' ? theme.palette.red500 : theme.palette.green500)};

    color: ${({ theme }) => theme.palette.white};
    ${title3}
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${({ theme, color }) => (color === 'red' ? theme.palette.red600 : theme.palette.green600)};
    }
  `,
};
