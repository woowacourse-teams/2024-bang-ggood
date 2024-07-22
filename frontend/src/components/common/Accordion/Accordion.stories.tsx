import type { Meta, StoryObj } from '@storybook/react';

import Accordion from '@/components/common/Accordion/Accordion';
import theme from '@/styles/theme';

const meta = {
  title: 'components/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: 'Accordion 컴포넌트는 아이템을 확장하$여 보여줄 수 있는 컴포넌트입니다.',
      },
    },
    backgrounds: {
      default: 'grey',
      values: [
        {
          name: 'grey',
          value: theme.palette.grey100,
        },
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
        <Accordion.header text={'청결도'} id={1}></Accordion.header>
        <Accordion.body id={1}>
          <ul>
            <li>list 1</li>
            <li>list 2</li>
            <li>list 3</li>
          </ul>
        </Accordion.body>
      </Accordion>
    );
  },
  args: {},
};
