import Header from '@/components/_common/Header/Header';
import FooterDefault from '@/components/FooterDefault';
import ArticleSection from '@/components/Section/ArticleSection';
import ChecklistSection from '@/components/Section/ChecklistSection';

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
