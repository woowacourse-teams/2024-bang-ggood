import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from '@/apis/url';
import { checklistList } from '@/mocks/fixtures/checklistList';
import { checklistQuestions } from '@/mocks/fixtures/checklistQuestions';
import { threeRoomsForCompare } from '@/mocks/fixtures/roomsForCompare';

export const checklistHandlers = [
  http.get(BASE_URL + ENDPOINT.CHECKLIST_QUESTION, () => {
    return HttpResponse.json(checklistQuestions.categories, { status: 200 });
  }),

  http.get(BASE_URL + ENDPOINT.CHECKLISTS, () => {
    return HttpResponse.json(checklistList, { status: 200 });
  }),

  http.get(BASE_URL + ENDPOINT.CHECKLIST_COMPARE({ id1: 1, id2: 2, id3: 3 }), () => {
    return HttpResponse.json(threeRoomsForCompare.checklists, { status: 200 });
  }),
];
