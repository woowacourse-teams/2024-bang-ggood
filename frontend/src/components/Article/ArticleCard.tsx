import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants/routePath';
import { boxShadow, flexColumn, title3 } from '@/styles/common';
import { Article } from '@/types/article';
import formattedDate from '@/utils/formattedDate';
import getSeqColor from '@/utils/getSeqColor';

interface Props {
  article: Article;
}

const ArticleCard = ({ article }: Props) => {
  const navigate = useNavigate();
  const { articleId, keyword, title, summary, createdAt } = article;

  const { color500 } = getSeqColor(articleId);

  const handleClick = () => {
    navigate(ROUTE_PATH.articleOne(articleId));
  };

  return (
    <S.Container onClick={handleClick}>
      <S.Keyword bgColor={color500}> {keyword}</S.Keyword>
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
    gap: 8px;
    width: auto;
    box-sizing: border-box;
    padding: 16px;

    border-radius: 16px;

    background-color: ${({ theme }) => theme.palette.white};
    ${boxShadow};
  `,
  Keyword: styled.span<{ bgColor: string }>`
    padding: 4px 8px;

    background-color: ${({ bgColor }) => bgColor};

    color: ${({ theme }) => theme.palette.white};
    font-size: ${({ theme }) => theme.text.size.xSmall};
    align-self: flex-start;

    box-sizing: content-box;
    border-radius: 6px;
  `,
  Title: styled.div`
    ${title3}
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
