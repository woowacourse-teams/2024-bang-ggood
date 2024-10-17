import styled from '@emotion/styled';

import Button from '@/components/_common/Button/Button';
import FormField from '@/components/_common/FormField/FormField';
import Header from '@/components/_common/Header/Header';
import RadioGroup from '@/components/_common/RadioGroup/RadioGroup';
import { flexCenter, title4 } from '@/styles/common';

const FormStyled = {
  Center: styled.div`
    ${flexCenter}
    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.large};
  `,
  SaveTextButton: styled(Header.TextButton)`
    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.large};
  `,
  AddressButton: styled(Button)`
    width: 9rem;
    height: 3rem;
    padding: 0.5rem;

    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
  AddOptionButton: styled(Button)`
    width: 100%;
    border-radius: 0.4rem;

    background-color: ${({ theme }) => theme.palette.yellow500};

    &:hover {
      background-color: ${({ theme }) => theme.palette.yellow600};
    }

    color: ${({ theme }) => theme.palette.black};
  `,
  FieldBox: styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    gap: 1rem;
  `,
  OptionButtonContainer: styled.div<{ gap?: number | string; flexWrap?: string }>`
    display: flex;
    justify-content: flex-start;
    gap: 0.8rem ${({ gap: gap }) => gap ?? '.8rem'};
    ${({ flexWrap }) => (flexWrap ? 'flex-wrap:' + flexWrap + ';' : '')}
  `,

  FlexInput: styled(FormField.Input)`
    flex: 1 1 auto;
  `,
  FlexLabel: styled(FormField.Label)`
    ${flexCenter}
    ${title4}
    white-space: pre;
  `,

  RadioGroup: styled(RadioGroup)<{ width?: string }>`
    ${({ width }) => (width ? `width:${width};` : '')}
    flex: 1 0 auto;

    ${flexCenter}
    font-size: ${({ theme }) => theme.text.size.xSmall};
    column-gap: 0.7rem;
  `,
};
export default FormStyled;
