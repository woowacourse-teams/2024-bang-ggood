export const ROUTE_PATH = {
  root: '/',
  home: '/home',
  signIn: '/sign-in',
  signUp: '/sign-up',
  resetPassword: '/reset-password',
  /*checklist */
  checklistList: '/checklist',
  checklistNew: '/checklist/new',
  checklistEdit: '/checklist/edit/:checklistId',
  checklistEditOne: (id: number) => `/checklist/edit/${id}`,
  checklistQuestionSelect: `/checklist/question-select`,
  checklistId: '/checklist/:checklistId',
  checklistOne: (id: number) => `/checklist/${id}`,
  /*compare*/
  roomCompare: '/room/compare',
  roomCompareSelect: '/room/compare/select',
  /* article */
  articleList: '/article',
  articleId: '/article/:articleId',
  articleOne: (id: number) => `/article/${id}`,
  /* etc */
  location: '/location',
  myPage: '/my-page',
  admin: '/admin',
  articleEditor: '/isHaileyGod',
};
