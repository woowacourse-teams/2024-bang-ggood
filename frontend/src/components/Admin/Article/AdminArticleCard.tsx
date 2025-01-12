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

const AdminArticleCard = ({ article }: Props) => {
  const navigate = useNavigate();
  const { articleId, keyword, title, summary, createdAt } = article;

  const ARTICLE_KEYWORDS = ['방끗 활용법', '동네 추천', '우테코 생활', '자취 꿀팁'];
  const currentColorIndex = ARTICLE_KEYWORDS.findIndex(keyword => keyword === article.keyword);
  const { color500 } = getSeqColor(currentColorIndex);
  const { color500: defaultColor500 } = getSeqColor(articleId);

  const handleClick = () => {
    navigate(ROUTE_PATH.articleEditOne(articleId));
  };

  return (
    <S.Container onClick={handleClick} tabIndex={1}>
      <S.Keyword bgColor={color500 ?? defaultColor500}> {keyword}</S.Keyword>
      <S.Title>{title}</S.Title>
      <S.Label>{summary}</S.Label>
      <S.Label>{formattedDate(createdAt)}</S.Label>
    </S.Container>
  );
};

export default AdminArticleCard;

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
  Keyword: styled.span<{ bgColor: string }>`
    padding: 0.4rem 0.8rem;

    background-color: ${({ bgColor }) => bgColor};

    color: ${({ theme }) => theme.palette.white};
    font-size: ${({ theme }) => theme.text.size.xSmall};
    align-self: flex-start;

    box-sizing: content-box;
    border-radius: 0.6rem;
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
