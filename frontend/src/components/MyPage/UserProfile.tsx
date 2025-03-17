import useGetUserQuery from '@/hooks/query/useGetUserQuery';

const UserProfile = () => {
  const { data: user } = useGetUserQuery();

  return (
    <>
      <div>{user?.userName}님</div>
      <div>오늘도 방끗과 함께 방긋 웃어요!</div>
    </>
  );
};

export default UserProfile;
