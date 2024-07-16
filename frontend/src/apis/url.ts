export const BASE_URL = '';

export const ENDPOINT = {
  CHECKLIST: '/checklist',
  CHECKLISTS: '/checklists',
  CHECKLIST_QUESTION: '/checklist/question',
  CHECKLIST_ID: (id: number) => `/checklist/${id}`,
};
