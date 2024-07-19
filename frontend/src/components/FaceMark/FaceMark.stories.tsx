import type { Meta, StoryObj } from '@storybook/react';

import FaceMark from '@/components/FaceMark/FaceMark';

const meta = {
  component: FaceMark,
} satisfies Meta<typeof FaceMark>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Round Button */
export const Good: Story = {
  render: () => (
    <FaceMark>
      <FaceMark.Header>청결도</FaceMark.Header>
      <FaceMark.FaceIcon emotion={'good'} fill={true} />
      <FaceMark.Footer>좋아요</FaceMark.Footer>
    </FaceMark>
  ),
};
export const Soso: Story = {
  render: () => (
    <FaceMark>
      <FaceMark.Header>청결도</FaceMark.Header>
      <FaceMark.FaceIcon emotion={'soso'} fill={true} />
      <FaceMark.Footer>평범해요</FaceMark.Footer>
    </FaceMark>
  ),
};
export const Bad: Story = {
  render: () => (
    <FaceMark>
      <FaceMark.Header>청결도</FaceMark.Header>
      <FaceMark.FaceIcon emotion={'good'} />
      <FaceMark.Footer>좋아요</FaceMark.Footer>
    </FaceMark>
  ),
};
