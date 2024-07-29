import type { Meta, StoryObj } from '@storybook/react';

import Tabs, { Tab } from '@/components/common/Tabs/Tabs';

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
} satisfies Meta<typeof Tabs>;
export default meta;

type Story = StoryObj<typeof meta>;

const mockMenuList: Tab[] = [
  {
    name: '기본 정보',
    id: 'basic-info',
  },
  {
    name: '체크리스트',
    id: 'checklist',
  },
  {
    name: '메모 및 사진',
    id: 'extra-info',
  },
];

export const Default: Story = {
  args: {
    tabList: mockMenuList,
  },
};
