import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from '@/apis/url';
import { checklistAllQuestions } from '@/mocks/fixtures/checklistAllQuestions';
import { checklistDetail } from '@/mocks/fixtures/checklistDetail';
import { checklistList } from '@/mocks/fixtures/checklistList';
import { checklistQuestions } from '@/mocks/fixtures/checklistQuestions';

export const checklistHandlers = [
  http.get(BASE_URL + ENDPOINT.CHECKLIST_QUESTION, () => {
    return HttpResponse.json(checklistQuestions, { status: 200 });
  }),

  http.get(BASE_URL + ENDPOINT.CHECKLIST_ID_V1(1), () => {
    return HttpResponse.json(Object.assign(checklistDetail, { isLiked: getLike(1) }), { status: 200 });
  }),

  http.put(BASE_URL + ENDPOINT.CHECKLIST_ID(1), () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  http.get(BASE_URL + ENDPOINT.CHECKLISTS, () => {
    return HttpResponse.json(checklistList, { status: 200 });
  }),
  http.get(BASE_URL + ENDPOINT.CHECKLISTS_LIKE, () => {
    const newChecklistList = {
      ...checklistList,
      checklists: checklistList.checklists.filter(({ isLiked }) => isLiked),
    };
    return HttpResponse.json(newChecklistList, { status: 200 });
  }),

  http.post(BASE_URL + ENDPOINT.CHECKLISTS, () => {
    return HttpResponse.json({}, { status: 201 });
  }),
  http.post(BASE_URL + ENDPOINT.CHECKLISTS_V1, () => {
    return HttpResponse.json({}, { status: 201 });
  }),

  http.get(BASE_URL + ENDPOINT.CHECKLIST_ALL_QUESTION, () => {
    return HttpResponse.json(checklistAllQuestions, { status: 200 });
  }),

  http.post<{ id: string }>(BASE_URL + ENDPOINT.LIKE(':id'), ({ params }) => {
    const id = Number(params.id);
    addLike(id);
    return HttpResponse.json(null, { status: 200 });
  }),

  http.delete<{ id: string }>(BASE_URL + ENDPOINT.LIKE(':id'), ({ params }) => {
    const id = Number(params.id);
    removeLike(id);
    return HttpResponse.json(null, { status: 200 });
  }),

  http.get<{ id: string }>(BASE_URL + ENDPOINT.LIKE(':id'), ({ params }) => {
    const id = Number(params.id);
    return HttpResponse.json(checklist.get(id), { status: 200 });
  }),

  http.put(BASE_URL + ENDPOINT.CHECKLIST_CUSTOM, () => {
    return HttpResponse.json({ status: 200 });
  }),
];

const checklist = new Map();
const addLike = (id: number) => checklist.set(id, true);
const removeLike = (id: number) => checklist.set(id, false);
const getLike = (id: number) => checklist.get(id);
