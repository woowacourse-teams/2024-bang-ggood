import styled from '@emotion/styled';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useParams } from 'react-router-dom';

import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import useGetArticleQuery from '@/hooks/query/useGetArticleQuery';
import { flexSpaceBetween, title1 } from '@/styles/common';
import formattedDate from '@/utils/formattedDate';
import getSeqColor from '@/utils/getSeqColor';

type RouteParams = {
  articleId: string;
};

const ArticleDetailPage = () => {
  const { articleId } = useParams() as RouteParams;
  const { data: article, isLoading } = useGetArticleQuery(articleId);

  const { color500 } = getSeqColor(article?.articleId ?? 0);

  if (isLoading) {
    return <div>ArticleDetailPage is Loading... </div>;
  }

  return (
    <>
      <Header left={<Header.Backward />} />
      <Layout withHeader>
        <S.Row>
          <S.Keyword bgColor={color500}>{article?.keyword}</S.Keyword>
          <S.Date>{formattedDate(article?.createdAt ?? '')}</S.Date>
        </S.Row>
        <S.Title>{article?.title}</S.Title>
        <MarkdownPreview source={article?.contents} />
      </Layout>
    </>
  );
};

export default ArticleDetailPage;

const S = {
  Row: styled.div`
    ${flexSpaceBetween}
  `,
  Keyword: styled.span<{ bgColor: string }>`
    padding: 4px 10px;

    background-color: ${({ bgColor }) => bgColor};

    color: ${({ theme }) => theme.palette.white};
    font-size: ${({ theme }) => theme.text.size.xSmall};
    align-self: flex-start;

    box-sizing: content-box;
    border-radius: 6px;
  `,
  Date: styled.div`
    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
  Title: styled.div`
    margin: 36px;

    ${title1}
    text-align: center;
  `,
  Contents: styled.div`
    line-height: 1.6rem;
    letter-spacing: 0.05rem;
  `,
};
