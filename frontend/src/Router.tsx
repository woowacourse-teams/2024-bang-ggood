import { createBrowserRouter } from 'react-router-dom';

import CategoryChoosePage from '@/pages/CategoryChoosePage';
import ChecklistListPage from '@/pages/ChecklistListPage';
import ChecklistPreviewPage from '@/pages/ChecklistPreviewPage';
import NewChecklistBasicInfoTemplate from '@/pages/NewChecklistBasicInfoTemplate';
import NewChecklistPage from '@/pages/NewChecklistPage';
import SaveCheckListPage from '@/pages/SaveCheckListPage';

const router = createBrowserRouter([
  {
    element: <NewChecklistPage />,
    path: '/',
  },
  {
    element: <SaveCheckListPage />,
    path: '/saved',
  },
  {
    element: <ChecklistPreviewPage />,
    path: '/preview',
  },
  {
    element: <NewChecklistBasicInfoTemplate />,
    path: '/checklist-new',
  },
  {
    element: <ChecklistListPage />,
    path: '/checklist',
  },
  {
    element: <CategoryChoosePage />,
    path: '/category-choose',
  },
]);

export default router;
