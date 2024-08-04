export const ROUTE_PATH = {
  root: '/',
  /*checklist */
  checklist: '/checklist',
  checklistNew: 'checklist/new',
  checklistList: '/checklist/list',
  checklistCustom: `/checklist/custom`,
  checklistOne: (id: number) => `/checklist/${id}`,
  /*category*/
  categoryChoose: '/category/choose',
  /*room*/
  roomCompareSelect: '/room/compare/select',
  roomCompare: '/room/compare',
  /* TODO : 추후 추가될 페이지들의 라우트패스 */
  location: '/location',
  myPage: '/my-page',
};
