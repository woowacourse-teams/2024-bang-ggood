export const VALIDATION_ERROR_MESSAGE = {
  INVALID_FORMAT_EMAIL: '이메일 형식이 맞지 않습니다.',
  INVALID_FORMAT_PASSWORD: '영어, 숫자를 포함해 6자 이상으로 만들어주세요.',
  NOT_MATCH_PASSWORD: '비밀번호와 비밀번호 형식이 일치하지 않습니다.',
  INVALID_NAME_LENGTH: '이름은 2~20자 이내로 입력해 주세요.',
};

export type ValidationError = keyof typeof VALIDATION_ERROR_MESSAGE;
