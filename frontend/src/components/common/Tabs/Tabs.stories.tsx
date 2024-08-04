import type { Meta, StoryObj } from '@storybook/react';

import { TabProvider } from '@/components/common/Tabs/TabContext';
import Tabs from '@/components/common/Tabs/Tabs';
import { newChecklistTabs } from '@/constants/tabs';

import mobileDecorator from '../../../../.storybook/common';

const meta = {
  title: 'components/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: 'Tabs는 다른 컨텐츠를 보여주는 링크로 이동할 수 있는 탭을 모아놓은 컴포넌트입니다.',
      },
    },
  },
  decorators: [
    Story => (
      <TabProvider initialTab={0}>
        <Story />
      </TabProvider>
    ),
    mobileDecorator,
  ],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockTabsWithCompletion = newChecklistTabs.map(tab => ({ ...tab, isCompleted: true }));

export const Default: Story = {
  args: {
    tabList: mockTabsWithCompletion,
  },
};
