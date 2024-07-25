import { createBrowserRouter } from 'react-router-dom';

import CategoryChoosePage from '@/pages/CategoryChoosePage';
import ChecklistListPage from '@/pages/ChecklistListPage';
import ChecklistPreviewPage from '@/pages/ChecklistPreviewPage';
import NewChecklistPage from '@/pages/NewChecklistPage/NewChecklistPage';
import RoomComparePage from '@/pages/RoomComparePage';
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
    element: <ChecklistListPage />,
    path: '/checklist',
  },
  {
    element: <CategoryChoosePage />,
    path: '/category-choose',
  },
  {
    element: <RoomComparePage />,
    path: '/room-compare',
  },
]);

export default router;
