export interface Validator {
  validate: (value: string) => boolean;
  errorMessage: string;
}

export const lengthValidator = (length: number): Validator => ({
  validate: value => value.length <= length,
  errorMessage: `${length}자 이하로 입력해주세요.`,
});

export const inRangeValidator = (from: number, to: number): Validator => ({
  validate: value => from <= Number(value) && Number(value) <= to,
  errorMessage: `${from}이상 ${to}이하의 숫자만 입력해주세요.`,
});

export const nonNegativeValidator: Validator = {
  validate: value => Number(value) >= 0,
  errorMessage: '음수가 아닌 수를 입력해주세요.',
};

export const isNumericValidator: Validator = {
  validate: value => !isNaN(Number(value)) && !(value !== '0' && Number(value) === 0), // ' '을 Number()에 넣으면 0이라서 엣지케이스 처리했음
  errorMessage: '숫자만 입력해주세요.',
};

export const isIntegerValidator: Validator = {
  validate: value => Number(value) === parseInt(value),
  errorMessage: '정수만 입력해주세요.',
};

export const positiveValidator: Validator = {
  validate: value => Number(value) > 0,
  errorMessage: '양수만 입력해주세요.',
};
