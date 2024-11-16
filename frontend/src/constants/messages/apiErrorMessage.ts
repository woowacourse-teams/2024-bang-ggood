export const API_ERROR_MESSAGE = {
  // 아티클 관련 에러
  ARTICLE_NOT_FOUND: '찾으시는 아티클이 없어요. 다시 확인해 주세요.',

  // 유저 인증/권한 에러
  AUTH_ACCESS_TOKEN_EMPTY: '로그인 후 사용할 수 있어요. \n로그인해 주세요.',
  AUTH_TOKEN_EMPTY: '로그인 후 사용할 수 있어요. \n로그인해 주세요.',
  AUTH_TOKEN_INVALID: '로그인 후 사용할 수 있어요. \n로그인해 주세요.',
  AUTH_PASSWORD_CODE_NOT_FOUND: '비밀번호 재설정 코드가 맞지 않아요. \n다시 확인해 주세요.',
  LOGIN_ERROR: '비밀번호가 맞지 않아요. \n확인해 주세요.',
  USER_NOT_FOUND: '찾으시는 유저가 없어요. \n다시 확인해 주세요.',
  USER_EMAIL_ALREADY_USED: '해당 이메일은 이미 사용 중이에요.',
  USER_INVALID_FORMAT: '이메일 또는 비밀번호 형식이 올바르지 않아요.',
  // TODO: 백엔드 변경 요쳥 필요
  INVALID_PARAMETER: '이메일이 정상적으로 입력되지 않았어요. \n다시 시도해 주세요.',
  BAD_REQUEST: '비밀번호가 입력되지 않았어요. \n다시 시도해 주세요.',

  // 방 정보 요청 형식 에러
  CHECKLIST_ERROR: '체크리스트에 문제가 있어요. \n입력한 내용을 다시 확인해 주세요.',

  // 서버 에러
  CHECKLIST_SERVER_ERROR: '질문 생성 중 오류가 발생했어요. \n잠시 후 다시 시도해 주세요.',
  CHECKLIST_NOT_FOUND: '체크리스트를 찾을 수 없어요! \n잠시 후 다시 시도해 주세요.',
  INTERNAL_SERVER_ERROR: '서버에 문제가 발생했어요. \n잠시 후 다시 시도해 주세요.',
  OAUTH_SERVER_ERROR: '카카오 서버와의 연결에 문제가 발생했어요. \n잠시 후 다시 시도해 주세요.',
  PASSWORD_HASHING_ERROR: '비밀번호 처리 중 오류가 발생했어요. \n잠시 후 다시 시도해 주세요.',
  STATION_SERVER_ERROR: '지하철 역을 찾을 수 없어요. \n입력을 확인해 주세요.',
  MAIL_SEND_ERROR: '메일 전송 중 오류가 발생헀어요. \n잠시 후 다시 시도해 주세요.',

  // 기타
  UNAUTH_ERROR: '유저의 체크리스트가 아니에요.',
  CUSTOM_ERROR: '커스텀 질문 개수가 유효하지 않아요. \n확인해 주세요.',
  NETWORK_ERROR: '인터넷 연결을 확인해 주세요.',
  FETCH_FAILED: '데이터를 불러오지 못했어요. \n다시 시도해 주세요.',
  UNAUTHORIZED: '로그인 후 이용해 주세요.',
  // TODO: 백엔드 - 상위 에러 코드 변경 요청 중
  // BAD_REQUEST: '요청을 다시 확인해 주세요.',
  CONFLICT: '요청에 문제가 있어요. \n잠시 후 다시 시도해 주세요.',
  SERVER_ERROR: '서버에 문제가 생겼어요. \n잠시 후 다시 시도해 주세요.',
};
