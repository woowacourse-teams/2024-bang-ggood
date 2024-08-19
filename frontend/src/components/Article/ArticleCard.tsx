import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants/routePath';
import { boxShadow, flexColumn, title2 } from '@/styles/common';
import { Article } from '@/types/article';
import formattedDate from '@/utils/formattedDate';

interface Props {
  article: Article;
}

const ArticleCard = ({ article }: Props) => {
  const navigate = useNavigate();
  const { articleId, keyword, title, summary, createdAt } = article;

  const handleClick = () => {
    navigate(ROUTE_PATH.articleOne(articleId));
  };

  return (
    <S.Container onClick={handleClick}>
      <S.Keyword> {keyword}</S.Keyword>
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
    gap: 12px;
    width: auto;
    box-sizing: border-box;
    padding: 16px;

    border-radius: 16px;

    background-color: ${({ theme }) => theme.palette.white};
    ${boxShadow};
  `,
  Keyword: styled.span`
    align-self: flex-start;
    padding: 4px 10px;

    background-color: ${({ theme }) => theme.palette.grey100};

    color: ${({ theme }) => theme.palette.grey600};
    font-size: ${({ theme }) => theme.text.size.xxSmall};

    box-sizing: content-box;
    border-radius: 6px;
  `,
  Title: styled.div`
    ${title2}
    margin-top: 8px;
    word-break: keep-all;

    line-height: 1.6rem;
    letter-spacing: 0.05rem;
  `,
  Label: styled.div`
    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.xxSmall};
  `,
};
