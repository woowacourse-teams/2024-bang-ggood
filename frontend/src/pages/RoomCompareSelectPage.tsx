import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import CompareSelectCard from '@/components/RoomCompare/CompareSelectCard';
import theme from '@/styles/theme';

const mockRoom = {
  checklistId: 1,
  roomName: '건대역 오픈형',
  address: '서울 광진구 구의동 센트럴빌',
  deposit: 800,
  rent: 65,
  createdAt: '2024-01-01T10:00:00Z',
  summary: '전체적으로 무난, 방 크기는 평범',
  isLiked: true,
};

const RoomCompareSelectPage = () => {
  return (
    <>
      <Header center={<Header.Text>비교할 방 선택하기</Header.Text>} />
      <Layout bgColor={theme.palette.background} withFooter withHeader>
        <CompareSelectCard isSelected={true} room={mockRoom} />
      </Layout>
    </>
  );
};

export default RoomCompareSelectPage;
