export const threeRoomsForCompare = {
  checklists: [
    {
      checklistId: 1,
      roomName: '서울대입구 B방',
      address: '서울시 관악구',
      floor: 3,
      deposit: 1000,
      rent: 30,
      contractTerm: 12,
      station: '잠실역',
      walkingTime: 10,
      options: [
        { optionId: 1, optionName: '냉장고' },
        { optionId: 2, optionName: '전자레인지' },
        { optionId: 3, optionName: '엘리베이터' },
        { optionId: 4, optionName: '베란다' },
        { optionId: 5, optionName: '반려동물 가능' },
      ],
      realEstate: '방끗공인중개사',
      type: '원룸',
      size: 24,
      floorLevel: '지상',
      rank: 1,
      categories: [
        {
          categoryId: 1,
          categoryName: '청결',
        },
        {
          categoryId: 2,
          categoryName: '편의시설',
        },
      ],
    },
    {
      checklistId: 2,
      roomName: '잠실 A방',
      rank: 2,

      deposit: 1000,
      rent: 30,
      address: '서울시 송파구 잠실동',
      contractTerm: 12,
      floor: 3,
      station: '잠실역',
      walkingTime: 7,
      realEstate: '송파 부동산',
      options: [
        { optionId: 1, optionName: '냉장고' },
        { optionId: 2, optionName: '전자레인지' },
        { optionId: 3, optionName: '엘리베이터' },
      ],
      categories: [
        {
          categoryId: 1,
          categoryName: '청결도',
        },
        {
          categoryId: 2,
          categoryName: '편의시설',
        },
      ],
    },
    {
      checklistId: 3,
      roomName: '서울대입구역 C방',
      rank: 3,
      deposit: 1000,
      rent: 30,
      options: [
        { optionId: 1, optionName: '냉장고' },
        { optionId: 2, optionName: '전자레인지' },
        { optionId: 3, optionName: '엘리베이터' },
      ],
      categories: [
        {
          categoryId: 1,
          categoryName: '청결도',
        },
        {
          categoryId: 2,
          categoryName: '편의시설',
        },
      ],
      address: '서울시 광진구 구의동',
      contractTerm: 12,
      floor: 1,
      station: '동대문역사문화공원역',
      walkingTime: 3,
      realEstate: '광진 부동산',
    },
  ],
};

export const twoRoomsForCompare = {
  checklists: [
    {
      checklistId: 1,
      roomName: '서울대입구 B방',
      rank: 1,

      deposit: 1000,
      rent: 30,
      options: [
        { optionId: 1, optionName: '냉장고' },
        { optionId: 2, optionName: '전자레인지' },
        { optionId: 3, optionName: '엘리베이터' },
      ],
      categories: [
        {
          categoryId: 1,
          categoryName: '청결도',
        },
        {
          categoryId: 2,
          categoryName: '편의시설',
        },
      ],
      address: '서울시 관악구 봉천동',
      contractTerm: 12,
      floor: 2,
      station: '서울대입구역',
      walkingTime: 5,
      realEstate: '강남 부동산',
    },
    {
      checklistId: 2,
      roomName: '잠실 A방',
      rank: 2,

      deposit: 1000,
      rent: 30,
      options: [
        { optionId: 1, optionName: '냉장고' },
        { optionId: 2, optionName: '전자레인지' },
        { optionId: 3, optionName: '엘리베이터' },
      ],
      categories: [
        {
          categoryId: 1,
          categoryName: '청결도',
        },
        {
          categoryId: 2,
          categoryName: '편의시설',

          score: 6,
        },
      ],
      address: '서울시 송파구 잠실동',
      contractTerm: 12,
      floor: 3,
      station: '잠실역',
      walkingTime: 7,
      realEstate: '송파 부동산',
    },
  ],
};
