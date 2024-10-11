import { API_URL } from '@/apis/config';
import { Position } from '@/types/address';

export const BASE_URL = API_URL;

export const ENDPOINT = {
  // checklist
  CHECKLISTS: '/checklists',
  CHECKLIST_QUESTION: '/checklists/questions',
  CHECKLIST_ALL_QUESTION: '/custom-checklist/all',
  CHECKLIST_CUSTOM: '/custom-checklist',
  CHECKLIST_ID: (id: number) => `/checklists/${id}`,
  // like
  LIKE: (id: number) => `/checklists/${id}/like`,
  // category
  CATEGORY: '/categories',
  CATEGORY_ADD: '/categories/priority',
  // article
  ARTICLES: '/articles',
  ARTICLE_ID: (id: number) => `/articles/${id}`,
  // login
  LOGIN: '/oauth/login',
  LOGOUT: '/oauth/logout',
  USER_INFO: '/user/me',
  USER_VALID: '/refreshToken-check',
  //subway
  SUBWAY: (position: Position) => `/stations/nearest?latitude=${position.lat}&longitude=${position.lon}`,
};
