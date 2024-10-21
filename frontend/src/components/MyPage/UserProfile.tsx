import SKMyPage from '@/components/skeleton/MyPage/SKMyPage';
import useUserQuery from '@/hooks/query/useUserQuery';

const UserProfile = () => {
  const { data: user, isLoading } = useUserQuery();

  if (isLoading) return <SKMyPage />;

  return (
    <>
      <div>{user?.userName}님</div>
      <div>오늘도 방끗과 함께 방긋 웃어요! :)</div>
    </>
  );
};

export default UserProfile;
