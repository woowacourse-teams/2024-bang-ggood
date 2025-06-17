import ArticleBadge from '@/components/_common/ArticleBadge/ArticleBadge';
import { ROUTE_PATH } from '@/constants/routePath';
import { trackArticleDetail } from '@/service/amplitude/trackEvent';
import { flexColumn } from '@/styles/common';
import { Article } from '@/types/article';
import { fontStyle } from '@/utils/fontStyle';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const ArticleThumbnailCard = ({ article }: { article: Article }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    trackArticleDetail(article.title);
    navigate(ROUTE_PATH.articleOne(article.articleId));
  };

  return (
    <S.Card thumbnail={article.thumbnail} onClick={handleClick}>
      <ArticleBadge label={article.keyword} />
      <S.Title>{article.title}</S.Title>
    </S.Card>
  );
};

export default ArticleThumbnailCard;

const S = {
  Card: styled.div<{ thumbnail?: string | null }>`
    ${flexColumn};
    position: relative;
    border-radius: 1.6rem;
    width: 100%;
    height: 300px;
    padding: 1.6rem;

    background-size: cover;
    background-position: center;
    background-image: ${({ thumbnail }) => (thumbnail ? `url(${thumbnail})` : 'none')};

    color: ${({ theme }) => theme.color.mono.white};
    gap: 1rem;
    cursor: pointer;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgb(0 0 0 / 20%);
      border-radius: 1.6rem;
    }

    > * {
      position: relative;
      z-index: 1;
    }
  `,

  Title: styled.h3`
    ${({ theme }) => fontStyle(theme.font.heading[2].B)}
  `,
};
