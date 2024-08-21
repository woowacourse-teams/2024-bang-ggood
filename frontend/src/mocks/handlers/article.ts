import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from '@/apis/url';
import { article } from '@/mocks/fixtures/article';
import { articleList } from '@/mocks/fixtures/articleList';

export const ArticleHandlers = [
  http.get(BASE_URL + ENDPOINT.ARTICLES, () => {
    return HttpResponse.json(articleList, { status: 200 });
  }),

  http.get(BASE_URL + ENDPOINT.ARTICLE_ID(1), () => {
    return HttpResponse.json(article, { status: 200 });
  }),
];
