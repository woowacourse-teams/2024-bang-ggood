import { createBrowserRouter } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants/routePath';
import CategoryChoosePage from '@/pages/CategoryChoosePage';
import ChecklistListPage from '@/pages/ChecklistListPage';
import ChecklistPreviewPage from '@/pages/ChecklistSummaryPage';
import NewChecklistPage from '@/pages/NewChecklistPage/NewChecklistPage';
import NotFound from '@/pages/NotFound';
import RoomComparePage from '@/pages/RoomComparePage';

const router = createBrowserRouter([
  {
    element: <NewChecklistPage />,
    path: ROUTE_PATH.checklistNew,
  },
  {
    element: <ChecklistListPage />,
    path: ROUTE_PATH.checklistList,
  },
  {
    element: <ChecklistPreviewPage />,
    path: '/checklists/:id',
  },
  {
    element: <CategoryChoosePage />,
    path: '/',
  },
  {
    element: <RoomComparePage />,
    path: ROUTE_PATH.roomCompare,
  },
  {
    element: <NotFound />,
    path: '*',
  },
]);

export default router;
