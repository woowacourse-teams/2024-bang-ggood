import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';

import { InputRequiredDot } from '@/assets/assets';
import Input from '@/components/common/Input/Input';
import theme from '@/styles/theme';

const FormFieldWrapper = styled.div`
  display: 'flex';
  width: 100%;
  flex: auto;
  flex-direction: column;
  row-gap: 6px;
`;
const S = {
  MovedRequiredDot: styled(InputRequiredDot)`
    transform: translate(80%, -140%);
  `,
  P: styled.p`
    height: 10px;

    color: black;
    font-size: ${({ theme }) => theme.text.size.small};
  `,
};

type GetProps<T> = T extends React.FC<infer P> ? P : never;
interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  label: string;
  required?: boolean;
}
const FormField = Object.assign(FormFieldWrapper, {
  Label: ({ label, required = false, ...rest }: LabelProps) => (
    <label {...rest} style={{ fontSize: theme.text.size.medium, fontWeight: theme.text.weight.bold }}>
      {label}
      {required && <S.MovedRequiredDot />}
    </label>
  ),
  Input: ({ ...rest }: GetProps<typeof Input>) => <Input width={'full'} {...rest} />,
  P: ({ value, ...rest }: { value: string } & HTMLAttributes<HTMLParagraphElement>) => <S.P {...rest}>{value}</S.P>,
});

export default FormField;
