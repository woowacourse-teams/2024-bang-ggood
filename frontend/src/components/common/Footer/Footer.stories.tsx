import type { Meta, StoryObj } from '@storybook/react';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';

import Footer from '@/components/common/Footer/Footer';
import { ROUTE_PATH } from '@/constants/routePath';

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
        { node: <Footer.HomeLogo />, nodeActive: <Footer.HomeLogoActive />, path: ROUTE_PATH.root },
        { node: <Footer.LocationLogo />, nodeActive: <Footer.LocationLogoActive />, path: ROUTE_PATH.location },
        { node: <Footer.ChecklistLogo />, nodeActive: <Footer.ChecklistLogoActive />, path: ROUTE_PATH.checklistList },
        { node: <Footer.MyPageLogo />, nodeActive: <Footer.MyPageLogoActive />, path: ROUTE_PATH.myPage },
      ]}
    </Footer>
  ),
};
