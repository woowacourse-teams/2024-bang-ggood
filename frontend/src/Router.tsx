import { createBrowserRouter } from 'react-router-dom';

import { AccordianPage } from '@/pages/AccordianPage';
import ChecklistPage from '@/pages/ChecklistPage';

const router = createBrowserRouter([
  {
    element: <ChecklistPage />,
    path: '/',
  },
  {
    element: <AccordianPage />,
    path: '/accordian',
  },
]);

export default router;
