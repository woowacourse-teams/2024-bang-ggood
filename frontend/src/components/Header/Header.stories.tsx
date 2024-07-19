import type { Meta, StoryObj } from '@storybook/react';

import Header from '@/components/Header/Header';

const meta = {
  component: Header,
  parameters: {
    backgrounds: {
      default: 'grey',
      values: [
        { name: 'grey', value: '#cccccc' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BangGgoodLogo: Story = {
  args: { left: <Header.Logo /> },
};
export const Backward: Story = {
  args: { left: <Header.Backward /> },
};
export const BackwardAndConfirm: Story = {
  args: { left: <Header.Backward />, right: <Header.TextButton>확인</Header.TextButton> },
};
