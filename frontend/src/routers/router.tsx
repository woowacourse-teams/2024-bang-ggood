import React, { Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import FooterLayout from '@/components/_common/layout/FooterLayout';
import { ROUTE_PATH } from '@/constants/routePath';
import ResetPasswordPage from '@/pages/FindPasswordPage copy';
import SignInPage from '@/pages/SignInPage';
import SignUpPage from '@/pages/SignUpPage';

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
        element: <SignUpPage />,
        path: ROUTE_PATH.signUp,
      },
      {
        element: <SignInPage />,
        path: ROUTE_PATH.signIn,
      },

      {
        element: <ResetPasswordPage />,
        path: ROUTE_PATH.findPassword,
      },
      {
        element: <NotFound />,
        path: '*',
      },
    ],
  },
]);

export default router;
