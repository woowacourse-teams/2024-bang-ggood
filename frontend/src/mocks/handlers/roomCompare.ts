import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from '@/apis/url';
import { roomsForCompare } from '@/mocks/fixtures/roomCompare';

export const roomCompareHandlers = [
  http.get(BASE_URL + ENDPOINT.CHECKLIST_COMPARE(1, 2), () => {
    return HttpResponse.json(roomsForCompare, { status: 200 });
  }),
];
