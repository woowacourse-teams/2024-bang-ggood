import { ArticleHandlers } from '@/mocks/handlers/article';
import { categoryHandlers } from '@/mocks/handlers/category';
import { checklistHandlers } from '@/mocks/handlers/checklist';
import { SubwayHandlers } from '@/mocks/handlers/subway';
import { userHandlers } from '@/mocks/handlers/user';

export const handlers = [
  ...checklistHandlers,
  ...categoryHandlers,
  ...ArticleHandlers,
  ...userHandlers,
  ...SubwayHandlers,
];
