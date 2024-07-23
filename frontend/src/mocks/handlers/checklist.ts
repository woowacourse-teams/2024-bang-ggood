import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from '@/apis/url';
import { checklistQuestions } from '@/mocks/fixtures/checklistQuestions';

export const checklistHandlers = [
  http.get(BASE_URL + ENDPOINT.CHECKLIST_QUESTION, () => {
    return HttpResponse.json(checklistQuestions.categories, { status: 200 });
  }),
];
