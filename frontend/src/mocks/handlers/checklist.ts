import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from '@/apis/url';
import { checklistAllQuestions } from '@/mocks/fixtures/checklistAllQuestions';
import { checklistDetail } from '@/mocks/fixtures/checklistDetail';
import { checklistList } from '@/mocks/fixtures/checklistList';
import { checklistQuestions } from '@/mocks/fixtures/checklistQuestions';
import { threeRoomsForCompare, twoRoomsForCompare } from '@/mocks/fixtures/roomsForCompare';

export const checklistHandlers = [
  http.get(BASE_URL + ENDPOINT.CHECKLIST_QUESTION, () => {
    return HttpResponse.json(checklistQuestions, { status: 200 });
  }),

  http.get(BASE_URL + ENDPOINT.CHECKLIST_ID(1), () => {
    return HttpResponse.json(Object.assign(checklistDetail, { isLiked: getLike(1) }), { status: 200 });
  }),
  http.put(BASE_URL + ENDPOINT.CHECKLIST_ID(1), () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  http.get(BASE_URL + ENDPOINT.CHECKLISTS, () => {
    return HttpResponse.json(checklistList, { status: 200 });
  }),

  http.post(BASE_URL + ENDPOINT.CHECKLISTS, () => {
    return HttpResponse.json({}, { status: 201 });
  }),

  http.get(BASE_URL + ENDPOINT.CHECKLIST_COMPARE({ id1: 1, id2: 2, id3: 3 }), ({ request }) => {
    const url = new URL(request.url);
    const roomIds = url.searchParams.getAll('id');

    if (!roomIds[2]) return HttpResponse.json(twoRoomsForCompare, { status: 200 });
    return HttpResponse.json(threeRoomsForCompare, { status: 200 });
  }),

  http.get(BASE_URL + ENDPOINT.CHECKLIST_ALL_QUESTION, () => {
    return HttpResponse.json(checklistAllQuestions, { status: 200 });
  }),
  http.post(BASE_URL + ENDPOINT.LIKE(1), () => {
    const id = 1;
    addLike(id);
    return HttpResponse.json(null, { status: 200 });
  }),
  http.delete(BASE_URL + ENDPOINT.LIKE(1), () => {
    removeLike(1);
    return HttpResponse.json(null, { status: 200 });
  }),
  http.get(BASE_URL + ENDPOINT.LIKE(1), () => {
    return HttpResponse.json(checklist.get(1), { status: 200 });
  }),
];

const checklist = new Map();
const addLike = (id: number) => checklist.set(id, true);
const removeLike = (id: number) => checklist.set(id, false);
const getLike = (id: number) => checklist.get(id);
