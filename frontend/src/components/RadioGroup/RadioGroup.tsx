import { HTMLAttributes, useContext } from 'react';

import { InputChangeEvent } from '@/components/common/Input/Input';
import RadioContext from '@/components/RadioGroup/RadioContext';

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
      <RadioContext.Provider value={radioState}>{children}</RadioContext.Provider>
    </fieldset>
  );
};

interface RadioButtonProps extends HTMLAttributes<HTMLLabelElement> {
  name?: string;
  value: string;
  disabled?: boolean;
}

const RadioButton = ({ name, value, children, disabled = false, ...rest }: RadioButtonProps) => {
  const group = useContext(RadioContext);
  return (
    <label {...rest}>
      <input
        type="radio"
        name={name}
        value={value}
        disabled={disabled}
        checked={group.value !== undefined ? value === group.value : undefined}
        onChange={group.onChangeChild}
      />
      {children}
    </label>
  );
};

const RadioGroup = Object.assign(RadioGroupWrapper, { RadioButton });

export default RadioGroup;
