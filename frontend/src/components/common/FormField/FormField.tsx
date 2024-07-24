import { HTMLAttributes, useState } from 'react';

import { InputRequiredDot } from '@/assets/assets';
import Input from '@/components/common/Input/Input';
import theme from '@/styles/theme';
import styled from '@emotion/styled';

export interface MakeFormArgs {
  label: string;
  placeholder?: string;
  required?: boolean;
  state: ReturnType<typeof useState<string>>;
}

const FormFieldWrapper = ({ ...rest }) => (
  <div {...rest} style={{ width: '100%', flex: 'auto', display: 'flex', flexDirection: 'column', rowGap: '6px' }}></div>
);
const S = {
  MovedRequiredDot: styled(InputRequiredDot)`
    transform: translateY(-140%);
  `,
  P: styled.p`
    height: 10px;

    color: black;
    font-size: ${({ theme }) => theme.text.size.small};
  `,
};
const FormField = Object.assign(FormFieldWrapper, {
  Label: ({
    label,
    required = false,
    ...rest
  }: { label: string; required?: boolean } & HTMLAttributes<HTMLLabelElement>) => (
    <label {...rest} style={{ fontSize: theme.text.size.medium, fontWeight: theme.text.weight.bold }}>
      {label}
      {required && <S.MovedRequiredDot />}
    </label>
  ),
  /* 추후 입력검증 에러미시지 표출을 위해 만들어 둠 */
  Input: ({
    placeholder,
    state,
    ...rest
  }: { placeholder: string; state: ReturnType<typeof useState<string>> } & HTMLAttributes<HTMLInputElement>) => (
    <Input
      width={'full'}
      placeholder={placeholder}
      value={state[0]}
      onChange={event => state[1](event.target.value)}
      {...rest}
    />
  ),
  P: ({ value, ...rest }: { value: string } & HTMLAttributes<HTMLParagraphElement>) => <S.P {...rest}>{value}</S.P>,
});

export default FormField;
