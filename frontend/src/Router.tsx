import { createBrowserRouter } from 'react-router-dom';

import ChecklistPage from '@/pages/ChecklistPage';

const router = createBrowserRouter([
  {
    element: <ChecklistPage />,
    path: '/',
  },
]);

export default router;
