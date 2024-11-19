import styled from '@emotion/styled';
import React from 'react';

import { title3 } from '@/styles/common';
import theme from '@/styles/theme';

type FontSize = 'medium' | 'small';
interface Props {
  title: string;
  highlights: string[];
  fontSize?: FontSize;
}

const highlightText = ({ title, highlights, fontSize = 'medium' }: Props) => {
  if (!highlights || highlights.length === 0) return title;

  const regex = new RegExp(`(${highlights.join('|')})`, 'gi');

  return title.split(regex).map((part, index) =>
    highlights.some(highlight => highlight.toLowerCase() === part.toLowerCase()) ? (
      <S.Highlight key={`highlight-${index}`} fontSize={fontSize}>
        {part}
      </S.Highlight>
    ) : (
      <S.NormalText key={`normal-${index}`} fontSize={fontSize}>
        {part}
      </S.NormalText>
    ),
  );
};

const HighlightText = ({ title, highlights, fontSize }: Props) => {
  return <S.Title>{highlightText({ title, highlights, fontSize })}</S.Title>;
};

export default React.memo(HighlightText);

const S = {
  Title: styled.div`
    display: inline-block;

    width: 100%;
    margin: 0.5rem 0;

    font-size: ${({ theme }) => theme.text.size.medium};
    white-space: normal;
    word-break: break-word;
  `,
  Highlight: styled.span<{ fontSize: FontSize }>`
    display: inline;
    background: linear-gradient(to top, ${theme.palette.yellow400} 50%, transparent 50%);
    ${title3};
    margin: 0 0.2rem;

    font-size: ${({ fontSize, theme }) => (fontSize === 'medium' ? theme.text.size.medium : theme.text.size.small)};
    word-break: break-word;

    white-space: normal;
  `,
  NormalText: styled.span<{ fontSize: FontSize }>`
    display: inline;

    font-size: ${({ fontSize, theme }) => (fontSize === 'medium' ? theme.text.size.medium : theme.text.size.small)};
    word-break: break-word;

    white-space: normal;
  `,
};
