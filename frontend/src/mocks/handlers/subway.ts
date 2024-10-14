import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from '@/apis/url';
import { nearSubway } from '@/mocks/fixtures/subway';

export const SubwayHandlers = [
  http.get(BASE_URL + ENDPOINT.SUBWAY({ latitude: 0, longitude: 0 }), () => {
    return HttpResponse.json(nearSubway, { status: 200 });
  }),
];
