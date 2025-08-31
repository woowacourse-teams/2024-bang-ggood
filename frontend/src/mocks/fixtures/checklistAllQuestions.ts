import { ChecklistCategoryWithIsSelected } from '@/types/checklist';

export const checklistAllQuestions: { defaultCategories: ChecklistCategoryWithIsSelected[] } = {
  defaultCategories: [
    {
      categoryId: 1,
      categoryName: '보안',
      questions: [
        {
          questionId: 1,
          title: '수압/배수를 확인해주세요.',
          subtitle: '화장실과 주방을 확인해주세요',
          highlights: [],
          isSelected: true,
        },
        {
          questionId: 2,
          title: '벽과 바닥이 깨끗한가요?',
          subtitle: null,
          highlights: [],
          isSelected: true,
        },
        {
          questionId: 3,
          title: '수압/배수를 확인해주세요.',
          subtitle: '화장실과 주방을 확인해주세요',
          highlights: [],
          isSelected: true,
        },
        {
          questionId: 4,
          title: '벽과 바닥이 깨끗한가요?',
          subtitle: null,
          highlights: [],
          isSelected: true,
        },
        {
          questionId: 5,
          title: '수압/배수를 확인해주세요.',
          subtitle: '화장실과 주방을 확인해주세요',
          highlights: [],
          isSelected: false,
        },
        {
          questionId: 6,
          title: '벽과 바닥이 깨끗한가요?',
          subtitle: null,
          highlights: [],
          isSelected: false,
        },
        {
          questionId: 7,
          title: '수압/배수를 확인해주세요.',
          subtitle: '화장실과 주방을 확인해주세요',
          highlights: [],
          isSelected: false,
        },
        {
          questionId: 8,
          title: '벽과 바닥이 깨끗한가요?',
          subtitle: null,
          highlights: [],
          isSelected: false,
        },
        {
          questionId: 9,
          title: '수압/배수를 확인해주세요.',
          subtitle: '화장실과 주방을 확인해주세요',
          highlights: [],
          isSelected: false,
        },
        {
          questionId: 10,
          title: '벽과 바닥이 깨끗한가요?',
          subtitle: null,
          highlights: [],
          isSelected: false,
        },
      ],
    },

    {
      categoryId: 2,
      categoryName: '창문',
      questions: [
        {
          questionId: 11,
          title: '지하철 역이 가깝나요?',
          subtitle: '주변 지도를 참고해 보세요.',
          highlights: [],
          isSelected: true,
        },
      ],
    },
  ],
};
