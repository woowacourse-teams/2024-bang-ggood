import type { Meta, StoryObj } from '@storybook/react';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import TipBox from '@/components/_common/TipBox/TipBox';
import useHandleTip from '@/hooks/useHandleTip';

/**
 * TipBox는 가이드를 주는 팁이 담긴 박스 컴포넌트입니다.
 */
const meta = {
  title: 'components/TipBox',
  component: TipBox,
  parameters: {
    backgrounds: {
      default: 'grey',
      values: [
        { name: 'grey', value: '#cccccc' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
  render: args => {
    const { resetShowTip } = useHandleTip(args.tipType);

    return (
      <>
        <TipBox {...args} />
        <FlexBox.Horizontal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
            <button style={{ borderRadius: '10px', backgroundColor: 'white', padding: '10px' }} onClick={resetShowTip}>
              팁을 다시 여는 버튼
            </button>
            <div>
              옆 버튼을 클릭한 후, 다시 페이지에 들어오면 팁이 렌더링됩니다<div className=""></div>
            </div>
          </div>
        </FlexBox.Horizontal>
      </>
    );
  },
} satisfies Meta<typeof TipBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { tipType: 'OPTION' },
};
