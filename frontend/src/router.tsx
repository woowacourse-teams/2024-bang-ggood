import { createBrowserRouter } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants/routePath';
import CategoryChoosePage from '@/pages/CategoryChoosePage';
import ChecklistCustomPage from '@/pages/ChecklistCustomPage';
import ChecklistDetailPage from '@/pages/ChecklistDetailPage';
import ChecklistListPage from '@/pages/ChecklistListPage';
import NewChecklistPage from '@/pages/NewChecklistPage';
import NotFound from '@/pages/NotFound';
import RoomComparePage from '@/pages/RoomComparePage';
import RoomCompareSelectPage from '@/pages/RoomCompareSelectPage';

const router = createBrowserRouter([
  {
    element: <CategoryChoosePage />,
    path: ROUTE_PATH.root,
  },
  {
    element: <NewChecklistPage />,
    path: ROUTE_PATH.checklistNew,
  },
  {
    element: <ChecklistListPage />,
    path: ROUTE_PATH.checklistList,
  },
  {
    element: <ChecklistDetailPage />,
    path: ROUTE_PATH.checklistId,
  },
  {
    element: <ChecklistCustomPage />,
    path: ROUTE_PATH.checklistCustom,
  },
  {
    element: <RoomCompareSelectPage />,
    path: ROUTE_PATH.roomCompareSelect,
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
