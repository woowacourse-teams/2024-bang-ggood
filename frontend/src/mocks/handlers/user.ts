import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from '@/apis/url';
import { user } from '@/mocks/fixtures/user';

export const userHandlers = [
  http.get(BASE_URL + ENDPOINT.USER_INFO, () => {
    return HttpResponse.json(user, { status: 200 });
  }),
];
