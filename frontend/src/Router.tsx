import { createBrowserRouter } from 'react-router-dom';

import CategoryChoosePage from '@/pages/CategoryChoosePage';
import ChecklistListPage from '@/pages/ChecklistListPage';
import ChecklistPage from '@/pages/ChecklistPage';
import ChecklistPreviewPage from '@/pages/ChecklistPreviewPage';
import RoomComparePage from '@/pages/RoomComparePage';
import SaveCheckListPage from '@/pages/SaveCheckListPage';

const router = createBrowserRouter([
  {
    element: <ChecklistPage />,
    // TODO: new-checklist 같은 링크로 변경 필요
    path: '/',
  },
  {
    element: <SaveCheckListPage />,
    path: '/saved',
  },
  {
    element: <ChecklistPreviewPage />,
    path: '/preview',
  },
  {
    element: <ChecklistListPage />,
    path: '/checklist',
  },
  {
    element: <CategoryChoosePage />,
    path: '/category-choose',
  },
  {
    element: <RoomComparePage />,
    path: '/room-compare',
  },
]);

export default router;
