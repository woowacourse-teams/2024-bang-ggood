import { Meta, StoryObj } from '@storybook/react';

import FlexBox from '@/components/_common/FlexBox/FlexBox';

const meta: Meta<typeof FlexBox> = {
  title: 'components/FlexBox',
  component: FlexBox,
  argTypes: {
    direction: {
      control: 'radio',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
    },
    justify: {
      control: 'radio',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
    },
    align: {
      control: 'radio',
      options: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
    },
    flexWrap: {
      control: 'radio',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
    },
    gap: {
      control: 'text',
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    padding: {
      control: 'text',
    },
    margin: {
      control: 'text',
    },
    backgroundColor: {
      control: 'color',
    },
    pointer: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    direction: 'row',
    justify: 'center',
    align: 'center',
    gap: '1rem',
    width: '100%',
    height: 'auto',
    padding: '1rem',
    margin: '0',
    backgroundColor: '#f0f0f0',
    pointer: false,
  },
  render: args => (
    <FlexBox {...args}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </FlexBox>
  ),
};

export const VerticalLayout: Story = {
  args: {
    direction: 'column',
    justify: 'space-between',
    align: 'center',
    gap: '1rem',
    width: '100%',
    height: 'auto',
    padding: '1rem',
    margin: '0',
    backgroundColor: '#e0e0e0',
    pointer: false,
  },
  render: args => (
    <FlexBox.Vertical {...args}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </FlexBox.Vertical>
  ),
};

export const HorizontalLayout: Story = {
  args: {
    direction: 'row',
    justify: 'space-evenly',
    align: 'stretch',
    gap: '2rem',
    width: '100%',
    height: 'auto',
    padding: '1rem',
    margin: '0',
    backgroundColor: '#d0d0d0',
    pointer: true,
  },
  render: args => (
    <FlexBox.Horizontal {...args}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </FlexBox.Horizontal>
  ),
};
