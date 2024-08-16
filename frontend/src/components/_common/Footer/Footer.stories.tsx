import type { Meta, StoryObj } from '@storybook/react';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';

import Footer from '@/components/_common/Footer/Footer';

const meta: Meta<typeof Footer> = {
  title: 'components/Footer',
  component: Footer,
  parameters: {
    backgrounds: {
      default: 'grey',
      values: [
        { name: 'grey', value: '#cccccc' },
        { name: 'white', value: '#ffffff' },
      ],
    },
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { page: 'checklist-list' },
      },
      routing: { path: '/:page' },
    }),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const InLocationPage: Story = {
  render: () => (
    <Footer>
      <Footer.HomeLogo />
      <Footer.LocationLogo />
      <Footer.ChecklistLogo />
      <Footer.MyPageLogo />
    </Footer>
  ),
};
