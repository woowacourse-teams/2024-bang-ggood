import FormField from '@/components/common/FormField/FormField';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta = {
  title: 'components/FormField',
  component: FormField,
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Good: Story = {
  render: () => (
    <FormField key={''}>
      <FormField.Label label={'입력 내용'} required={true} />
      <FormField.Input placeholder="" state={useState('')} />
      <FormField.P value={'검증 오류 표출하는 곳'} />
    </FormField>
  ),
};
