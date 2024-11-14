import { Tab } from '@/types/tab';

export const DefaultChecklistTabsNames: Tab[] = [
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

export const DRAG_THRESHOLD_PIXEL = 100;
export const remainOp = (a: number, b: number) => (((a % b) + b + 1) % b) - 1; // 나머지연산자. -1부터 시작하므로 +1 -1
