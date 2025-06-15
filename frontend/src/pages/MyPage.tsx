import Header from '@/components/_common/Header/Header';
import FeatureSection from '@/components/MyPage/FeatureSection';
import ProfileSection from '@/components/MyPage/ProfileSection';

const MyPage = () => {
  return (
    <>
      <Header center={"마이페이지"} isTransparent transparentRatio={0} />
      <ProfileSection />
      <FeatureSection />
    </>
  );
};

export default MyPage;
