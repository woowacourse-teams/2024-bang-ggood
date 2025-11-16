import styled from '@emotion/styled';

import { BangBangCryGrayIcon } from '@/assets/assets';
import ArticleCard from '@/components/ArticleList/ArticleCard';
import { useGetArticleListSuspenseQuery } from '@/hooks/query/useGetArticleListSuspenseQuery';
import { flexCenter, flexColumn } from '@/styles/common';
import { Article, ArticleType } from '@/types/article';

const ArticleListContainer = ({ selectKeyword }: { selectKeyword: ArticleType | '전체' }) => {
  const { articles } = useGetArticleListSuspenseQuery();
  const selectedArticles = articles.filter(article => {
    if (selectKeyword === '전체') return true;
    return article.keyword === selectKeyword;
  });

  if (!selectedArticles.length)
    return (
      <S.EmptyContainer>
        <BangBangCryGrayIcon />
        아직 관련된 아티클이 없어요ㅜ
        <br />
        금방 좋은 아티클들로 돌아올게요!
      </S.EmptyContainer>
    );

  return (
    <S.ListContainer>
      {selectedArticles.map((article: Article) => (
        <ArticleCard key={`article-${article.articleId}`} article={article} />
      ))}
    </S.ListContainer>
  );
};

export default ArticleListContainer;

const S = {
  ListContainer: styled.section`
    ${flexColumn}
    gap: .8rem;
    margin-top: 1.6rem;
  `,
  EmptyContainer: styled.section`
    ${flexColumn}
    ${flexCenter}
    height: 300px;
    gap: 1rem;

    text-align: center;
  `,
};
