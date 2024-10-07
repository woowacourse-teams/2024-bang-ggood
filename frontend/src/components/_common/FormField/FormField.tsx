import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';

import { InputRequiredDot } from '@/assets/assets';
import Input from '@/components/_common/Input/Input';
import { flexColumn } from '@/styles/common';
import theme from '@/styles/theme';

type GetProps<T> = T extends React.FC<infer P> ? P : never;

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  label: string;
  required?: boolean;
}

const FormFieldWrapper = styled.div<{ rowGap?: string }>`
  ${flexColumn}

  flex: auto;
  row-gap: ${({ rowGap }) => (rowGap ? rowGap : '1rem')};
`;

const FormField = Object.assign(FormFieldWrapper, {
  Label: ({ label, required = false, ...rest }: LabelProps) => (
    <S.LabelContainer {...rest} style={{ fontSize: theme.text.size.medium, fontWeight: theme.text.weight.bold }}>
      {label}
      {required && <S.MovedRequiredDot />}
    </S.LabelContainer>
  ),
  TextBox: ({ text }: { text: string }) => <S.TextBox>{text}</S.TextBox>,
  Input: ({ ...rest }: GetProps<typeof Input>) => <Input {...rest} />,
  ErrorMessage: ({ value, ...rest }: { value?: string } & HTMLAttributes<HTMLParagraphElement>) => (
    <S.ErrorMessage {...rest} aria-live="polite">
      {value ?? ''}
    </S.ErrorMessage>
  ),
  BottomEmptyBox: () => <S.EmptyBox />,
});

const S = {
  MovedRequiredDot: styled(InputRequiredDot)`
    position: relative;
    top: -1.5rem;
    left: 0.5rem;
  `,
  LabelContainer: styled.label`
    position: relative;
    z-index: 0;
  `,
  ErrorMessage: styled.p`
    height: 1rem;

    color: ${({ theme }) => theme.palette.red500};
    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
  EmptyBox: styled.div`
    height: 1rem;
  `,
  TextBox: styled.div`
    width: 100%;
    height: 3rem;
    padding: 0.6rem 1rem;

    box-sizing: border-box;
  `,
};
export default FormField;
