export const HTTP_STATUS_CODE = {
  OK: 200 || 201,
  NETWORK_ERROR: 100,
  FETCH_FAILED: 400,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
} as const;

export type HttpErrorName = Exclude<keyof typeof HTTP_STATUS_CODE, 'OK'>;

export const HTTP_ERROR_MESSAGE: Record<HttpErrorName, string> = {
  NETWORK_ERROR: '인터넷 연결을 확인해 주세요.',
  FETCH_FAILED: '데이터를 불러오지 못했어요. 다시 시도해 주세요.',
  UNAUTHORIZED: '로그인 후 이용해 주세요.',
  BAD_REQUEST: '요청을 다시 확인해 주세요.',
  CONFLICT: '요청에 문제가 있어요. 잠시 후 다시 시도해 주세요.',
  SERVER_ERROR: '서버에 문제가 생겼어요. 잠시 후 다시 시도해 주세요.',
};
