import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import { ChecklistFormAnswer } from '@/types/checklist';

export const getChecklistQuestions = async () => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.CHECKLIST_QUESTION });
  const data = await response.json();
  return data;
};

export const getChecklistAnswer = async (id: number) => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.CHECKLIST_ID(id) });
  const data = await response.json();
  return data;
};

export const getChecklists = async () => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.CHECKLISTS });
  const data = await response.json();
  return data;
};

export const postChecklist = async (answers: ChecklistFormAnswer[]) => {
  await fetcher.post({ url: BASE_URL + ENDPOINT.CHECKLIST, body: answers });
};

export const getCompareRooms = async ({ id1, id2, id3 }: { id1: number; id2: number; id3: number }) => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.CHECKLIST_COMPARE({ id1, id2, id3 }) });
  const data = await response.json();
  return data;
};
