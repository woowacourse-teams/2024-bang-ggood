export interface Validator<T> {
  validate: (value: T) => boolean;
  errorMessage: string;
}

export const lengthValidator = (length: number): Validator<string> => ({
  validate: value => value.length <= length,
  errorMessage: `${length}자 이하로 입력해주세요.`,
});

export const inRangeValidator = (from: number, to: number): Validator<string> => ({
  validate: value => from <= Number(value) && Number(value) <= to,
  errorMessage: `${from}이상 ${to}이하의 숫자만 입력해주세요.`,
});

export const nonNegativeValidator: Validator<string> = {
  validate: value => Number(value) >= 0,
  errorMessage: '음수가 아닌 수를 입력해주세요.',
};

export const isNumericValidator: Validator<string> = {
  validate: value => !isNaN(Number(value)),
  errorMessage: '숫자만 입력해주세요.',
};
export const isIntegerValidator: Validator<string> = {
  validate: value => Number(value) === parseInt(value),
  errorMessage: '정수만 입력해주세요.',
};
export const positiveValidator: Validator<string> = {
  validate: value => Number(value) > 0,
  errorMessage: '양수만 입력해주세요.',
};
