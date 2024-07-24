import type { Meta, StoryObj } from '@storybook/react';

import ChecklistPreviewCard from '@/components/ChecklistList/ChecklistPreviewCard';
import { checklistList } from '@/mocks/fixtures/checklistList';

import mobileDecorator from '../../../.storybook/common';

const meta: Meta<typeof ChecklistPreviewCard> = {
  title: 'components/ChecklistPreviewCard',
  component: ChecklistPreviewCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '방 비교 바로가기 배너입니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checklist: checklistList[0],
  },
  decorators: [mobileDecorator],
};

export const HadMoreThan4Badge: Story = {
  args: {
    checklist: checklistList[2],
  },
  decorators: [mobileDecorator],
};
