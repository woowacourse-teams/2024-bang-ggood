import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import LoginModal from './LoginModal';

export default {
  title: 'Components/Modal/LoginModal',
  component: LoginModal,
  argTypes: {
    isModalOpen: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<typeof LoginModal> = args => {
  const [isOpen, setIsOpen] = useState(args.isModalOpen);

  return <LoginModal isModalOpen={isOpen} modalClose={() => setIsOpen(false)} />;
};

export const Default = Template.bind({});
Default.args = {
  isModalOpen: true,
};
