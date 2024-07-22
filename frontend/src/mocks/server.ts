import { setupServer } from 'msw/node';

import { checklistHandlers } from '@/mocks/handlers/checklist';

export const server = setupServer(...checklistHandlers);
