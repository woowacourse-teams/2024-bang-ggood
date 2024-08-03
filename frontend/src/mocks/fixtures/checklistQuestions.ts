export const checklistQuestions = {
  categories: [
    {
      categoryId: 1,
      categoryName: '청결',
      questions: [
        {
          questionId: 1,
          title: '방 안에 물이 새거나 곰팡이가 핀 곳은 없나요?',
          subtitle: '천장, 벽면, 가구 뒤, 장판을 확인하세요.',
        },
        {
          questionId: 4,
          title: '벌레가 나온 흔적은 없나요?',
          subtitle: '벌레 퇴치약이 부착되어있는지, 싱크대 하부장 경첩에 배설물이 있는지 확인하세요.',
        },
      ],
    },
    {
      categoryId: 2,
      categoryName: '방 컨디션',
      questions: [
        {
          questionId: 6,
          title: '수압 및 배수가 괜찮은가요?',
          subtitle: '싱크대와 화장실에서 동시에 물을 틀어보세요.',
        },
        {
          questionId: 7,
          title: '온수가 잘 나오나요?',
          subtitle: null,
        },
        {
          questionId: 8,
          title: '파손된 시설 (창문 / 방충망 / 벽)이 있지 않나요?',
          subtitle: null,
        },
      ],
    },
    {
      categoryId: 3,
      categoryName: '편의시설',
      questions: [
        {
          questionId: 12,
          title: '지하철역과 버스 정류장이 가까운 곳에 있나요?',
          subtitle: null,
        },
      ],
    },
    {
      categoryId: 5,
      categoryName: '주거환경',
      questions: [
        {
          questionId: 18,
          title: '환기가 잘 되는 구조인가요?',
          subtitle: '창문의 크기와 방향을 확인하세요.',
        },
        {
          questionId: 19,
          title: '방음이 잘 되나요?',
          subtitle: '벽을 두드려서 가벽이 아닌지 확인하세요.',
        },
      ],
    },
    {
      categoryId: 6,
      categoryName: '보안',
      questions: [
        {
          questionId: 23,
          title: '출입구와 복도에 CCTV가 설치되어 있나요?',
          subtitle: null,
        },
        {
          questionId: 25,
          title: '자취방의 보안 시설이 잘 갖추어져 있나요? (도어락, 창문 잠금장치 등)',
          subtitle: null,
        },
      ],
    },
    {
      categoryId: 7,
      categoryName: '경제적',
      questions: [
        {
          questionId: 31,
          title: '보증금/전월세 비용이 합리적인가요?',
          subtitle: '관리비도 포함하여 고려하세요.',
        },
      ],
    },
  ],
};
