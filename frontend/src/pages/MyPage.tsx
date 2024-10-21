import Header from '@/components/_common/Header/Header';
import FeatureSection from '@/components/MyPage/FeatureSection';
import ProfileSection from '@/components/MyPage/ProfileSection';

const MyPage = () => {
  return (
    <>
      <Header center={<Header.Text>마이페이지</Header.Text>} isTransparent />
      <ProfileSection />
      <FeatureSection />
    </>
  );
};

export default MyPage;
