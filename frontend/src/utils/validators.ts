export interface Validator<T> {
  validate: (value: T) => boolean;
  errorMessage: string;
}

export const lengthValidator = (length: number): Validator<string> => ({
  validate: value => value.length <= length,
  errorMessage: `${length}자 이하로 입력해주세요.`,
});

export const inRangeValidator = (from: number, to: number): Validator<number> => ({
  validate: value => from <= value && value <= to,
  errorMessage: `${from}이상 ${to}이하의 숫자만 입력해주세요.`,
});

export const positiveValidator: Validator<number> = {
  validate: value => value > 0,
  errorMessage: '양수만 입력해주세요.',
};

export const isNumericValidator: Validator<number> = {
  validate: value => !isNaN(value),
  errorMessage: '숫자만 입력해주세요.',
};
