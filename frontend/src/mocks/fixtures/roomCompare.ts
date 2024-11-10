import { ChecklistCompare } from '@/types/checklistCompare';

export const threeRoomsForCompare: ChecklistCompare[] = [
  {
    checklistId: 1,
    roomName: '서울대입구 B방',
    deposit: 1000,
    rent: 30,
    options: [1, 2, 3],
    categories: [
      {
        categoryId: 1,
        categoryName: '청결',
        score: 1,
      },
      {
        categoryId: 2,
        categoryName: '편의시설',

        score: 2,
      },
    ],
    address: '서울시 관악구 봉천동',
    contractTerm: 12,
    floor: 2,
    station: '서울대입구역',
    walkingTime: 5,
    realEstate: '강남 부동산',
    geolocation: {
      latitude: 37.5061912,
      longitude: 127.0508228,
    },
  },
  {
    checklistId: 2,
    roomName: '잠실 A방',
    deposit: 1000,
    rent: 30,
    options: [1, 2, 3],
    categories: [
      {
        categoryId: 1,
        categoryName: '청결도',
        score: 9,
      },
      {
        categoryId: 2,
        categoryName: '편의시설',

        score: 5,
      },
    ],
    address: '서울시 송파구 잠실동',
    contractTerm: 12,
    floor: 3,
    station: '잠실역',
    walkingTime: 7,
    realEstate: '송파 부동산',
    geolocation: {
      latitude: 37.5061912,
      longitude: 127.0508228,
    },
  },
  {
    checklistId: 3,
    roomName: '구의역 C방',
    deposit: 1000,
    rent: 30,
    options: [1, 2, 3],
    categories: [
      {
        categoryId: 1,
        categoryName: '청결도',
        score: 3,
      },
      {
        categoryId: 2,
        categoryName: '편의시설',

        score: 6,
      },
    ],
    address: '서울시 광진구 구의동',
    contractTerm: 12,
    floor: 1,
    station: '구의역',
    walkingTime: 3,
    realEstate: '광진 부동산',
    geolocation: {
      latitude: 37.5061912,
      longitude: 127.0508228,
    },
  },
];
