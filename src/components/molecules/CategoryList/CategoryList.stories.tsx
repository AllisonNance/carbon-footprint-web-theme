import type { Meta, StoryObj } from "@storybook/react";
import { CategoryList } from "./CategoryList";

const meta: Meta<typeof CategoryList> = {
  title: "Molecules/Category List",
  component: CategoryList,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Vertical category filter list with item counts. " +
          "Used alongside feeds like the bytes feed to filter by category.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CategoryList>;

export const Default: Story = {
  args: {
    heading: "Categories",
    items: [
      { label: "AI", count: 24, isActive: true },
      { label: "Design Systems", count: 26 },
      { label: "Process", count: 26 },
      { label: "Workshops", count: 26 },
      { label: "Figma", count: 26 },
      { label: "Other Category", count: 26 },
      { label: "Another Category", count: 26 },
    ],
  },
};
