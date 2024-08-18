import styled from '@emotion/styled';

import Layout from '@/components/_common/layout/Layout';
import { boxShadow, flexCenter, flexColumn, Skeleton } from '@/styles/common';
import theme from '@/styles/theme';

const SHOW_MOCK_COUNT = 4;

const SkChecklistList = () => {
  return (
    <>
      <Sk.FlexBox>
        <Sk.Banner />
      </Sk.FlexBox>
      <Layout>
        <Sk.ListBox>
          {Array.from({ length: SHOW_MOCK_COUNT }).map((e, i) => {
            return <Sk.PreviewCard key={i} />;
          })}
        </Sk.ListBox>
      </Layout>
      <Sk.Wrapper>
        <Sk.Button />
      </Sk.Wrapper>
    </>
  );
};

const Sk = {
  FlexBox: styled.div`
    padding: 0 16px;
  `,
  ListBox: styled.div`
    ${flexColumn}
    gap:10px;
  `,
  Banner: styled.div`
    ${Skeleton}
    ${flexCenter}

    width: 100%;
    height: 80px;
    padding: 16px;

    border-radius: 16px;

    box-sizing: border-box;
    gap: 5px;
  `,
  PreviewCard: styled.div`
    ${flexColumn}
    width: 100%;
    gap: 10px;
    box-sizing: border-box;
    ${Skeleton}
    border-radius: 8px;

    height: 100px;
    padding: 12px 16px;
    border: 1px solid ${({ theme }) => theme.palette.grey200};

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
    max-width: 600px;
    justify-content: flex-end;

    @media (min-width: ${theme.viewport.MOBILE}px) {
      padding-right: 20px;
    }
  `,
  Button: styled.button`
    ${Skeleton}
    width:100px;
    height: 40px;
    border: none;
    border-radius: 50px;
  `,
};

export default SkChecklistList;
