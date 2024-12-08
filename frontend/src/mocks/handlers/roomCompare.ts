import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from '@/apis/url';
import { roomCategoryDetail } from '@/mocks/fixtures/roomCategoryDetail';
import { roomsForCompare } from '@/mocks/fixtures/roomCompare';

export const roomCompareHandlers = [
  http.get(BASE_URL + ENDPOINT.ROOM_COMPARE(1, 2), () => {
    return HttpResponse.json(roomsForCompare, { status: 200 });
  }),
  http.get(BASE_URL + ENDPOINT.ROOM_CATEGORY_DETAIL(1, 1), () => {
    return HttpResponse.json(roomCategoryDetail, { status: 200 });
  }),
];
