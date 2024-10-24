import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import { roomInfoApiMapper } from '@/store/roomInfoStore';
import { ChecklistInfo, ChecklistPostForm, ChecklistSelectedQuestions } from '@/types/checklist';
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
  const data = await response.json();
  return data as ChecklistInfo;
};

export const getChecklists = async (isLikeFiltered: boolean = false) => {
  const response = await fetcher.get({
    url: BASE_URL + (isLikeFiltered ? ENDPOINT.CHECKLISTS_LIKE : ENDPOINT.CHECKLISTS_V1),
  });
  const data = await response.json();
  return data.checklists.map(mapObjNullToUndefined).slice(0, 10);
};

export const postChecklist = async (checklist: ChecklistPostForm) => {
  const mappedRoomInfo = roomInfoApiMapper(checklist.room);
  const mappedChecklist = { ...checklist, room: mappedRoomInfo };
  const response = await fetcher.post({ url: BASE_URL + ENDPOINT.CHECKLISTS_V1, body: mappedChecklist });
  return response;
};

export const putChecklist = async (id: number, checklist: ChecklistPostForm) => {
  const mappedRoomInfo = roomInfoApiMapper(checklist.room);
  const mappedChecklist = { ...checklist, room: mappedRoomInfo };
  const response = await fetcher.put({ url: BASE_URL + ENDPOINT.CHECKLIST_ID(id), body: mappedChecklist });
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
