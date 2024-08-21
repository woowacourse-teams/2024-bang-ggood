import styled from '@emotion/styled';

import { flexRow, title3 } from '@/styles/common';
import theme from '@/styles/theme';

interface Props {
  title: string;
  highlight: string[];
}

const highlightText = ({ title, highlight }: Props) => {
  if (!highlight || highlight.length === 0) return title;

  const regex = new RegExp(`(${highlight.join('|')})`, 'gi');

  return title
    .split(regex)
    .map((part, index) =>
      highlight.some(word => word.toLowerCase() === part.toLowerCase()) ? (
        <S.Highlight key={index}>{part}</S.Highlight>
      ) : (
        part
      ),
    );
};

const HighlightText = ({ title, highlight }: Props) => {
  return <S.Title>{highlightText({ title, highlight })}</S.Title>;
};

export default HighlightText;

const S = {
  Title: styled.div`
    ${flexRow}
    width: 100%;
    margin: 0.5rem 0;

    font-size: ${({ theme }) => theme.text.size.medium};
    align-items: baseline;
    flex-wrap: wrap;
  `,
  Highlight: styled.p`
    background: linear-gradient(to top, ${theme.palette.yellow500} 50%, transparent 50%);
    ${title3};
    margin: 0 0.2rem;
  `,
};
