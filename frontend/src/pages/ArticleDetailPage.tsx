import { ErrorBoundary } from 'react-error-boundary';

import ListErrorFallback from '@/components/_common/errorBoundary/ListErrorFallback';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import ArticleContent from '@/components/ArticleDetail/ArticleContent';

const ArticleDetailPage = () => {
  return (
    <>
      <Header left={<Header.Backward />} isTransparent />
      <Layout withHeader style={{ padding: 0 }}>
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <Layout withHeader>
              <ListErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
            </Layout>
          )}
        >
          <ArticleContent />
        </ErrorBoundary>
      </Layout>
    </>
  );
};

export default ArticleDetailPage;
