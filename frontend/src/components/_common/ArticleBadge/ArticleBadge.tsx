import styled from '@emotion/styled';

import { ArticleType } from '@/types/article';
import { fontStyle } from '@/utils/fontStyle';

type ArticleColor = { text: string; bgColor: string };
const ARTICLE_TYPE_COLOR: Record<ArticleType, ArticleColor> = {
  '계약 꿀팁': {
    text: '#00C96B',
    bgColor: '#E7FDF0',
  },
  '자취 일기': {
    text: '#FFBC0A',
    bgColor: '#FFF9E5',
  },
  '생활 꿀팁': {
    text: '#4F66E0',
    bgColor: '#E6F1FE',
  },
  '동네 추천': {
    text: '#C10007',
    bgColor: '#FFEAE6',
  },
  '방끗 활용법': {
    text: '#FF6900',
    bgColor: '#FFEDD4',
  },
  '우테코 생활': {
    text: '#0084D1',
    bgColor: '#DFF2FE',
  },
  '자취 꿀팁': {
    text: '#8E51FF',
    bgColor: '#EDE9FE',
  },
};

interface Props {
  label: ArticleType;
}
const ArticleBadge = ({ label }: Props) => {
  const color = ARTICLE_TYPE_COLOR[label] ?? { text: '#000', bgColor: '#eee' };
  return <S.Keyword $color={color}>{label}</S.Keyword>;
};

export default ArticleBadge;

const S = {
  Keyword: styled.span<{ $color: ArticleColor }>`
    padding: 0.6rem 0.8rem;

    background-color: ${({ $color }) => $color.bgColor};

    color: ${({ $color }) => $color.text};
    ${({ theme }) => fontStyle(theme.font.caption[1].B)}
    align-self: flex-start;

    box-sizing: content-box;
    border-radius: 0.8rem;
  `,
};
