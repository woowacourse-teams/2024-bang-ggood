export const roomStructures = ['오픈형 원룸', '분리형 원룸', '투룸', '쓰리룸 이상'] as const;

export const roomFloorLevels = ['지상', '반지하/지하', '옥탑'] as const;
export const roomOccupancyPeriods = ['초', '중순', '말'] as const;

export const IncludedMaintenancesData = [
  { id: 1, displayName: '수도' },
  { id: 2, displayName: '인터넷' },
  { id: 3, displayName: '전기' },
  { id: 4, displayName: '가스' },
] as const;
