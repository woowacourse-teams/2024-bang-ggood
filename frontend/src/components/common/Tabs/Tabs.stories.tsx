import type { Meta, StoryObj } from '@storybook/react';

import { TabProvider } from '@/components/common/Tabs/TabContext';
import Tabs, { TabWithCompletion } from '@/components/common/Tabs/Tabs';

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
      <TabProvider>
        <Story />
      </TabProvider>
    ),
    mobileDecorator,
  ],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockMenuList: TabWithCompletion[] = [
  {
    id: 1,
    name: '청결',
    isCompleted: true,
  },
  {
    id: 2,
    name: '방 컨디션',
    isCompleted: true,
  },
  {
    id: 3,
    name: '편의시설',
    isCompleted: true,
  },
  {
    id: 4,
    name: '옵션',
    isCompleted: true,
  },
  {
    id: 5,
    name: '주거환경',
    isCompleted: false,
  },
  {
    id: 6,
    name: '보안',
    isCompleted: false,
  },
  {
    id: 7,
    name: '경제적',
    isCompleted: false,
  },
];

export const Default: Story = {
  args: {
    tabList: mockMenuList,
  },
};
