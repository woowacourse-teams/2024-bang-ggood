import FooterDefault from '@/components/_common/Footer/FooterDefault';
import Header from '@/components/_common/Header/Header';
import ArticleSection from '@/components/Main/ArticleSection';
import ChecklistSection from '@/components/Main/ChecklistSection';

const MainPage = () => {
  return (
    <>
      <Header left={<Header.Logo />} />
      <ArticleSection />
      <ChecklistSection />
      <FooterDefault />
    </>
  );
};

export default MainPage;
