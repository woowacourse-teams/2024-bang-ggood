import React, { Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import FooterLayout from '@/components/_common/layout/FooterLayout';
import MobileLayout from '@/components/_common/layout/MobileLayout';
import { ROUTE_PATH } from '@/constants/routePath';

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
const ResetPasswordPage = React.lazy(() => import('@/pages/ResetPasswordPage'));
const RoomComparePage = React.lazy(() => import('@/pages/RoomComparePage'));
const SignInPage = React.lazy(() => import('@/pages/SignInPage'));
const SignUpPage = React.lazy(() => import('@/pages/SignUpPage'));
const AdminPage = React.lazy(() => import('@/pages/AdminPage'));
const ArticleEditorPage = React.lazy(() => import('@/pages/ArticleEditorPage'));

const router = createBrowserRouter([
  // 모바일 페이지 레이아웃
  {
    element: (
      <MobileLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </MobileLayout>
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
        path: ROUTE_PATH.resetPassword,
      },
      {
        element: <RoomComparePage />,
        path: ROUTE_PATH.roomCompare,
      },
      {
        element: <NotFound />,
        path: '*',
      },
    ],
  },

  // 어드민 페이지 레이아웃
  {
    element: (
      <Suspense>
        <Outlet />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AdminPage />,
        path: ROUTE_PATH.admin,
      },
      {
        element: <ArticleEditorPage />,
        path: ROUTE_PATH.articleEditor,
      },
    ],
  },
]);

export default router;
