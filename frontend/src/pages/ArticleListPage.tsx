import { ErrorBoundary } from 'react-error-boundary';

import ListErrorFallback from '@/components/_common/errorBoundary/ListErrorFallback';
import TitleErrorFallback from '@/components/_common/errorBoundary/TitleErrorFallback';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import ArticleListContainer from '@/components/ArticleList/ArticleListContainer';
import ArticleListTitle from '@/components/ArticleList/ArticleListTitle';
import SkArticleList from '@/components/skeleton/Article/SkArticleList';
import { useTrackPageView } from '@/service/amplitude/useTrackPageView';
import theme from '@/styles/theme';
import { Suspense } from 'react';

const ArticleListPage = () => {
  useTrackPageView({ eventName: '[View] 아티클 리스트 페이지' });

  const [selectKeyword, setSelectedKeyword] = useState<ArticleType | '전체'>('전체');

  return (
    <>
      <Header center={<Header.Text>아티클</Header.Text>} />
      <Layout bgColor={theme.color.gray[50]} withHeader withFooter>
        <ErrorBoundary fallback={<TitleErrorFallback title="방 구하기 전 꼭 필요한 이야기" />}>
          <Suspense fallback={<TitleErrorFallback title="방 구하기 전 꼭 필요한 이야기" />}>
            <ArticleListTitle />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={ListErrorFallback}>
          <Suspense fallback={<SkArticleList />}>
            <ArticleListContainer />
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </>
      <div style={{ padding: '1rem 1.6rem' }}>
        <ArticleThumbnailCardCarousel />
        <div style={{ backgroundColor: theme.color.gray[50] }}>
          <section>
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
    </div>
  );
};

export default ArticleListPage;
