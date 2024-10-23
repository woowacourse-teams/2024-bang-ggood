import { ErrorBoundary } from 'react-error-boundary';

import ListErrorFallback from '@/components/_common/errorBoundary/ListErrorFallback';
import TitleErrorFallback from '@/components/_common/errorBoundary/TitleErrorFallback';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import ArticleListContainer from '@/components/ArticleList/ArticleListContainer';
import ArticleListTitle from '@/components/ArticleList/ArticleListTitle';
import { useTrackPageView } from '@/service/amplitude/useTrackPageView';
import theme from '@/styles/theme';

const ArticleListPage = () => {
  useTrackPageView({ eventName: '[View] 아티클 리스트 페이지' });

  return (
    <>
      <Header center={<Header.Text>아티클</Header.Text>} />
      <Layout bgColor={theme.palette.background} withHeader withFooter>
        <ErrorBoundary fallback={<TitleErrorFallback title="방 구하기 전 꼭 필요한 이야기" />}>
          <ArticleListTitle />
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ListErrorFallback}>
          <ArticleListContainer />
        </ErrorBoundary>
      </Layout>
    </>
  );
};

export default ArticleListPage;
