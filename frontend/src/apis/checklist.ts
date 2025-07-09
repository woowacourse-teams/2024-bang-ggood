import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import { ChecklistInfo, ChecklistSelectedQuestions } from '@/types/checklist';
import { mapObjNullToUndefined } from '@/utils/typeFunctions';

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
  const data = (await response.json()) as ChecklistInfo;
  data.room = Object.fromEntries(Object.entries(data.room).filter(([, value]) => value !== null));
  return data;
};

export const getChecklists = async (isLikeFiltered: boolean = false) => {
  const response = await fetcher.get({
    url: BASE_URL + (isLikeFiltered ? ENDPOINT.CHECKLISTS_LIKE_V1 : ENDPOINT.CHECKLISTS_V1),
  });
  const data = await response.json();
  return data.checklists.map(mapObjNullToUndefined);
};

export const postChecklist = async (formData: FormData) => {
  const response = await fetcher.postMultipart({
    url: BASE_URL + ENDPOINT.CHECKLISTS_V1,
    body: formData,
  });
  return response;
};

export const putChecklist = async (formData: FormData, id: number) => {
  const response = await fetcher.putMultipart({
    url: BASE_URL + ENDPOINT.CHECKLIST_ID_V1(id),
    body: formData,
  });
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
