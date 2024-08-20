import { createBrowserRouter } from 'react-router-dom';

import FooterLayout from '@/components/_common/layout/FooterLayout';
import AuthGuard from '@/components/Auth/AuthGuard';
import { ROUTE_PATH } from '@/constants/routePath';
import ArticleDetailPage from '@/pages/ArticleDetailPage';
import ArticleListPage from '@/pages/ArticleListPage';
import ChecklistCustomPage from '@/pages/ChecklistCustomPage';
import ChecklistDetailPage from '@/pages/ChecklistDetailPage';
import ChecklistListPage from '@/pages/ChecklistListPage';
import EditChecklistPage from '@/pages/EditChecklistPage';
import ErrorPage from '@/pages/ErrorPage';
import LoginPage from '@/pages/LoginPage';
import MainPage from '@/pages/MainPage';
import MyPage from '@/pages/MyPage';
import NewChecklistPage from '@/pages/NewChecklistPage';
import NotFound from '@/pages/NotFound';
import RoomComparePage from '@/pages/RoomComparePage';
import RoomCompareSelectPage from '@/pages/RoomCompareSelectPage';

const router = createBrowserRouter([
  {
    element: <AuthGuard />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <FooterLayout />,
        children: [
          { element: <MainPage />, path: ROUTE_PATH.home },
          {
            element: <ChecklistListPage />,
            path: ROUTE_PATH.checklistList,
          },
          {
            element: <ArticleListPage />,
            path: ROUTE_PATH.article,
          },
          {
            element: <MyPage />,
            path: ROUTE_PATH.myPage,
          },
        ],
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
        element: <ArticleDetailPage />,
        path: ROUTE_PATH.articleId,
      },
      {
        element: <NotFound />,
        path: '*',
      },
    ],
  },
  {
    element: <LoginPage />,
    path: ROUTE_PATH.root,
  },
]);

export default router;
