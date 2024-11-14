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

  const { color500, color200 } = getSeqColor(index);

  const handleClickArticle = () => {
    navigate(ROUTE_PATH.articleOne(articleId));
  };

  return (
    <S.Container
      bgColor={theme.palette.white}
      hoverColor={color200}
      onClick={handleClickArticle}
      tabIndex={1}
      aria-label="클릭하면 해당 아티클 페이지로 이동합니다"
    >
      <S.Keyword bgColor={theme.palette.background} color={color500}>
        {keyword}
      </S.Keyword>
      <S.Title>{title}</S.Title>
      <S.ArrowButton>
        <ArrowRight stroke={color500} aria-hidden="true" />
      </S.ArrowButton>
    </S.Container>
  );
};

export default ArticlePreviewCard;

const S = {
  Container: styled.div<{ bgColor: string; hoverColor: string }>`
    position: relative;
    width: 19rem;
    height: 18rem;
    padding: 1.6rem;

    background-color: ${({ bgColor }) => bgColor};

    color: ${({ theme }) => theme.palette.black};
    box-sizing: border-box;
    border-radius: 2.4rem;
    ${boxShadowSpread}
    cursor: pointer;

    &:hover,
    &:active {
      background-color: ${({ hoverColor }) => hoverColor};
    }
  `,
  Keyword: styled.div<{ bgColor: string; color: string }>`
    display: inline-block;
    padding: 0.4rem 1rem;

    background-color: ${({ bgColor }) => bgColor};

    color: ${({ color }) => color};
    font-weight: ${({ theme }) => theme.text.weight.bold};
    box-sizing: content-box;
    border-radius: 0.6rem;
  `,
  Title: styled.div`
    ${title3}
    margin-top: 1rem;
    word-break: keep-all;
  `,
  ArrowButton: styled.div`
    position: absolute;
    right: 1.6rem;
    bottom: 1.6rem;
  `,
};
