import { Meta, StoryObj } from '@storybook/react/*';
import { useState } from 'react';

import CompareSelectCard from './CompareSelectCard';

const meta: Meta<typeof CompareSelectCard> = {
  title: 'components/CompareSelectCard',
  component: CompareSelectCard,
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => {
    const [isSelected, setIsSelected] = useState(false);
    return <CompareSelectCard isSelected={isSelected} onClick={() => setIsSelected(!isSelected)} />;
  },
};
