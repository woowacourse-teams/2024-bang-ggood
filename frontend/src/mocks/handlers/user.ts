import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from '@/apis/url';
import { mockUserTokenValid, user } from '@/mocks/fixtures/user';

export const userHandlers = [
  http.get(BASE_URL + ENDPOINT.USER_INFO, () => {
    return HttpResponse.json(user, { status: 200 });
  }),
  http.get(BASE_URL + ENDPOINT.USER_VALID, () => {
    return HttpResponse.json(mockUserTokenValid, { status: 200 });
  }),
  http.delete(BASE_URL + ENDPOINT.TOKEN, () => {
    return HttpResponse.json(null, { status: 200 });
  }),
  http.post(BASE_URL + ENDPOINT.USER_ACCESS_TOKEN_REISSUE, () => {
    return HttpResponse.json(null, { status: 200 });
  }),
  /*일반 회원가입 / 로그인*/
  http.post(BASE_URL + ENDPOINT.REGISTER, () => {
    return HttpResponse.json(null, { status: 200 });
  }),
  http.post(BASE_URL + ENDPOINT.SINGIN, () => {
    return HttpResponse.json(null, { status: 201 });
  }),
];
