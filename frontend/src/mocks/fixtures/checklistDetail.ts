import { nearSubway } from '@/mocks/fixtures/subway';
import { ChecklistInfo } from '@/types/checklist';

export const checklistDetail: ChecklistInfo = {
  checklistId: 1,
  isLiked: true,
  room: {
    roomName: '아름다운 방',
    address: '서울 송파구 올림픽로35다길 42',
    buildingName: '한국루터회관',
    deposit: undefined,
    rent: 50,
    maintenanceFee: 5,
    contractTerm: 12,
    floorLevel: '반지하/지하',
    floor: undefined,
    realEstate: undefined,
    structure: '오픈형 원룸',
    size: 25,
    occupancyMonth: 9,
    occupancyPeriod: '중순',
    includedMaintenances: [2],
    createdAt: '2024-02-01T10:00:00Z',
  },
  options: [
    { optionId: 1, optionName: '에어컨' },
    { optionId: 2, optionName: '냉장고' },
    { optionId: 3, optionName: '세탁기' },
  ],
  categories: [
    {
      categoryId: 1,
      categoryName: '방 컨디션',
      questions: [
        {
          questionId: 1,
          title: '방의 상태는 어떤가요?',
          subtitle: '방의 전반적인 상태에 대한 평가를 부탁드립니다.',
          answer: 'GOOD',
          highlights: ['방의 상태'],
        },
        {
          questionId: 2,
          title: '위치에 대한 만족도는?',
          subtitle: '위치가 편리한가요?',
          answer: 'NONE',
          highlights: ['위치'],
        },
      ],
    },
    {
      categoryId: 2,
      categoryName: '외부',
      questions: [
        {
          questionId: 3,
          title: '시설이 잘 작동하나요?',
          subtitle: '모든 시설이 제대로 작동하는지 확인해 주세요.',
          answer: 'NONE',
          highlights: ['시설', '작동'],
        },
        {
          questionId: 4,
          title: '청결 상태는 어떤가요?',
          subtitle: '방의 청결 상태를 평가해 주세요.',
          answer: 'BAD',
          highlights: ['청결 상태'],
        },
      ],
    },
  ],
  stations: nearSubway,
};
