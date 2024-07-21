import type { Meta, StoryObj } from '@storybook/react';

import Footer from '@/components/Footer/Footer';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';
const meta: Meta<typeof Footer> = {
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
        pathParams: { page: 'location' },
      },
      routing: { path: '/:page' },
    }),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const inLocationPage: Story = {
  render: () => (
    <Footer>
      {[
        { node: <Footer.HomeLogo />, nodeActive: <Footer.HomeLogoActive />, path: 'home' },
        { node: <Footer.LocationLogo />, nodeActive: <Footer.LocationLogoActive />, path: 'location' },
        { node: <Footer.ChecklistLogo />, nodeActive: <Footer.ChecklistLogoActive />, path: 'checklist' },
        { node: <Footer.MyPageLogo />, nodeActive: <Footer.MyPageLogoActive />, path: 'my-page' },
      ]}
    </Footer>
  ),
};
