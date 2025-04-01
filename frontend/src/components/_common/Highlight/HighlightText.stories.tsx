import { Meta, StoryObj } from '@storybook/react';

import HighlightText from '@/components/_common/Highlight/HighlightText';

const meta: Meta<typeof HighlightText> = {
  title: 'components/HighlightText',
  component: HighlightText,
  argTypes: {
    title: {
      control: 'text',
      description: 'The main title text',
    },
    fontSize: {
      control: 'radio',
      options: ['medium', 'small'],
      description: 'Font size for the title text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'This is a sample title with highlighted words',
    highlights: ['sample', 'highlighted'],
    fontSize: 'medium',
  },
};

export const SmallFont: Story = {
  args: {
    title: 'This is another example with smaller font size',
    highlights: ['another', 'example'],
    fontSize: 'small',
  },
};

export const NoHighlights: Story = {
  args: {
    title: 'This title has no highlights',
    highlights: [],
    fontSize: 'medium',
  },
};
