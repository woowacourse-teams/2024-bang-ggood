export const DefaultChecklistTabsNames = [
  { id: 0, name: '기본 정보' },
  {
    id: 1,
    name: '옵션',
  },
  {
    id: 2,
    name: '방 컨디션',
  },
  {
    id: 3,
    name: '창문',
  },
  {
    id: 4,
    name: '화장실',
  },
  {
    id: 5,
    name: '보안',
  },
];

export const DefaultQuestionSelectTabsNames = [
  {
    id: 0,
    name: '방 컨디션',
  },
  {
    id: 1,
    name: '창문',
  },
  {
    id: 2,
    name: '화장실',
  },
  {
    id: 3,
    name: '보안',
  },
  {
    id: 4,
    name: '외부',
  },
];

export const FirstCategoryQuestion = [
  { id: 0, question: '곰팡이가 핀 곳 없이 깨끗한가요?' },
  { id: 1, question: '창 밖의 뷰가 가로막힘 없이 트여있나요?' },
  { id: 2, question: '화장실이 깨끗한가요?' },
  { id: 3, question: '잠금장치가 있는 공동 현관문이 있나요?' },
];

export const FirstAllCategoryQuestion = [
  ...FirstCategoryQuestion,
  { id: 4, question: '주변 도로가 밤에도 충분히 밝은가요?' },
];
