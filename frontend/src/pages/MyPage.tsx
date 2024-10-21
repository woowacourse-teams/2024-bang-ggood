import Header from '@/components/_common/Header/Header';
import FunctionSection from '@/components/MyPage/FunctionSection';
import ProfileSection from '@/components/MyPage/ProfileSection';

const MyPage = () => {
  return (
    <>
      <Header center={<Header.Text>마이페이지</Header.Text>} isTransparent />
      <ProfileSection />
      <FunctionSection />
    </>
  );
};

export default MyPage;
