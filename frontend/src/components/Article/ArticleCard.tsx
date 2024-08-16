import styled from '@emotion/styled';

import ArrowRight from '@/assets/icons/arrow/ArrowRight';
import { title3 } from '@/styles/common';
import theme from '@/styles/theme';
import { Article } from '@/types/article';

interface Props {
  article: Article;
}

const ArticleCard = ({ article }: Props) => {
  return (
    <S.Container>
      <S.Keyword>{article.keyword}</S.Keyword>
      <S.Title>{article.title}</S.Title>
      <S.ArrowButton>
        <ArrowRight stroke={theme.palette.green600} />
      </S.ArrowButton>
    </S.Container>
  );
};

export default ArticleCard;

const S = {
  Container: styled.div`
    position: relative;
    box-sizing: border-box;
    width: 190px;
    height: 180px;
    border-radius: 24px;
    padding: 16px;

    // TODO: id 당 랜덤 값 주기
    color: ${({ theme }) => theme.palette.white};
    background-color: ${({ theme }) => theme.palette.green500};
  `,
  Keyword: styled.div`
    box-sizing: content-box;
    display: inline-block;
    background-color: ${({ theme }) => theme.palette.green600};
    padding: 4px 10px;
    border-radius: 6px;
  `,
  Title: styled.div`
    ${title3}
    margin-top: 10px;
    word-break: keep-all;
    letter-spacing: 0.05rem;
    line-height: 1.6rem;
  `,
  ArrowButton: styled.div`
    position: absolute;
    bottom: 16px;
    right: 16px;
  `,
};
