import { createBrowserRouter } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants/routePath';
import ArticleListPage from '@/pages/ArticleListPage';
import ChecklistCustomPage from '@/pages/ChecklistCustomPage';
import ChecklistDetailPage from '@/pages/ChecklistDetailPage';
import ChecklistListPage from '@/pages/ChecklistListPage';
import EditChecklistPage from '@/pages/EditChecklistPage';
import ErrorPage from '@/pages/ErrorPage';
import LoginPage from '@/pages/LoginPage';
import MainPage from '@/pages/MainPage';
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
        element: <MainPage />,
        path: ROUTE_PATH.home,
      },
      {
        element: <ChecklistListPage />,
        path: ROUTE_PATH.checklistList,
      },
      {
        element: <NewChecklistPage />,
        path: ROUTE_PATH.checklistNew,
      },
      {
        element: <EditChecklistPage />,
        path: ROUTE_PATH.checklistEdit,
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
        element: <ArticleListPage />,
        path: ROUTE_PATH.article,
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
