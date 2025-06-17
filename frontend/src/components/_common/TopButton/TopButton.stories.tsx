import { Meta, StoryObj } from '@storybook/react';

import TopButton from './TopButton';

const meta: Meta<typeof TopButton> = {
  title: 'Components/TopButton',
  component: TopButton,
  argTypes: {
    text: { control: 'text', defaultValue: 'Scroll to Top' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Scroll to Top',
  },
};
