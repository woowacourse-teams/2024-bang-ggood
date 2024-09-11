import { Validator } from '@/utils/validators';

export const validation = (
  name: string,
  value: string,
  validators: Validator[],
  update: (name: string, value: string) => void,
  updateErrorMessage: (name: string, errorMessage: string) => void,
) => {
  // 에러 검증
  const newErrorMessage = validators?.length
    ? validators
        .slice()
        .reverse()
        .reduce((acc, { validate, errorMessage }) => (!validate(value) ? errorMessage : acc), '')
    : '';

  // 에러메시지 업데이트
  updateErrorMessage(name, newErrorMessage);

  // 검증 통과시 입력
  if (newErrorMessage.length === 0) {
    update(name, value);
  }
};
