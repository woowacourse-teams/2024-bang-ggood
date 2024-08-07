import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import FormField from '@/components/common/FormField/FormField';
import { InputChangeEvent } from '@/components/common/Input/Input';

const meta = {
  title: 'components/FormField',
  component: FormField,
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Good: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const handleChange = (event: InputChangeEvent) => {
      setValue(event.target.value);
    };
    return (
      <FormField key={''}>
        <FormField.Label label="입력 내용" required={true} />
        <FormField.Input value={value} width="full" placeholder="" onChange={handleChange} />
        <FormField.P value={`검증 오류 표출하는 곳. 입력값 : ${value}`} />
      </FormField>
    );
  },
};