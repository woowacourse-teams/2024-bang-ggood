import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import MarkdownPreview from '@uiw/react-markdown-preview/nohighlight';
import { useParams } from 'react-router-dom';

import { useGetArticleSuspenseQuery } from '@/hooks/query/useGetArticleSuspenseQuery';
import { flexSpaceBetween } from '@/styles/common';
import { fontStyle } from '@/utils/fontStyle';
import formattedDate from '@/utils/formattedDate';

type RouteParams = {
  articleId: string;
};

const ArticleContent = () => {
  const theme = useTheme();
  const { articleId } = useParams() as RouteParams;
  const { article } = useGetArticleSuspenseQuery(articleId);

  return (
    <>
      <S.Thumbnail src={article.thumbnail || ''} />
      <div style={{ backgroundColor: theme.color.gray[100], padding: '1.6rem' }}>
        <S.Wrapper>
          <S.Row>
            <S.Keyword>{article.keyword}</S.Keyword>
            <S.Date>{formattedDate(article.createdAt ?? '')}</S.Date>
          </S.Row>

          <S.Title>{article.title}</S.Title>
          <MarkdownPreview
            source={article.content}
            style={{ padding: 10 }}
            wrapperElement={{
              'data-color-mode': 'light',
            }}
            rehypeRewrite={(node, index, parent) => {
              if (
                node.type === 'element' &&
                node.tagName === 'a' &&
                parent &&
                parent.type === 'element' &&
                /^h(1|2|3|4|5|6)/.test(parent.tagName)
              ) {
                parent.children = parent.children.slice(1);
              }
            }}
          />
        </S.Wrapper>
      </div>
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

    background-color: ${({ theme }) => theme.color.mono.white};
    border-radius: 1.6rem;
  `,
  Row: styled.div`
    ${flexSpaceBetween}
  `,
  Keyword: styled.span`
    padding: 0.6rem 0.8rem;

    background-color: ${({ theme }) => theme.color.gray[100]};

    color: ${({ theme }) => theme.color.gray[500]};
    ${({ theme }) => fontStyle(theme.font.caption[1].B)}
    align-self: flex-start;

    box-sizing: content-box;
    border-radius: 0.8rem;
  `,
  Date: styled.div`
    color: ${({ theme }) => theme.color.gray[400]};
    ${({ theme }) => fontStyle(theme.font.label[1].R)}
  `,
  Title: styled.h1`
    margin: 1rem;

    ${({ theme }) => fontStyle(theme.font.heading[2].B)}
    text-align: center;
  `,
  EmptyBox: styled.div`
    height: 10rem;
  `,
};
