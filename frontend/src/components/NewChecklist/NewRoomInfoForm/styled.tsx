import styled from '@emotion/styled';
import { Button } from 'storybook/internal/components';

import FormField from '@/components/_common/FormField/FormField';
import Header from '@/components/_common/Header/Header';
import RadioGroup from '@/components/_common/RadioGroup/RadioGroup';
import { flexCenter } from '@/styles/common';

const S = {
  SaveTextButton: styled(Header.TextButton)`
    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.large};
  `,
  AddressButton: styled(Button)`
    width: 90px;
    height: 30px;
    padding: 5px;

    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
  AddOptionButton: styled(Button)`
    width: 100%;
    border-radius: 4px;

    background-color: ${({ theme }) => theme.palette.yellow500};

    &:hover {
      background-color: ${({ theme }) => theme.palette.yellow600};
    }

    color: black;
  `,

  OptionButtonContainer: styled.div<{ gap?: number | string; flexWrap?: string }>`
    display: flex;
    justify-content: flex-start;
    gap: 4px ${({ gap: gap }) => gap ?? '10px'};
    ${({ flexWrap }) => (flexWrap ? 'flex-wrap:' + flexWrap + ';' : '')}
  `,

  CustomInput: styled(FormField.Input)`
    flex: auto;
  `,
  CustomLabel: styled(FormField.Label)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 0 auto;

    font-weight: ${({ theme }) => theme.text.weight.bold};
    white-space: pre;
  `,

  RadioGroup: styled(RadioGroup)<{ width?: string }>`
    ${({ width }) => (width ? `width:${width};` : '')}
    flex: 1 0 auto;

    ${flexCenter}
    font-size: ${({ theme }) => theme.text.size.xSmall};
    column-gap: 7px;
  `,
};
export default S;
