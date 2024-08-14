import styled from '@emotion/styled';

import FormField from '@/components/_common/FormField/FormField';
import { InputChangeEvent } from '@/types/event';
import { RoomInfoName } from '@/types/room';

export const NewChecklistFormField = ({
  label,
  name,
  value,
  errorMessage,
  required,
  type = 'string',
  onChange,
}: NewCustomFormFieldProps) => (
  <S.CustomFormField key={label}>
    <FormField.Label label={label} required={required} />
    <FormField.Input placeholder="" width="full" type={type} onChange={onChange} name={name} value={value} />
    <FormField.ErrorMessage value={errorMessage ?? ''} />
  </S.CustomFormField>
);

export interface NewCustomFormFieldProps {
  name: RoomInfoName;
  value: string | number | undefined;
  errorMessage: string | undefined;
  label: string;
  placeholder?: string;
  required?: boolean;
  onChange: (event: InputChangeEvent) => void;
  type?: string;
}
const S = {
  CustomFormField: styled(FormField)`
    flex: auto;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  `,
};
