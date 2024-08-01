import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import { ChecklistForm } from '@/types/room';

export const getChecklistQuestions = async () => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.CHECKLIST_QUESTION });
  const data = await response.json();
  return data.categories;
};

export const getChecklistDetail = async (id: number) => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.CHECKLIST_ID(id) });
  const data = await response.json();
  return data;
};

export const getChecklists = async () => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.CHECKLISTS });
  const data = await response.json();
  return data.checklists;
};

export const postChecklist = async (answers: ChecklistForm) => {
  const response = await fetcher.post({ url: BASE_URL + ENDPOINT.CHECKLIST, body: answers });
  return response;
};

export const getCompareRooms = async ({ id1, id2, id3 }: { id1: number; id2: number; id3?: number }) => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.CHECKLIST_COMPARE({ id1, id2, id3 }) });
  const data = await response.json();
  return data.checklists;
};
