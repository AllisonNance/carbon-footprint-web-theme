import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Molecules/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Back-link trail shown above a detail page: an arrow and parent " +
          "link, a slash, then the current page label (e.g. the client name).",
      },
    },
  },
  args: {
    parentLabel: "Work",
    parentHref: "/",
    current: "Clinical and Laboratory Standards Institute",
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {};

export const NarrowColumn: Story = {
  render: (args) => (
    <div style={{ maxWidth: 240 }}>
      <Breadcrumb {...args} />
    </div>
  ),
};
