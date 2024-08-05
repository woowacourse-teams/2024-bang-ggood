import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import { ROUTE_PATH } from '@/constants/routePath';
import ErrorBoundary from '@/ErrorBoundary';
import CategoryChoosePage from '@/pages/CategoryChoosePage';
import ChecklistCustomPage from '@/pages/ChecklistCustomPage';
import ChecklistDetailPage from '@/pages/ChecklistDetailPage';
import ChecklistListPage from '@/pages/ChecklistListPage';
import LoginPage from '@/pages/LoginPage';
import NewChecklistPage from '@/pages/NewChecklistPage/NewChecklistPage';
import NotFound from '@/pages/NotFound';
import RoomComparePage from '@/pages/RoomComparePage';
import RoomCompareSelectPage from '@/pages/RoomCompareSelectPage';

const router = createBrowserRouter([
  {
    element: <App />,
    path: ROUTE_PATH.root,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        element: <CategoryChoosePage />,
        path: '',
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
        element: <LoginPage />,
        path: ROUTE_PATH.login,
      },
      {
        element: <NotFound />,
        path: '*',
      },
    ],
  },
]);

export default router;
