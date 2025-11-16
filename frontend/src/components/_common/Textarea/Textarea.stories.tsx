import { Meta, StoryObj } from '@storybook/react';

import Textarea from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    width: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large', 'full'],
    },
    height: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large', 'full'],
    },
    borderRadius: { control: 'text' },
    hasBorder: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    width: 'full',
    height: 'small',
    borderRadius: '.5rem',
    hasBorder: true,
    placeholder: '여기에 내용을 입력하세요.',
  },
};

export const WithCustomBorder: Story = {
  args: {
    width: 'medium',
    height: 'medium',
    borderRadius: '1rem',
    hasBorder: true,
    placeholder: 'Custom Border Textarea',
  },
};

export const WithoutBorder: Story = {
  args: {
    width: 'large',
    height: 'large',
    borderRadius: '.5rem',
    hasBorder: false,
    placeholder: 'Textarea without border',
  },
};
