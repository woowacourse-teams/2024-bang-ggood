import { HTMLAttributes, useState } from 'react';

import { InputRequiredDot } from '@/assets/assets';
import Input from '@/components/common/Input/Input';
import theme from '@/styles/theme';

export interface MakeFormArgs {
  label: string;
  placeholder?: string;
  required?: boolean;
  state: ReturnType<typeof useState<string>>;
}

const FormFieldWrapper = ({ ...rest }) => (
  <div {...rest} style={{ width: '100%', display: 'flex', flexDirection: 'column', rowGap: '6px' }}></div>
);

const FormField = Object.assign(FormFieldWrapper, {
  Label: ({ label, required = false }: { label: string; required?: boolean } & HTMLAttributes<HTMLLabelElement>) => (
    <label style={{ fontSize: theme.text.size.medium, fontWeight: theme.text.weight.bold }}>
      {label}
      {required && <InputRequiredDot />}
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
  P: ({ value }: { value: string } & HTMLAttributes<HTMLParagraphElement>) => (
    <p style={{ height: '10px', color: 'black' }}>{value}</p>
  ),
});
export default FormField;
