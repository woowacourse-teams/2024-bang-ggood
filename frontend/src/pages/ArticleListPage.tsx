import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ListErrorFallback from '@/components/_common/errorBoundary/ListErrorFallback';
import TitleErrorFallback from '@/components/_common/errorBoundary/TitleErrorFallback';
import Header from '@/components/_common/Header/Header';
import ArticleKeywordSelectionSection from '@/components/ArticleList/ArticleKeywordSelectionSection';
import ArticleListContainer from '@/components/ArticleList/ArticleListContainer';
import ArticleListTitle from '@/components/ArticleList/ArticleListTitle';
import { ArticleThumbnailCardCarousel } from '@/components/ArticleList/ArticleThumbnailCardCarousel';
import SkArticleList from '@/components/skeleton/Article/SkArticleList';
import { useTrackPageView } from '@/service/amplitude/useTrackPageView';
import theme from '@/styles/theme';
import { ArticleType } from '@/types/article';

const ArticleListPage = () => {
  useTrackPageView({ eventName: '[View] 아티클 리스트 페이지' });

  const [selectKeyword, setSelectedKeyword] = useState<ArticleType | '전체'>('전체');

  return (
    <div style={{ backgroundColor: theme.color.gray[50], minHeight: '100dvh' }}>
      <Header center={<Header.Text>아티클</Header.Text>} />

      <div style={{ padding: '1rem 1.6rem', backgroundColor: theme.color.mono.white }}>
        <ArticleThumbnailCardCarousel />
      </div>

      <ArticleKeywordSelectionSection selectKeyword={selectKeyword} setSelectedKeyword={setSelectedKeyword} />

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
