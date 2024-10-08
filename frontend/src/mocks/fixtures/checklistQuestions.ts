import { ChecklistCategory } from '@/types/checklist';

export const checklistQuestions: { categories: ChecklistCategory[] } = {
  categories: [
    {
      categoryId: 1,
      categoryName: '방 컨디션',
      questions: [
        {
          questionId: 1,
          title: '화장실이 깨끗한가요?',
          subtitle: null,
          highlights: ['화장실'],
        },
        {
          questionId: 2,
          title: '수압 및 물 빠짐이 괜찮은가요?',
          subtitle: null,
          highlights: ['수압', '물 빠짐'],
        },
        {
          questionId: 3,
          title: '수압/배수를 확인해주세요.',
          subtitle: '화장실과 주방을 확인해주세요',
          highlights: ['수압', '배수'],
        },
        {
          questionId: 4,
          title: '수압/배수를 확인해주세요.',
          subtitle: '화장실과 주방을 확인해주세요',
          highlights: ['수압', '배수'],
        },
        {
          questionId: 5,
          title: '수압/배수를 확인해주세요.',
          subtitle: null,
          highlights: ['수압', '배수'],
        },
        {
          questionId: 6,
          title: '벌레가 나온 흔적은 없나요?',
          subtitle: '벌레 퇴치약이 부착되어있는지, 싱크대 하부장 경첩에 배설물이 있는지 확인하세요.',
          highlights: ['벌레', '퇴치약', '배설물'],
        },
        {
          questionId: 7,
          title: '수압/배수를 확인해주세요.',
          subtitle: '화장실과 주방을 확인해주세요',
          highlights: ['수압', '배수'],
        },
        {
          questionId: 8,
          title: '자취방의 보안 시설이 잘 갖추어져 있나요? (도어락, 창문 잠금장치 등)',
          subtitle: null,
          highlights: ['보안 시설', '도어락'],
        },
        {
          questionId: 9,
          title: '수압/배수를 확인해주세요.',
          subtitle: '화장실과 주방을 확인해주세요',
          highlights: ['수압', '배수'],
        },
      ],
    },

    {
      categoryId: 2,
      categoryName: '창문',
      questions: [
        {
          questionId: 1,
          title: '창문의 수압/배수를 확인해주세요.',
          subtitle: '화장실과 주방을 확인해주세요',
          highlights: ['창문', '수압', '배수'],
        },
        {
          questionId: 2,
          title: '창문의 수압/배수를 확인해주세요.',
          subtitle: null,
          highlights: ['창문', '수압', '배수'],
        },
        {
          questionId: 3,
          title: '창문의 수압/배수를 확인해주세요.',
          subtitle: '화장실과 주방을 확인해주세요',
          highlights: ['창문', '수압', '배수'],
        },
      ],
    },
    {
      categoryId: 3,
      categoryName: '화장실',
      questions: [
        {
          questionId: 1,
          title: '화장실의 수압/배수를 확인해주세요.',
          subtitle: '화장실과 주방을 확인해주세요',
          highlights: ['화장실', '수압', '배수'],
        },
        {
          questionId: 2,
          title: '화장실의 수압/배수를 확인해주세요.',
          subtitle: null,
          highlights: ['화장실', '수압', '배수'],
        },
        {
          questionId: 3,
          title: '화장실의 수압/배수를 확인해주세요.',
          subtitle: '화장실과 주방을 확인해주세요',
          highlights: ['화장실', '수압', '배수'],
        },
      ],
    },
    {
      categoryId: 4,
      categoryName: '보안',
      questions: [
        {
          questionId: 1,
          title: '보안 시설의 수압/배수를 확인해주세요.',
          subtitle: '화장실과 주방을 확인해주세요',
          highlights: ['보안 시설', '수압', '배수'],
        },
        {
          questionId: 2,
          title: '보안 시설의 수압/배수를 확인해주세요.',
          subtitle: null,
          highlights: ['보안 시설', '수압', '배수'],
        },
        {
          questionId: 3,
          title: '보안 시설의 수압/배수를 확인해주세요.',
          subtitle: '화장실과 주방을 확인해주세요',
          highlights: ['보안 시설', '수압', '배수'],
        },
      ],
    },
    {
      categoryId: 5,
      categoryName: '외부',
      questions: [
        {
          questionId: 1,
          title: '외부의 수압/배수를 확인해주세요.',
          subtitle: '화장실과 주방을 확인해주세요',
          highlights: ['외부', '수압', '배수'],
        },
        {
          questionId: 2,
          title: '외부의 수압/배수를 확인해주세요.',
          subtitle: null,
          highlights: ['외부', '수압', '배수'],
        },
        {
          questionId: 3,
          title: '외부의 수압/배수를 확인해주세요.',
          subtitle: '화장실과 주방을 확인해주세요',
          highlights: ['외부', '수압', '배수'],
        },
      ],
    },
  ],
};
