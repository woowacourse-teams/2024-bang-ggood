import { ErrorBoundary } from 'react-error-boundary';

import ToggleButton from '@/components/_common/Button/ToggleButton';
import ListErrorFallback from '@/components/_common/errorBoundary/ListErrorFallback';
import TitleErrorFallback from '@/components/_common/errorBoundary/TitleErrorFallback';
import Header from '@/components/_common/Header/Header';
import ArticleListContainer from '@/components/ArticleList/ArticleListContainer';
import ArticleListTitle from '@/components/ArticleList/ArticleListTitle';
import { ArticleThumbnailCardCarousel } from '@/components/ArticleList/ArticleThumbnailCardCarousel';
import SkArticleList from '@/components/skeleton/Article/SkArticleList';
import { useTrackPageView } from '@/service/amplitude/useTrackPageView';
import { flexRow } from '@/styles/common';
import theme from '@/styles/theme';
import { ARTICLE_TYPES, ArticleType } from '@/types/article';
import styled from '@emotion/styled';
import { Suspense, useState } from 'react';

const ArticleListPage = () => {
  useTrackPageView({ eventName: '[View] 아티클 리스트 페이지' });

  const [selectKeyword, setSelectedKeyword] = useState<ArticleType | '전체'>('전체');

  return (
    <div style={{ backgroundColor: theme.color.gray[50], minHeight: '100dvh' }}>
      <Header center={<Header.Text>아티클</Header.Text>} />
      <div style={{ padding: '1rem 1.6rem', backgroundColor: theme.color.mono.white }}>
        <ArticleThumbnailCardCarousel />
      </div>

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

      <div style={{ padding: '1rem 1.6rem', borderTop: `1px solid ${theme.color.gray[100]}` }}>
        <ErrorBoundary fallback={<TitleErrorFallback title="방 구하기 전 꼭 필요한 이야기" />}>
          <Suspense fallback={<TitleErrorFallback title="방 구하기 전 꼭 필요한 이야기" />}>
            <ArticleListTitle />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={ListErrorFallback}>
          <Suspense fallback={<SkArticleList />}>
            <ArticleListContainer selectKeyword={selectKeyword} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default ArticleListPage;

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
