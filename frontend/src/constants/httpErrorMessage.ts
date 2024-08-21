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
  NETWORK_ERROR: '네트워크 연결이 끊어졌습니다',
  FETCH_FAILED: '데이터를 불러오는데 실패했습니다',
  UNAUTHORIZED: '로그인 후 사용하실 수 있습니다',
  BAD_REQUEST: '잘못된 요청입니다',
  CONFLICT: '잘못된 요청입니다',
  SERVER_ERROR: '서버에 에러가 생겼습니다',
};
