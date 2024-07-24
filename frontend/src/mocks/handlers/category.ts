import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from '@/apis/url';
import { categories } from '@/mocks/fixtures/category';

export const categoryHandlers = [
  http.get(BASE_URL + ENDPOINT.CATEGORY, () => {
    return HttpResponse.json(categories.categories, { status: 200 });
  }),
