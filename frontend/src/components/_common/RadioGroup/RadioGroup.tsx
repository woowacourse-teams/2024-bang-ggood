import styled from '@emotion/styled';
import { HTMLAttributes, useContext } from 'react';

import RadioContext from '@/components/_common/RadioGroup/RadioContext';
import { flexCenter, flexRow } from '@/styles/common';
import { InputChangeEvent } from '@/types/event';

interface Props extends HTMLAttributes<HTMLFieldSetElement> {
  label: string;
  value: string;
  onChangeChild: (e: InputChangeEvent) => void;
}

const RadioGroupWrapper = ({ label, value, children, onChangeChild, ...rest }: Props) => {
  const radioState = { value, onChangeChild };
  return (
    <fieldset {...rest}>
      <legend>{label}</legend>
      <RadioContext.Provider value={radioState}>
        <S.RadioButtonContainer>{children}</S.RadioButtonContainer>
      </RadioContext.Provider>
    </fieldset>
  );
};

interface RadioButtonProps extends HTMLAttributes<HTMLLabelElement> {
  name?: string;
  value: string;
  disabled?: boolean;
}

const RadioButton = ({ name, value, children, disabled = false, color, ...rest }: RadioButtonProps) => {
  const group = useContext(RadioContext);

  return (
    <S.Label {...rest}>
      <S.RadioButton
        type="radio"
        name={name}
        value={value}
        disabled={disabled}
        checked={group.value !== undefined ? value === group.value : undefined}
        onChange={group.onChangeChild}
        $color={color ?? 'green'}
      />
      {children}
    </S.Label>
  );
};

const S = {
  RadioButtonContainer: styled.div`
    ${flexRow}
  `,
  RadioButton: styled.input<{ $color: string }>`
    ${({ $color }) => $color && `accent-color:  ${$color};`}
  `,
  Label: styled.label`
    ${flexCenter}
  `,
};

const RadioGroup = Object.assign(RadioGroupWrapper, { RadioButton });

export default RadioGroup;
