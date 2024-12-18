import styled from '@emotion/styled';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants/routePath';
import useUserQuery from '@/hooks/query/useUserQuery';
import useToast from '@/hooks/useToast';
import { boxShadowSpread, flexRow, title2, title3 } from '@/styles/common';

const AdminPage = () => {
  const { data: user, isFetched } = useUserQuery();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isFetched && user?.userType !== 'ADMIN') {
      showToast({ message: '해당 페이지 접근 권한이 없습니다.', type: 'error' });
      navigate(ROUTE_PATH.root);
    }
  }, [isFetched]);

  return (
    <S.PageWrapper>
      <S.QuestionBox>
        <S.QuestionText>방끗의 마스코트는?</S.QuestionText>
        <S.ButtonWrapper>
          <S.Button color={'red'}>몰라요</S.Button>
          <Link to={ROUTE_PATH.articleEditor}>
            <S.Button>방방이</S.Button>
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
    height: 100vh;

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
