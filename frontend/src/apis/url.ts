import { API_URL } from '@/apis/config';

export const BASE_URL = API_URL;

export const ENDPOINT = {
  /* checklist */
  CHECKLIST: '/checklists',
  CHECKLISTS: '/checklists',
  CHECKLIST_QUESTION: '/checklists/questions',
  CHECKLIST_ALL_QUESTION: '/checklists/all-questions',
  CHECKLIST_CUSTOM: '/custom-checklist',
  CHECKLIST_ID: (id: number) => `/checklists/${id}`,
  CHECKLIST_COMPARE: ({ id1, id2, id3 }: { id1: number; id2: number; id3?: number }) => {
    const url = `/checklists/comparison?id=${id1}&id=${id2}`;
    if (id3 !== null) return `${url}&id=${id3}`;
    return url;
  },
  /* category */
  CATEGORY: '/categories',
  CATEGORY_ADD: '/categories/priority',
  /* login */
  OAUTH: 'oauth/login',
};
