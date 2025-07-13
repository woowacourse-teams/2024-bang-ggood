import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from '@/apis/url';
import { buildingResponse } from '@/mocks/fixtures/buildingList';

export const buildingHandlers = [
  http.get(BASE_URL + ENDPOINT.BUILDING_LIST, async () => {
    return HttpResponse.json(buildingResponse, { status: 200 });
  }),
];
