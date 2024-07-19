import type { Meta, StoryObj } from '@storybook/react';

import AccordionHeader from './AccodionHeader';

const meta = {
  title: 'Accordion',
  component: AccordionHeader,
  parameters: {
    backgrounds: {
      default: 'grey',
      values: [
        { name: 'grey', value: '#cccccc' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
} satisfies Meta<typeof AccordionHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isMarked: false,
    text: '청결도',
    id: 1,
  },
};

export const AccodionWithMark: Story = {
  args: {
    isMarked: true,
    text: '청결도',
    id: 1,
  },
};
