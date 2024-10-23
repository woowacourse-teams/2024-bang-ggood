import Header from '@/components/_common/Header/Header';
import ArticleSection from '@/components/Main/ArticleSection';
import ChecklistSection from '@/components/Main/ChecklistSection';
import { useTrackPageView } from '@/service/amplitude/useTrackPageView';

const MainPage = () => {
  useTrackPageView({ eventName: '[View] 메인 페이지' });

  return (
    <>
      <Header left={<Header.Logo />} />
      <ArticleSection />
      <ChecklistSection />
    </>
  );
};

export default MainPage;
