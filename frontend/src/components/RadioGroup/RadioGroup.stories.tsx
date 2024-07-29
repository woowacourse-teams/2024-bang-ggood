import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import RadioGroup from '@/components/RadioGroup/RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'components/RadioGroup',
  component: RadioGroup,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const InLocationPage: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <>
        <RadioGroup
          label=""
          value={value}
          onChangeChild={e => {
            setValue(e.target.value);
          }}
        >
          <RadioGroup.RadioButton value="안좋음">안좋다</RadioGroup.RadioButton>
          <RadioGroup.RadioButton value="좋음">좋다</RadioGroup.RadioButton>
        </RadioGroup>
        {`선택된 값 : ${value}`}
      </>
    );
  },
};
