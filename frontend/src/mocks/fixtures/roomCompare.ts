import { nearSubway } from '@/mocks/fixtures/subway';
import { ChecklistCompare } from '@/types/checklistCompare';

export const threeRoomsForCompare: ChecklistCompare[] = [
  {
    checklistId: 1,
    roomName: '건대입구역 10분거리 방',
    address: '서울 송파구 올림픽로35다길 42',
    buildingName: '한국루터회관',
    deposit: undefined,
    rent: 50,
    maintenanceFee: 5,
    contractTerm: 12,
    floor: 5,
    realEstate: undefined,
    structure: '오픈형 원룸',
    size: 25,
    floorLevel: '지상',
    occupancyMonth: 9,
    occupancyPeriod: '중순',
    includedMaintenances: [2],
    createdAt: '2024-02-01T10:00:00Z',
    options: [1, 2, 3],
    nearSubwayStations: nearSubway,
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
    nearSubwayStations: nearSubway,
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
    realEstate: '송파 부동산',
    geolocation: {
      latitude: 37.5061912,
      longitude: 127.0508228,
    },
  },
];
