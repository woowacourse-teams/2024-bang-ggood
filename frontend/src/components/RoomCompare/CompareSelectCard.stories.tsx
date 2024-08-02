import { Meta, StoryObj } from '@storybook/react/*';
import { useState } from 'react';

import { checklistList } from '@/mocks/fixtures/checklistList';

import CompareSelectCard from './CompareSelectCard';

const meta: Meta<typeof CompareSelectCard> = {
  title: 'components/CompareSelectCard',
  component: CompareSelectCard,
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => {
    const room = checklistList.checklists[0];

    const [isSelected, setIsSelected] = useState(false);
    return (
      <CompareSelectCard
        key={room.checklistId}
        isSelected={isSelected}
        onClick={() => setIsSelected(!isSelected)}
        roomName={room.roomName}
        location={room.address}
        deposit={room.deposit}
        rent={room.rent}
        createDate={new Date(room.createdAt)}
      />
    );
  },
};
