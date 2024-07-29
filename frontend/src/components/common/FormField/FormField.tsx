import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';

import { InputRequiredDot } from '@/assets/assets';
import Input from '@/components/common/Input/Input';
import theme from '@/styles/theme';

const FormFieldWrapper = ({ ...rest }) => (
  <div {...rest} style={{ width: '100%', flex: 'auto', display: 'flex', flexDirection: 'column', rowGap: '6px' }}></div>
);
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
  Input: ({ ...rest }: GetProps<typeof Input>) => <Input width={'full'} {...rest} />,
  /* 추후 입력검증 에러미시지 표출을 위해 만들어 둠 */
  P: ({ value, ...rest }: { value: string } & HTMLAttributes<HTMLParagraphElement>) => <S.P {...rest}>{value}</S.P>,
});

export default FormField;
