import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from '@/apis/url';
import { checklistList } from '@/mocks/fixtures/checklistList';
import { checklistQuestions } from '@/mocks/fixtures/checklistQuestions';
import { threeRoomsForCompare, twoRoomsForCompare } from '@/mocks/fixtures/roomsForCompare';

export const checklistHandlers = [
  http.get(BASE_URL + ENDPOINT.CHECKLIST_QUESTION, () => {
    return HttpResponse.json(checklistQuestions, { status: 200 });
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
];
