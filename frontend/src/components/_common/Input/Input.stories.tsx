import type { Meta, StoryObj } from '@storybook/react';

import Input from '@/components/_common/Input/Input';

const meta: Meta<typeof Input> = {
  title: 'components/Input',
  component: Input,
  parameters: {
    backgrounds: {
      default: 'white',
      values: [
        { name: 'grey', value: '#cccccc' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SmallSize: Story = {
  args: { width: 'small', value: '10' },
};
export const MediumSize: Story = {
  args: { width: 'medium', value: '서울대입구역' },
};
export const LargeSize: Story = {
  args: { width: 'large', value: '방 이름' },
};
export const Full: Story = {
  args: { width: 'full', value: '서울특별시 용산시 뭐시구 우아동 101동' },
};
