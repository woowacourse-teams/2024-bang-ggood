import type { Meta, StoryObj } from '@storybook/react';

import CompareBanner from '@/components/ChecklistList/CompareBanner';

import mobileDecorator from '../../../.storybook/common';

const meta = {
  title: 'components/CompareBanner',
  component: CompareBanner,
  parameters: {
    docs: {
      description: {
        component: '방 비교 바로가기 배너입니다. ',
      },
    },
  },
} satisfies Meta<typeof CompareBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [mobileDecorator],
};
