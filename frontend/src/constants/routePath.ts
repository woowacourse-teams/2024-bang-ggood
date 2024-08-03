export const ROUTE_PATH = {
  root: '/',
  checklistNew: '/checklist-new',
  checklistList: '/checklist-list',
  checklistOne: (id: number) => `/checklists/${id}`,
  categoryChoose: '/category-choose',
  roomCompareSelect: '/room-compare-select',
  roomCompare: '/room-compare',
  /* TODO : 추후 추가될 페이지들의 라우트패스 */
  location: '/location',
  myPage: '/my-page',
};
