import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import ArticleBadge from '@/components/_common/ArticleBadge/ArticleBadge';
import { ROUTE_PATH } from '@/constants/routePath';
import { trackArticleDetail } from '@/service/amplitude/trackEvent';
import { flexColumn } from '@/styles/common';
import { Article } from '@/types/article';
import { fontStyle } from '@/utils/fontStyle';
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
      <S.Date>{formattedDate(createdAt)}</S.Date>
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
    border: 1px solid ${({ theme }) => theme.color.gray[100]};

    background-color: ${({ theme }) => theme.color.mono.white};
    cursor: pointer;

    :hover {
      background-color: ${({ theme }) => theme.color.gray[100]};
    }
  `,
  Title: styled.div`
    ${({ theme }) => fontStyle(theme.font.headline[1].B)}
    margin-top: .8rem;
    word-break: keep-all;
  `,
  Label: styled.div`
    width: 90%;
    ${({ theme }) => fontStyle(theme.font.label[1].R)}

    word-break: keep-all;
  `,
  Date: styled.p`
    ${({ theme }) => fontStyle(theme.font.label[1].R)}
    color: ${({ theme }) => theme.color.gray[400]};
  `,
};
