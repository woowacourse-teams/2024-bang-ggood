import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import { roomInfoApiPostMapper } from '@/store/roomInfoStore';
import {
  ChecklistCategoryWithIsSelected,
  ChecklistInfo,
  ChecklistPostForm,
  ChecklistPreview,
  ChecklistSelectedQuestions,
} from '@/types/checklist';
import { mapObjNullToUndefined } from '@/utils/typeFunctions';

export const getChecklistQuestions = async () => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.CHECKLIST_QUESTION });
  const data = (await response.json()) as { categories: ChecklistCategoryWithIsSelected[] };
  return data.categories;
};

export const getChecklistAllQuestions = async () => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.CHECKLIST_ALL_QUESTION });
  const data = await response.json();
  return data as CustomChecklistCategoriesRes;
};

export interface CustomChecklistCategoriesRes {
  defaultCategories: ChecklistCategoryWithIsSelected[];
  userCategories: ChecklistCategoryWithIsSelected[];
}

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
  return data.checklists.map(mapObjNullToUndefined) as ChecklistPreview[];
};

export const postChecklist = async (checklist: ChecklistPostForm) => {
  const mappedRoomInfo = roomInfoApiPostMapper(checklist.room);
  const mappedChecklist = { ...checklist, room: mappedRoomInfo };
  const response = await fetcher.post({ url: BASE_URL + ENDPOINT.CHECKLISTS_V1, body: mappedChecklist });
  return response;
};

export const putChecklist = async (id: number, checklist: ChecklistPostForm) => {
  const mappedRoomInfo = roomInfoApiPostMapper(checklist.room);
  const mappedChecklist = { ...checklist, room: mappedRoomInfo };
  const response = await fetcher.put({ url: BASE_URL + ENDPOINT.CHECKLIST_ID_V1(id), body: mappedChecklist });
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
