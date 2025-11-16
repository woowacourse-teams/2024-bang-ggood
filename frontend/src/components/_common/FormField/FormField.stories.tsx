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

export const Primary: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const handleChange = (event: InputChangeEvent) => {
      setValue(event.target.value);
    };
    return (
      <FormField key="">
        <FormField.Label label="입력 내용" required={true} />
        <FormField.Input value={value} width="full" placeholder="" onChange={handleChange} />
      </FormField>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <FormField>
        <FormField.Label label="입력 내용" required={true} />
        <FormField.Input value="Input" width="full" placeholder="" disabled />
      </FormField>
    );
  },
};

export const Normal: Story = {
  render: () => {
    return (
      <FormField>
        <FormField.Label label="입력 내용" required={true} />
        <FormField.Input value="Input" width="full" placeholder="" variant="default" />
        <FormField.ErrorMessage value="" />
      </FormField>
    );
  },
};

export const Error: Story = {
  render: () => {
    return (
      <FormField>
        <FormField.Label label="입력 내용" required={true} />
        <FormField.Input value="Input" width="full" placeholder="" variant="default" isError={true} />
        <FormField.ErrorMessage value="Message" />
      </FormField>
    );
  },
};

export const FilledWhite: Story = {
  render: () => {
    return (
      <FormField>
        <FormField.Label label="입력 내용" required={true} />
        <FormField.Input value="Input" width="full" placeholder="" variant="fill-white" />
      </FormField>
    );
  },
};
