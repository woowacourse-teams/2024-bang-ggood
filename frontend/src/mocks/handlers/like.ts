import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from '@/apis/url';

export const likeHandlers = [
  http.post(BASE_URL + ENDPOINT.LIKE(2), () => {
    const id = 2;
    addLike(id);
    return HttpResponse.json(null, { status: 200 });
  }),

  http.post(BASE_URL + ENDPOINT.LIKE(3), () => {
    const id = 3;
    addLike(id);
    return HttpResponse.json(null, { status: 409 });
  }),

  http.delete(BASE_URL + ENDPOINT.LIKE(3), () => {
    const id = 3;
    removeLike(id);
    return HttpResponse.json(null, { status: 409 });
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
