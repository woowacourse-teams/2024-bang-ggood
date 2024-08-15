import { ChecklistInfo } from '@/types/checklist';

export const checklistDetail: ChecklistInfo = {
  checklistId: 1,
  score: 88,
  isLiked: true,
  room: {
    roomName: '아름다운 방',
    address: '서울시 강남구 테헤란로 123',
    deposit: 1000,
    rent: 50,
    fee: 5,
    contractTerm: 12,
    floor: 5,
    station: '강남역',
    walkingTime: 10,
    realEstate: '부동산A',
    type: '오피스텔',
    structure: '오픈형 원룸',
    size: 25,
    floorLevel: '지상',
    occupancyMonth: 9,
    occupancyPeriod: '중순',
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
      categoryName: '주거지',
      questions: [
        {
          questionId: 1,
          title: '방의 상태는 어떤가요?',
          subtitle: '방의 전반적인 상태에 대한 평가를 부탁드립니다.',
          answer: 'GOOD',
        },
        {
          questionId: 2,
          title: '위치에 대한 만족도는?',
          subtitle: '위치가 편리한가요?',
          answer: 'NONE',
        },
      ],
    },
    {
      categoryId: 2,
      categoryName: '시설',
      questions: [
        {
          questionId: 3,
          title: '시설이 잘 작동하나요?',
          subtitle: '모든 시설이 제대로 작동하는지 확인해 주세요.',
          answer: 'NONE',
        },
        {
          questionId: 4,
          title: '청결 상태는 어떤가요?',
          subtitle: '방의 청결 상태를 평가해 주세요.',
          answer: 'BAD',
        },
      ],
    },
  ],
};
