import React, { Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import FooterLayout from '@/components/_common/layout/FooterLayout';
import { ROUTE_PATH } from '@/constants/routePath';

const MainPage = React.lazy(() => import('@/pages/MainPage'));
const ChecklistListPage = React.lazy(() => import('@/pages/ChecklistListPage'));
const ArticleListPage = React.lazy(() => import('@/pages/ArticleListPage'));
const MyPage = React.lazy(() => import('@/pages/MyPage'));
const NewChecklistPage = React.lazy(() => import('@/pages/NewChecklistPage'));
const EditChecklistPage = React.lazy(() => import('@/pages/EditChecklistPage'));
const ChecklistDetailPage = React.lazy(() => import('@/pages/ChecklistDetailPage'));
const ChecklistCustomPage = React.lazy(() => import('@/pages/ChecklistCustomPage'));
const ArticleDetailPage = React.lazy(() => import('@/pages/ArticleDetailPage'));
const LandingPage = React.lazy(() => import('@/pages/LandingPage'));
const LoginPage = React.lazy(() => import('@/pages/LoginPage'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));
const ErrorPage = React.lazy(() => import('@/pages/ErrorPage'));

const router = createBrowserRouter([
  {
    element: (
      <Suspense>
        <Outlet />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        element: <FooterLayout />,
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
            element: <ArticleListPage />,
            path: ROUTE_PATH.articleList,
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
        element: <ChecklistDetailPage />,
        path: ROUTE_PATH.checklistId,
      },
      {
        element: <EditChecklistPage />,
        path: ROUTE_PATH.checklistEdit,
      },
      {
        element: <ChecklistCustomPage />,
        path: ROUTE_PATH.checklistCustom,
      },
      {
        element: <ArticleDetailPage />,
        path: ROUTE_PATH.articleId,
      },
      {
        element: <LandingPage />,
        path: ROUTE_PATH.root,
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
