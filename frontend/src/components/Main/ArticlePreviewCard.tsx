import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import ArrowRight from '@/assets/icons/arrow/ArrowRight';
import ArticleBadge from '@/components/_common/ArticleBadge/ArticleBadge';
import { ROUTE_PATH } from '@/constants/routePath';
import { flexCenter } from '@/styles/common';
import theme from '@/styles/theme';
import { Article } from '@/types/article';
import { fontStyle } from '@/utils/fontStyle';

interface Props {
  index: number;
  article: Article;
}

const ArticlePreviewCard = ({ index, article }: Props) => {
  const navigate = useNavigate();
  const { articleId, keyword, title } = article;

  const handleClickArticle = () => {
    navigate(ROUTE_PATH.articleOne(articleId));
  };

  return (
    <S.Container onClick={handleClickArticle} tabIndex={1} aria-label="클릭하면 해당 아티클 페이지로 이동합니다">
      <ArticleBadge label={keyword} />
      <S.Title>{title}</S.Title>
      <S.ArrowButton>
        <ArrowRight width={16} stroke={theme.color.primary[200]} aria-hidden="true" />
      </S.ArrowButton>
    </S.Container>
  );
};

export default ArticlePreviewCard;

const S = {
  Container: styled.div`
    position: relative;
    width: 18rem;
    height: 20rem;
    padding: 1.6rem;
    border: 1px solid ${({ theme }) => theme.color.gray[100]};

    background-color: ${({ theme }) => theme.color.mono.white};

    color: ${({ theme }) => theme.color.mono.black};
    border-radius: 1.6rem;
    cursor: pointer;

    &:hover,
    &:active {
      background-color: ${({ theme }) => theme.color.gray[100]};
    }
  `,
  Title: styled.div`
    ${({ theme }) => fontStyle(theme.font.headline[1].B)}
    margin-top: 1.6rem;
    word-break: keep-all;
  `,
  ArrowButton: styled.div`
    position: absolute;
    right: 1.6rem;
    bottom: 1.6rem;

    width: 4rem;
    height: 4rem;
    border-radius: 1.6rem;
    ${flexCenter}

    background-color: ${({ theme }) => theme.color.primary[600]};
  `,
};
