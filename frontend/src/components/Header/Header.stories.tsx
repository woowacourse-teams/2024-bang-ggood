import type { Meta, StoryObj } from '@storybook/react';

import Header from '@/components/Header/Header';

const meta: Meta<typeof Header> = {
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
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BangGgoodLogo: Story = {
  render: () => <Header left={<Header.Logo />} />,
};
export const Backward: Story = {
  render: () => <Header left={<Header.Backward />} />,
};

export const BackwardAndConfirm: Story = {
  render: () => <Header left={<Header.Backward />} right={<Header.TextButton>확인</Header.TextButton>} />,
};
