import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import ArrowRight from '@/assets/icons/arrow/ArrowRight';
import { ROUTE_PATH } from '@/constants/routePath';
import { boxShadowSpread, title3 } from '@/styles/common';
import theme from '@/styles/theme';
import { Article } from '@/types/article';
import getSeqColor from '@/utils/getSeqColor';

interface Props {
  index: number;
  article: Article;
}

const ArticlePreviewCard = ({ index, article }: Props) => {
  const navigate = useNavigate();
  const { articleId, keyword, title } = article;

  const { color500, color600 } = getSeqColor(index);

  const handleClickArticle = () => {
    navigate(ROUTE_PATH.articleOne(articleId));
  };

  return (
    <S.Container bgColor={color500} onClick={handleClickArticle}>
      <S.Keyword bgColor={color600}>{keyword}</S.Keyword>
      <S.Title>{title}</S.Title>
      <S.ArrowButton>
        <ArrowRight stroke={color600} />
      </S.ArrowButton>
    </S.Container>
  );
};

export default ArticlePreviewCard;

const S = {
  Container: styled.div<{ bgColor: string }>`
    position: relative;
    width: 190px;
    height: 180px;
    padding: 16px;

    background-color: ${({ bgColor }) => bgColor};

    color: ${theme.palette.white};
    box-sizing: border-box;
    border-radius: 24px;
    ${boxShadowSpread}
  `,
  Keyword: styled.div<{ bgColor: string }>`
    display: inline-block;
    padding: 4px 10px;

    background-color: ${({ bgColor }) => bgColor};
    box-sizing: content-box;
    border-radius: 6px;
  `,
  Title: styled.div`
    ${title3}
    margin-top: 10px;
    word-break: keep-all;

    line-height: 1.6rem;
    letter-spacing: 0.05rem;
  `,
  ArrowButton: styled.div`
    position: absolute;
    right: 16px;
    bottom: 16px;
  `,
};
