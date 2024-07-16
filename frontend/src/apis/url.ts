import { API_URL } from '@/apis/config';

export const BASE_URL = API_URL;

export const ENDPOINT = {
  CHECKLIST: '/checklist',
  CHECKLISTS: '/checklists',
  CHECKLIST_QUESTION: '/checklist/question',
  CHECKLIST_ID: (id: number) => `/checklist/${id}`,
};
