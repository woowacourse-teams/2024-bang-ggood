import { createBrowserRouter } from 'react-router-dom';

import Map from '@/components/_common/Map/Map';
import { ROUTE_PATH } from '@/constants/routePath';
import CategoryChoosePage from '@/pages/CategoryChoosePage';
import ChecklistCustomPage from '@/pages/ChecklistCustomPage';
import ChecklistDetailPage from '@/pages/ChecklistDetailPage';
import ChecklistListPage from '@/pages/ChecklistListPage';
import ErrorPage from '@/pages/ErrorPage';
import LoginPage from '@/pages/LoginPage';
import NewChecklistPage from '@/pages/NewChecklistPage';
import NotFound from '@/pages/NotFound';
import RoomComparePage from '@/pages/RoomComparePage';
import RoomCompareSelectPage from '@/pages/RoomCompareSelectPage';
import RootLayout from '@/RootLayout';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
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
        element: <RoomCompareSelectPage />,
        path: ROUTE_PATH.roomCompareSelect,
      },
      {
        element: <LoginPage />,
        path: ROUTE_PATH.login,
      },
      {
        element: <Map />,
        path: '/map',
      },
      {
        element: <NotFound />,
        path: '*',
      },
    ],
  },
]);

export default router;