import { createBrowserRouter } from 'react-router-dom';

import ChecklistPage from '@/pages/ChecklistPage';
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
]);

export default router;
