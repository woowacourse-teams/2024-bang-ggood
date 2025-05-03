import styled from '@emotion/styled';
import { ElementType, HTMLAttributes, LabelHTMLAttributes } from 'react';

import { InputRequiredDotIcon } from '@/assets/assets';
import Input from '@/components/_common/Input/Input';
import { flexColumn } from '@/styles/common';
import { fontStyle } from '@/utils/fontStyle';

type GetProps<T> = T extends React.FC<infer P> ? P : never;

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  bold?: boolean;
  required?: boolean;
  as?: ElementType;
}

const FormFieldWrapper = styled.div<{ rowGap?: string }>`
  ${flexColumn}

  flex: auto;
  row-gap: ${({ rowGap }) => (rowGap ? rowGap : '1rem')};
`;

const FormField = Object.assign(FormFieldWrapper, {
  Label: ({ label, bold = false, required = false, ...rest }: LabelProps) => {
    return (
      <S.LabelContainer bold={bold} {...rest}>
        {label}
        {required && <S.MovedRequiredDot />}
      </S.LabelContainer>
    );
  },
  TextBox: ({ text, ...rest }: { text: string } & HTMLAttributes<HTMLDivElement>) => (
    <S.TextBox {...rest}>{text}</S.TextBox>
  ),
  Input: ({ ...rest }: GetProps<typeof Input>) => <Input {...rest} />,
  ErrorMessage: ({ value, ...rest }: { value?: string } & HTMLAttributes<HTMLParagraphElement>) => (
    <S.ErrorMessage {...rest} aria-live="polite">
      {value ?? ''}
    </S.ErrorMessage>
  ),
  BottomEmptyBox: () => <S.EmptyBox />,
});

const S = {
  MovedRequiredDot: styled(InputRequiredDotIcon)`
    position: relative;
    top: -1.5rem;
    left: 0.5rem;
  `,
  LabelContainer: styled.label<{ bold: boolean }>`
    position: relative;
    z-index: 0;
    ${({ theme, bold }) => (bold ? fontStyle(theme.font.headline[2].B) : fontStyle(theme.font.label[1].R))}
  `,
  ErrorMessage: styled.p`
    padding: 0 0 0 1.6rem;

    color: ${({ theme }) => theme.color.red[300]};
    ${({ theme }) => fontStyle(theme.font.label[1].R)}
  `,
  EmptyBox: styled.div`
    height: 1rem;
  `,
  TextBox: styled.div`
    width: 100%;
    height: 2rem;
    padding: 0.6rem 0;

    box-sizing: border-box;
  `,
};
export default FormField;
