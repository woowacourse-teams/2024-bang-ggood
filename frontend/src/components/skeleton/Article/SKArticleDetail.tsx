import styled from '@emotion/styled';

import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import { flexSpaceBetween, Skeleton } from '@/styles/common';

const SKArticleDetail = () => {
  return (
    <>
      <Header left={<Header.Backward />} isTransparent />
      <S.SkeletonThumbnail />
      <Layout withHeader>
        <S.Row>
          <S.SkeletonKeyword />
          <S.SkeletonDate />
        </S.Row>
        <S.SkeletonTitle />
        <S.SkeletonContent />
      </Layout>
    </>
  );
};
export default SKArticleDetail;

const S = {
  SkeletonThumbnail: styled.div`
    width: 100%;
    height: 250px;
    ${Skeleton}
  `,
  Row: styled.div`
    ${flexSpaceBetween}
  `,
  SkeletonKeyword: styled.div`
    width: 100px;
    height: 20px;

    border-radius: 0.6rem;
    ${Skeleton}
  `,
  SkeletonDate: styled.div`
    width: 80px;
    height: 20px;

    border-radius: 0.4rem;
    ${Skeleton}
  `,
  SkeletonTitle: styled.div`
    width: 60%;
    height: 40px;
    margin: 3.6rem auto;

    border-radius: 0.8rem;
    ${Skeleton}
  `,
  SkeletonContent: styled.div`
    width: 100%;
    height: 200px;
    margin: 0 auto;

    border-radius: 0.8rem;
    ${Skeleton}
  `,
};
