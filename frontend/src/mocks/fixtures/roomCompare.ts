import { nearSubway } from '@/mocks/fixtures/subway';
import { RoomCompare } from '@/types/RoomCompare';

export const roomsForCompare: { checklists: RoomCompare[] } = {
  checklists: [
    {
      checklistId: 1,
      roomName: '건대입구역 10분거리 방',
      address: '서울 송파구 올림픽로35다길 42',
      buildingName: '한국루터회관',
      deposit: 1000,
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
      stations: nearSubway,
      categories: [
        {
          categoryId: 1,
          categoryName: '청결',
          score: 70,
        },
        {
          categoryId: 2,
          categoryName: '편의시설',
          score: 60,
        },
        {
          categoryId: 3,
          categoryName: '화장실',
          score: 40,
        },
        {
          categoryId: 4,
          categoryName: '보안',
          score: 20,
        },
        {
          categoryId: 4,
          categoryName: '보안',
          score: null,
        },
      ],
      geolocation: {
        latitude: 37.5061912,
        longitude: 127.0508228,
      },
    },
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
      options: [4, 5],
      stations: nearSubway,
      categories: [
        {
          categoryId: 1,
          categoryName: '청결',
          score: 20,
        },
        {
          categoryId: 4,
          categoryName: '보안',
          score: null,
        },
        {
          categoryId: 2,
          categoryName: '편의시설',
          score: 50,
        },
        {
          categoryId: 3,
          categoryName: '화장실',
          score: 90,
        },
        {
          categoryId: 4,
          categoryName: '보안',
          score: 95,
        },
      ],
      geolocation: {
        latitude: 37.5061912,
        longitude: 127.2508228,
      },
    },
  ],
};
