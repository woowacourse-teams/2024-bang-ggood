import ToggleButton from '@/components/_common/Button/ToggleButton';
import { flexRow } from '@/styles/common';
import { ARTICLE_TYPES, ArticleType } from '@/types/article';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

const ArticleKeywordSelectionSection = ({
  selectKeyword,
  setSelectedKeyword,
}: {
  selectKeyword: ArticleType | '전체';
  setSelectedKeyword: (keyword: ArticleType | '전체') => void;
}) => {
  const theme = useTheme();
  return (
    <section style={{ backgroundColor: theme.color.mono.white }}>
      <S.ScrollBox>
        {(['전체', ...ARTICLE_TYPES] as const).map(type => (
          <ToggleButton
            key={type}
            label={type}
            selected={selectKeyword === type}
            size="small"
            onClick={() => setSelectedKeyword(type)}
          />
        ))}
      </S.ScrollBox>
    </section>
  );
};

export default ArticleKeywordSelectionSection;

const S = {
  ScrollBox: styled.div`
    width: 100%;
    overflow-x: scroll;
    gap: 0.5rem;
    ${flexRow}
    padding: 1rem 0;

    &:first-of-type {
      padding-left: 1.6rem;
    }
  `,
};
