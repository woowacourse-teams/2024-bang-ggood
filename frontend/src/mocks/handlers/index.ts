import { ArticleHandlers } from '@/mocks/handlers/article';
import { categoryHandlers } from '@/mocks/handlers/category';
import { checklistHandlers } from '@/mocks/handlers/checklist';

export const handlers = [...checklistHandlers, ...categoryHandlers, ...ArticleHandlers];
