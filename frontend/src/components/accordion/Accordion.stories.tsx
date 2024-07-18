import type { Meta, StoryObj } from "@storybook/react";
import AccordionHeader from "./AccodionHeader";

const meta = {
  title: "Accordion",
  component: AccordionHeader,
} satisfies Meta<typeof AccordionHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isMarked: true,
  },
};