const REGEX = {
  EMAIL: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
};

export const validateEmail = (value: string) => {
  const regex = REGEX.EMAIL;
  if (!regex.test(value)) {
    return { errorType: '이메일 형식이 맞지 않습니다.', isValid: false };
  }
  return { errorType: '이메일 형식이 맞지 않습니다.', isValid: true };
};

export const validatePassword = (value: string) => {
  const regex = REGEX.PASSWORD;
  if (!regex.test(value)) {
    return { errorType: '6자 이상의 하나 이상의 영어, 숫자로 만들어야 합니다.', isValid: false };
  }
  return { errorType: '6자 이상의 하나 이상의 영어, 숫자로 만들어야 합니다.', isValid: true };
};

export const validatePasswordConfirm = (value: string, password: string) => {
  if (value !== password) {
    return { errorType: '비밀번호와 비밀번호 형식이 일치하지 않습니다.', isValid: false };
  }
  return { errorType: '비밀번호와 비밀번호 형식이 일치하지 않습니다.', isValid: true };
};

export const validateLength = (value: string, minLength: number, maxLength: number) => {
  if (value.length < minLength || value.length > maxLength) {
    return { errorType: '이름은 2~20자 이내로 입력해 주세요.', isValid: false };
  }
  return { errorType: '이름은 2~20자 이내로 입력해 주세요.', isValid: true };
};
