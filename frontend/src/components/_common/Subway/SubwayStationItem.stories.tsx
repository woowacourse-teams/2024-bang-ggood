import { Meta, StoryObj } from '@storybook/react';

import SubwayStationItem from './SubwayStationItem';

const meta: Meta<typeof SubwayStationItem> = {
  title: 'Components/Subway/SubwayStationItem',
  component: SubwayStationItem,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    station: { stationName: '서울역', stationLine: ['1호선', '4호선'], walkingTime: 5 },
    size: 'medium',
    textType: 'full',
  },
};
