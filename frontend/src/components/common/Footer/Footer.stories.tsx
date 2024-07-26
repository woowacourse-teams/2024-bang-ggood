import type { Meta, StoryObj } from '@storybook/react';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';

import Footer from '@/components/common/Footer/Footer';

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
      {[
        { node: <Footer.HomeLogo />, nodeActive: <Footer.HomeLogoActive />, path: 'home' },
        { node: <Footer.LocationLogo />, nodeActive: <Footer.LocationLogoActive />, path: 'location' },
        { node: <Footer.ChecklistLogo />, nodeActive: <Footer.ChecklistLogoActive />, path: 'checklist-list' },
        { node: <Footer.MyPageLogo />, nodeActive: <Footer.MyPageLogoActive />, path: 'my-page' },
      ]}
    </Footer>
  ),
};
