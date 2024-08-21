import styled from '@emotion/styled';

import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import { boxShadow, flexCenter, flexColumn, Skeleton } from '@/styles/common';
import theme from '@/styles/theme';

const SHOW_MOCK_COUNT = 3;

const SkChecklistList = () => {
  return (
    <>
      <Header center={<Header.Text>체크리스트</Header.Text>} />
      <S.FlexBox>
        <S.Banner />
      </S.FlexBox>
      <Layout>
        <S.ListBox>
          {Array.from({ length: SHOW_MOCK_COUNT }).map((e, i) => {
            return <S.PreviewCard key={i} />;
          })}
        </S.ListBox>
      </Layout>
      <S.Wrapper>
        <S.Button />
      </S.Wrapper>
    </>
  );
};

const S = {
  FlexBox: styled.div`
    padding: 0 1.6rem;
  `,
  ListBox: styled.div`
    ${flexColumn}
    gap:1rem;
  `,
  Banner: styled.div`
    ${Skeleton}
    ${flexCenter}

    width: 100%;
    height: 8rem;
    padding: 1.6rem;

    border-radius: 1.6rem;

    box-sizing: border-box;
    gap: 0.5rem;
  `,
  PreviewCard: styled.div`
    ${flexColumn}
    width: 100%;
    gap: 1rem;
    box-sizing: border-box;
    ${Skeleton}
    border-radius: .8rem;

    height: 10rem;
    padding: 1.2rem 1.6rem;
    border: 0.1rem solid ${({ theme }) => theme.palette.grey200};

    ${boxShadow}
  `,
  Wrapper: styled.div`
    display: flex;
    position: fixed;
    bottom: 10%;
    left: 50%;
    width: 100%;
    padding-right: 10%;

    transform: translateX(-50%);
    max-width: 60rem;
    justify-content: flex-end;

    @media (min-width: ${theme.viewport.MOBILE}rem) {
      padding-right: 2rem;
    }
  `,
  Button: styled.button`
    ${Skeleton}
    width:10rem;
    height: 4rem;
    border: none;
    border-radius: 5rem;
  `,
};

export default SkChecklistList;
