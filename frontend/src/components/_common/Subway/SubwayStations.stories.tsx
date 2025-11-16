import { Meta, StoryObj } from '@storybook/react';

import SubwayStations from './SubwayStations';

const meta: Meta<typeof SubwayStations> = {
  title: 'Components/Subway/SubwayStations',
  component: SubwayStations,
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium'],
    },
    textType: {
      control: { type: 'radio' },
      options: ['omit', 'full'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof SubwayStations>;

export const Default: Story = {
  args: {
    stations: [
      {
        stationName: '강남역',
        stationLine: ['2호선'],
        walkingTime: 5,
      },
      {
        stationName: '역삼역',
        stationLine: ['2호선'],
        walkingTime: 8,
      },
    ],
    size: 'medium',
    textType: 'full',
  },
};
