import type { Meta, StoryObj } from '@storybook/react';

import SubwayLineIcon from '@/components/_common/SubwayStation/SubwayLineIcon/SubwayLineIcon';
import { SUBWAY_LINE_NAMES } from '@/styles/subway';

const meta: Meta<typeof SubwayLineIcon> = {
  title: 'components/SubwayLineIcon',
  component: SubwayLineIcon,
  parameters: {
    backgrounds: {
      default: 'white',
    },
  },
  argTypes: {
    lineName: {
      control: {
        type: 'select',
        option: SUBWAY_LINE_NAMES,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SmallSize: Story = {
  args: { lineName: '수인분당선' },
};
