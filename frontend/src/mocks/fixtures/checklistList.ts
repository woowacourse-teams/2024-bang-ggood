import { ChecklistPreview } from '@/types/checklist';

export const checklistList: { checklists: ChecklistPreview[] } = {
  checklists: [
    {
      checklistId: 1,
      roomName: '건대역 오픈형',
      address: '서울 광진구 구의동 센트럴빌',
      deposit: 800,
      rent: 65,
      station: {
        stationName: '잠실(송파구청)',
        stationLine: ['8호선', '2호선'],
        walkingTime: 10,
      },
      createdAt: '2024-01-01T10:00:00Z',
      summary: '전체적으로 무난, 방 크기는 평범',
      isLiked: true,
    },
    {
      checklistId: 2,
      roomName: '설대입구 원룸',
      address: '서울시 관악구 봉천동 관악로 23',
      deposit: 1000,
      rent: 50,
      station: {
        stationName: '서울대입구',
        stationLine: ['2호선'],
        walkingTime: 10,
      },
      createdAt: '2024-02-01T10:00:00Z',
      summary: '트리플 역세권이나 회사에서 조금 멀다.',
      isLiked: false,
    },
    {
      checklistId: 3,
      roomName: '사당역 분리형',
      address: '서울 동작구 사당동',
      deposit: 500,
      rent: 45,
      station: undefined,
      createdAt: '2024-03-01T10:00:00Z',
      summary: '방은 좁으나 싼 가격이 장점!',
      isLiked: false,
    },
    {
      checklistId: 4,
      roomName: '사당역 분리형',
      address: '서울 동작구 사당동',
      deposit: 500,
      rent: 45,
      station: {
        stationName: '사당',
        stationLine: ['4호선', '2호선'],
        walkingTime: 10,
      },
      createdAt: '2024-08-21T10:00:00Z',
      summary: '방은 좁으나 싼 가격이 장점!',
      isLiked: false,
    },
  ],
};
