import type { Meta, StoryObj } from '@storybook/react';

import Header from '@/components/_common/Header/Header';

const meta: Meta<typeof Header> = {
  title: 'components/Header',
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

export const TextStyleLogo: Story = {
  render: () => <Header left={<Header.Title>Title</Header.Title>} />,
};
export const Backward: Story = {
  render: () => <Header left={<Header.Backward />} />,
};

export const BackwardAndConfirm: Story = {
  render: () => <Header left={<Header.Backward />} right={<Header.TextButton>Button</Header.TextButton>} />,
};

export const Triple: Story = {
  render: () => (
    <Header
      left={<Header.Backward />}
      center={<div style={{ display: 'flex', alignItems: 'center' }}>Title</div>}
      right={<Header.TextButton>Button</Header.TextButton>}
    />
  ),
};
export const WithoutConfirm: Story = {
  render: () => <Header left={<Header.Backward />} center={<Header.Text>Title</Header.Text>} />,
};

export const Opacity: Story = {
  render: () => (
    <div style={{ height: '6rem' }}>
      <Header left={<Header.Backward />} isTransparent />
    </div>
  ),
};
export const BangGgoodLogo: Story = {
  render: () => <Header left={<Header.Logo />} />,
};
