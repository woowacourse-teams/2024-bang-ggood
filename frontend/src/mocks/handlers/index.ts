import { ArticleHandlers } from '@/mocks/handlers/article';
import { checklistHandlers } from '@/mocks/handlers/checklist';
import { likeHandlers } from '@/mocks/handlers/like';
import { SubwayHandlers } from '@/mocks/handlers/subway';
import { userHandlers } from '@/mocks/handlers/user';

export const handlers = [...checklistHandlers, ...ArticleHandlers, ...userHandlers, ...SubwayHandlers, ...likeHandlers];
