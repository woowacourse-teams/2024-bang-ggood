import { createBrowserRouter } from 'react-router-dom';

import ChecklistPage from '@/pages/ChecklistPage';
import ChecklistPreviewPage from '@/pages/ChecklistPreviewPage';
import { ModalPage } from '@/pages/ModalPage';
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
    path: '/preview',
  },
  {
    element: <ModalPage />,
    path: '/modal',
  },
]);

export default router;
