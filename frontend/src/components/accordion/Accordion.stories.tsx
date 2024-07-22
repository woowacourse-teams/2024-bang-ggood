import type { Meta, StoryObj } from '@storybook/react';

import Accordion from '@/components/Accordion/Accordion';

const meta = {
  title: 'Accordion',
  component: Accordion,
  parameters: {
    backgrounds: {
      default: 'grey',
      values: [
        { name: 'grey', value: '#cccccc' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Accordion>
        <Accordion.header isMarked={true} text={'청결도'} id={1}></Accordion.header>
        <Accordion.body id={1}>
          <div></div>
        </Accordion.body>
      </Accordion>
    );
  },
  args: {},
};
