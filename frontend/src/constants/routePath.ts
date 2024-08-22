export const ROUTE_PATH = {
  root: '/',
  home: '/home',
  /*checklist */
  checklistList: '/checklist',
  checklistNew: '/checklist/new',
  checklistEdit: '/checklist/edit/:checklistId',
  checklistEditOne: (id: number) => `/checklist/edit/${id}`,
  checklistCustom: `/checklist/custom`,
  checklistId: '/checklist/:checklistId',
  checklistOne: (id: number) => `/checklist/${id}`,
  /* category */
  categoryChoose: '/category-choose',
  /* room */
  roomCompareSelect: '/room-compare/select',
  roomCompare: '/room-compare',
  /* article */
  articleList: '/article',
  articleId: '/article/:articleId',
  articleOne: (id: number) => `/article/${id}`,
  /* etc */
  location: '/location',
  myPage: '/my-page',
};
