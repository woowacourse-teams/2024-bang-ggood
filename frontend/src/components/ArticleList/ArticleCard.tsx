import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import ArticleBadge from '@/components/_common/ArticleBadge/ArticleBadge';
import { ROUTE_PATH } from '@/constants/routePath';
import { trackArticleDetail } from '@/service/amplitude/trackEvent';
import { boxShadow, flexColumn, title3 } from '@/styles/common';
import { Article } from '@/types/article';
import formattedDate from '@/utils/formattedDate';

interface Props {
  article: Article;
}

const ArticleCard = ({ article }: Props) => {
  const navigate = useNavigate();
  const { articleId, keyword, title, summary, createdAt } = article;

  const handleClick = () => {
    trackArticleDetail(article.title);
    navigate(ROUTE_PATH.articleOne(articleId));
  };

  return (
    <S.Container onClick={handleClick} tabIndex={1}>
      <ArticleBadge label={keyword} />
      <S.Title>{title}</S.Title>
      <S.Label>{summary}</S.Label>
      <S.Label>{formattedDate(createdAt)}</S.Label>
    </S.Container>
  );
};

export default ArticleCard;

const S = {
  Container: styled.div`
    ${flexColumn}

    gap: 0.8rem;
    width: auto;
    box-sizing: border-box;
    padding: 1.6rem;

    border-radius: 1.6rem;

    background-color: ${({ theme }) => theme.palette.white};
    ${boxShadow};
    cursor: pointer;

    :hover {
      background-color: ${({ theme }) => theme.palette.grey200};
    }
  `,
  Title: styled.div`
    ${title3}
    margin-top: .8rem;
    word-break: keep-all;
  `,
  Label: styled.div`
    width: 90%;

    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.xSmall};

    word-break: keep-all;
  `,
};
