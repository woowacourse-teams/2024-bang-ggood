import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from '@/apis/url';
import { articleList } from '@/mocks/fixtures/articleList';

export const ArticleHandlers = [
  http.get(BASE_URL + ENDPOINT.ARTICLES, () => {
    return HttpResponse.json(articleList, { status: 400 });
  }),
];
