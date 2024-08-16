export const ROUTE_PATH = {
  home: '/',
  /*checklist */
  checklistList: '/checklist',
  checklistNew: '/checklist/new',
  checklistCustom: `/checklist/custom`,
  checklistId: '/checklist/:checklistId',
  checklistOne: (id: number) => `/checklist/${id}`,
  /*category*/
  categoryChoose: '/category-choose',
  /*room*/
  roomCompareSelect: '/room-compare/select',
  roomCompare: '/room-compare',
  /* article */
  article: '/article',
  articleOne: (id: number) => `/article/${id}`,
  /* TODO: 추후 추가될 페이지들의 라우트패스 */
  location: '/location',
  myPage: '/my-page',
  login: '/login',
};
