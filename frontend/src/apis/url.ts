import { API_URL } from '@/apis/config';

export const BASE_URL = API_URL;

export const ENDPOINT = {
  /* checklist */
  CHECKLIST: '/checklists',
  CHECKLISTS: '/checklists',
  CHECKLIST_QUESTION: '/checklists/questions',
  CHECKLIST_ID: (id: number) => `/checklists/${id}`,
  // TODO: id3 없을 때 처리
  CHECKLIST_COMPARE: ({ id1, id2, id3 }: { id1: number; id2: number; id3: number }) =>
    `/checklists/comparison?id=${id1}&id=${id2}&id=${id3}`,
  /* category */
  CATEGORY: '/categories',
  CATEGORY_ADD: '/categories/priority',
};
