import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import AlertModal from './AlertModal';

const meta: Meta<typeof AlertModal> = {
  title: 'Components/AlertModal',
  component: AlertModal,
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    hasIcon: { control: 'boolean' },
    approveButtonName: { control: 'text' },
    onClose: { action: 'onClose' },
    handleApprove: { action: 'handleApprove' },
  },
};

export default meta;
type Story = StoryObj<typeof AlertModal>;

const Template: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(args.isOpen);

    return (
      <AlertModal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        handleApprove={() => {
          args.handleApprove();
          setIsOpen(false);
        }}
      />
    );
  },
};

export const Default: Story = {
  ...Template,
  args: {
    isOpen: true,
    title: '정말 삭제하시겠어요?',
    subtitle: '삭제한 후에는 복구할 수 없습니다.',
    hasIcon: true,
    approveButtonName: '삭제하기',
  },
};

export const WithoutIcon: Story = {
  ...Template,
  args: {
    ...Default.args,
    hasIcon: false,
  },
};

export const CustomApproveButton: Story = {
  ...Template,
  args: {
    ...Default.args,
    approveButtonName: '확인',
  },
};
