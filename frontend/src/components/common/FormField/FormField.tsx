import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';

import { InputRequiredDot } from '@/assets/assets';
import Input from '@/components/common/Input/Input';
import theme from '@/styles/theme';

const FormFieldWrapper = styled.div<{ rowGap?: string }>`
  display: flex;

  flex: auto;
  flex-direction: column;
  row-gap: ${({ rowGap }) => (rowGap ? rowGap : '10px')};
`;

const S = {
  MovedRequiredDot: styled(InputRequiredDot)`
    position: absolute;
    top: -5px;
    left: 50px;
  `,
  P: styled.p`
    height: 10px;

    color: black;
    font-size: ${({ theme }) => theme.text.size.small};
  `,
  LabelContainer: styled.label`
    position: relative;
    z-index: 0;
  `,
};

type GetProps<T> = T extends React.FC<infer P> ? P : never;

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  label: string;
  required?: boolean;
}

const FormField = Object.assign(FormFieldWrapper, {
  Label: ({ label, required = false, ...rest }: LabelProps) => (
    <S.LabelContainer {...rest} style={{ fontSize: theme.text.size.medium, fontWeight: theme.text.weight.bold }}>
      {label}
      {required && <S.MovedRequiredDot />}
    </S.LabelContainer>
  ),
  Input: ({ ...rest }: GetProps<typeof Input>) => <Input {...rest} />,
  P: ({ value, ...rest }: { value: string } & HTMLAttributes<HTMLParagraphElement>) => <S.P {...rest}>{value}</S.P>,
});

export default FormField;
