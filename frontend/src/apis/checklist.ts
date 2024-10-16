import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import { ChecklistInfo, ChecklistPostForm, ChecklistSelectedQuestions } from '@/types/checklist';
import { mapObjNullToUndefined, mapObjUndefinedToNull } from '@/utils/typeFunctions';

export const getChecklistQuestions = async () => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.CHECKLIST_QUESTION });
  const data = await response.json();
  return data.categories;
};

export const getChecklistAllQuestions = async () => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.CHECKLIST_ALL_QUESTION });
  const data = await response.json();
  return data.categories;
};

export const getChecklistDetail = async (id: number) => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.CHECKLIST_ID_V1(id) });
  const data = await response.json();
  return data as ChecklistInfo;
};

export const getChecklists = async () => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.CHECKLISTS });
  const data = await response.json();
  return data.checklists.map(mapObjNullToUndefined);
};

export const postChecklist = async (checklist: ChecklistPostForm) => {
  checklist.room.structure = checklist.room.structure === 'NONE' ? undefined : checklist.room.structure;
  checklist.room = mapObjUndefinedToNull(checklist.room);
  const response = await fetcher.post({ url: BASE_URL + ENDPOINT.CHECKLISTS_V1, body: checklist });
  return response;
};

export const putChecklist = async (id: number, checklist: ChecklistPostForm) => {
  checklist.room.structure = checklist.room.structure === 'NONE' ? undefined : checklist.room.structure;
  checklist.room = mapObjUndefinedToNull(checklist.room);
  const response = await fetcher.put({ url: BASE_URL + ENDPOINT.CHECKLIST_ID(id), body: checklist });
  return response;
};

export const deleteChecklist = async (id: number) => {
  const response = await fetcher.delete({ url: BASE_URL + ENDPOINT.CHECKLIST_ID(id) });
  return response;
};

export const putCustomChecklist = async (questionIds: ChecklistSelectedQuestions) => {
  const response = await fetcher.put({ url: BASE_URL + ENDPOINT.CHECKLIST_CUSTOM, body: questionIds });
  return response;
};
