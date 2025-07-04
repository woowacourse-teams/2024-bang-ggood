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
  http.post(BASE_URL + ENDPOINT.SIGN_IN, () => {
    return HttpResponse.json(null, { status: 201 });
  }),
  http.post(BASE_URL + ENDPOINT.LOGOUT_V1, () => {
    return HttpResponse.json(null, { status: 201 });
  }),
  http.post(BASE_URL + ENDPOINT.RESET_PASSWORD_SEND_MAIL, () => {
    return new HttpResponse(null, { status: 204 }); // 204
  }),
  http.post(BASE_URL + ENDPOINT.RESET_PASSWORD_CONFIRM_CODE, () => {
    return new HttpResponse(null, { status: 204 });
  }),
  http.post(BASE_URL + ENDPOINT.RESET_PASSWORD, () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
