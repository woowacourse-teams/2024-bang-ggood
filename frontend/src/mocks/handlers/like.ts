import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from '@/apis/url';

export const likeHandlers = [
  http.post<{ id: string }>(BASE_URL + ENDPOINT.LIKE(':id'), ({ params }) => {
    const id = Number(params.id);
    addLike(id);
    return HttpResponse.json(null, { status: 200 });
  }),

  http.post(BASE_URL + ENDPOINT.LIKE(3), () => {
    const id = 3;
    addLike(id);

    return HttpResponse.json(
      {
        bangggoodCode: 'LIKE_ALREADY_EXISTS',
      },
      {
        status: 409,
      },
    );
  }),

  http.delete<{ id: string }>(BASE_URL + ENDPOINT.LIKE(':id'), ({ params }) => {
    const id = Number(params.id);
    removeLike(id);
    return HttpResponse.json(null, { status: 200 });
  }),

  http.get<{ id: string }>(BASE_URL + ENDPOINT.LIKE(':id'), ({ params }) => {
    const id = Number(params.id);
    return HttpResponse.json(checklist.get(id), { status: 200 });
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
