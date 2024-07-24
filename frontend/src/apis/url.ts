import { API_URL } from '@/apis/config';

export const BASE_URL = API_URL;

export const ENDPOINT = {
  /* checklist */
  CHECKLIST: '/checklist',
  CHECKLISTS: '/checklists',
  CHECKLIST_QUESTION: '/checklist/question',
  CHECKLIST_ID: (id: number) => `/checklist/${id}`,
  /* category */
  CATEGORY: '/categories',
  CATEGORY_ADD: '/categories/priority',
};
