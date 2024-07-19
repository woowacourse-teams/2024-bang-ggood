import type { Meta, StoryObj } from '@storybook/react';
import { Router } from 'react-router-dom';

import Footer from '@/components/Footer/Footer';

const meta = {
  component: Footer,
  parameters: {
    backgrounds: {
      default: 'grey',
      values: [
        { name: 'grey', value: '#cccccc' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AA: Story = {
  render: () => (
    <Router>
      <Footer>a</Footer>
    </Router>
  ),
};
