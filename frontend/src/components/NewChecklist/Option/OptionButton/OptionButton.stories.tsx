import type { Meta, StoryObj } from '@storybook/react';

import OptionButton from '@/components/NewChecklist/Option/OptionButton/OptionButton';
import { OPTIONS } from '@/constants/options';

const meta = {
  title: 'components/OptionButton',
  component: OptionButton,
  argTypes: {
    option: { control: { disable: true } },
  },
  decorators: [
    Story => (
      <div style={{ width: '80px', height: '80px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OptionButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Good: Story = {
  args: { option: OPTIONS[1], isSelected: true },
};
