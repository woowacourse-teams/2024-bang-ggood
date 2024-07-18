import { createBrowserRouter } from 'react-router-dom';

import ChecklistPage from '@/pages/ChecklistPage';
import ChecklistPreviewPage from '@/pages/ChecklistPreviewPage';
import SaveCheckListPage from '@/pages/SaveCheckListPage';

const router = createBrowserRouter([
  {
    element: <ChecklistPage />,
    path: '/',
  },
  {
    element: <SaveCheckListPage />,
    path: '/saved',
  },
  {
    element: <ChecklistPreviewPage />,
    path: '/checklist/:id',
  },
]);

export default router;
