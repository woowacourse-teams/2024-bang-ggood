import { API_URL } from '@/apis/config';
import { Position } from '@/types/address';

export const BASE_URL = API_URL;

export const ENDPOINT = {
  // checklist
  CHECKLISTS: '/checklists',
  CHECKLISTS_LIKE: '/checklists/like',
  CHECKLISTS_LIKE_V1: '/v1/checklists/like',
  CHECKLISTS_V1: '/v1/checklists',
  CHECKLIST_QUESTION: '/checklists/questions',
  CHECKLIST_ALL_QUESTION: '/custom-checklist/all',
  CHECKLIST_CUSTOM: '/custom-checklist',
  CHECKLIST_ID: (id: number) => `/checklists/${id}`,
  CHECKLIST_ID_V1: (id: number) => `/v1/checklists/${id}`,
  //compare
  ROOM_COMPARE: (roomId1: number, roomId2: number) => `/v1/checklists/comparison?id=${roomId1}&id=${roomId2}`,
  ROOM_CATEGORY_DETAIL: (roomId: number, categoryId: number) =>
    `/v1/comparison/checklists/${roomId}/categories/${categoryId}/questions`,
  // like
  LIKE: (id: number | ':id') => `/checklists/${id}/like`,
  // category
  CATEGORY: '/categories',
  CATEGORY_ADD: '/categories/priority',
  // article
  ARTICLES: '/articles',
  ARTICLE_ID: (id: number) => `/articles/${id}`,
  // kakao login
  OAUTH_LOGIN: '/oauth/login',
  // basic login
  REGISTER: '/v1/local-auth/register',
  SIGN_IN: '/v1/local-auth/login',
  // user
  LOGOUT: '/oauth/logout',
  LOGOUT_V1: '/v1/logout',
  USER_INFO: '/user/me',
  DELETE_ACCOUNT: '/v1/withdraw',
  USER_VALID: '/token-exist',
  USER_ACCESS_TOKEN_REISSUE: '/accessToken/reissue',
  TOKEN: '/token',
  RESET_PASSWORD_SEND_MAIL: '/v1/password-reset/send-code',
  RESET_PASSWORD_CONFIRM_CODE: '/v1/password-reset/confirm',
  RESET_PASSWORD: '/v1/password-reset',
  //subway
  SUBWAY: (position: Position) => `/stations/nearest?latitude=${position.latitude}&longitude=${position.longitude}`,
};
