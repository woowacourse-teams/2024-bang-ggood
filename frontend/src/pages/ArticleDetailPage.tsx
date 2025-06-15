import { ErrorBoundary } from 'react-error-boundary';

import ListErrorFallback from '@/components/_common/errorBoundary/ListErrorFallback';
import Header from '@/components/_common/Header/Header';
import ArticleContent from '@/components/ArticleDetail/ArticleContent';
import SKArticleDetail from '@/components/skeleton/Article/SKArticleDetail';
import { Suspense } from 'react';

const ArticleDetailPage = () => {
  return (
    <>
      <Header left={<Header.Backward />} isTransparent />

      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <ListErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
        )}
      >
        <Suspense fallback={<SKArticleDetail />}>
          <ArticleContent />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default ArticleDetailPage;
