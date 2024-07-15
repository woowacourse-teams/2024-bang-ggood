import { createBrowserRouter } from 'react-router-dom';

import { AccordianPage } from '@/pages/AccordianPage';
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
  {
    element: <AccordianPage />,
    path: '/accordian',
  },
]);

export default router;
