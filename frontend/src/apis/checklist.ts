import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import { Answer } from '@/pages/ChecklistPage';

export const getChecklistQuestions = async () => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.CHECKLIST_QUESTION });
  const data = await response.json();
  return data;
};

export const getChecklistById = async (id: number) => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.CHECKLIST_ID(id) });
  const data = await response.json();
  return data;
};

export const getChecklists = async () => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.CHECKLISTS });
  const data = await response.json();
  return data;
};

export const postChecklist = async (answers: Answer[]) =>
  await fetcher.post({ url: BASE_URL + ENDPOINT.CHECKLIST, body: answers });
