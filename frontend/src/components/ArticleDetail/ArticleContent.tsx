import styled from '@emotion/styled';
import MarkdownPreview from '@uiw/react-markdown-preview/nohighlight';
import { useParams } from 'react-router-dom';

import SKArticleDetail from '@/components/skeleton/Article/SKArticleDetail';
import useGetArticleQuery from '@/hooks/query/useGetArticleQuery';
import { flexSpaceBetween, title1 } from '@/styles/common';
import formattedDate from '@/utils/formattedDate';
import getSeqColor from '@/utils/getSeqColor';

type RouteParams = {
  articleId: string;
};

const ArticleContent = () => {
  const { articleId } = useParams() as RouteParams;
  const { data: article, isLoading } = useGetArticleQuery(articleId);

  const { color500 } = getSeqColor(article?.articleId ?? 0);

  if (isLoading) return <SKArticleDetail />;

  return (
    <>
      <S.Thumbnail src={article?.thumbnail || ''} />
      <S.Wrapper>
        <S.Row>
          <S.Keyword bgColor={color500}>{article?.keyword}</S.Keyword>
          <S.Date>{formattedDate(article?.createdAt ?? '')}</S.Date>
        </S.Row>
        <S.Title>{article?.title}</S.Title>
        <MarkdownPreview
          source={article?.content}
          style={{ fontSize: '1.6rem', lineHeight: '2.6rem', fontFamily: 'SUITE Variable' }}
          wrapperElement={{
            'data-color-mode': 'light',
          }}
        />
      </S.Wrapper>
    </>
  );
};

export default ArticleContent;

const S = {
  Thumbnail: styled.img`
    width: 100%;
    height: 25rem;
    object-fit: cover;
  `,
  Wrapper: styled.div`
    padding: 1.6rem 1.6rem 0;
  `,
  Row: styled.div`
    ${flexSpaceBetween}
  `,
  Keyword: styled.span<{ bgColor: string }>`
    padding: 0.4rem 1rem;

    background-color: ${({ bgColor }) => bgColor};

    color: ${({ theme }) => theme.palette.white};
    font-size: ${({ theme }) => theme.text.size.xSmall};
    align-self: flex-start;

    box-sizing: content-box;
    border-radius: 0.6rem;
  `,
  Date: styled.div`
    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
  Title: styled.h1`
    margin: 3.6rem;

    ${title1}
    text-align: center;
  `,
  EmptyBox: styled.div`
    height: 10rem;
  `,
};
