import React, { Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import FooterLayout from '@/components/_common/layout/FooterLayout';
import { ROUTE_PATH } from '@/constants/routePath';
import AuthPage from '@/pages/AuthPage';
import GoogleAnalytics from '@/routers/GoogleAnalytics';

const MainPage = React.lazy(() => import('@/pages/MainPage'));
const ChecklistListPage = React.lazy(() => import('@/pages/ChecklistListPage'));
const ArticleListPage = React.lazy(() => import('@/pages/ArticleListPage'));
const MyPage = React.lazy(() => import('@/pages/MyPage'));
const NewChecklistPage = React.lazy(() => import('@/pages/NewChecklistPage'));
const EditChecklistPage = React.lazy(() => import('@/pages/EditChecklistPage'));
const ChecklistDetailPage = React.lazy(() => import('@/pages/ChecklistDetailPage'));
const ChecklistQuestionSelectPage = React.lazy(() => import('@/pages/ChecklistQuestionSelectPage'));
const ArticleDetailPage = React.lazy(() => import('@/pages/ArticleDetailPage'));
const LandingPage = React.lazy(() => import('@/pages/LandingPage'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));
const ErrorPage = React.lazy(() => import('@/pages/ErrorPage'));

const router = createBrowserRouter([
  {
    element: (
      <Suspense>
        <GoogleAnalytics />
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
        element: <ChecklistQuestionSelectPage />,
        path: ROUTE_PATH.checklistQuestionSelect,
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
        element: <AuthPage />,
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
