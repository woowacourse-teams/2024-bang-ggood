import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import FormField from '@/components/_common/FormField/FormField';
import { InputChangeEvent } from '@/types/event';

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
        <FormField.BottomMessageBox value={`검증 오류 표출하는 곳. 입력값 : ${value}`} />
      </FormField>
    );
  },
};
