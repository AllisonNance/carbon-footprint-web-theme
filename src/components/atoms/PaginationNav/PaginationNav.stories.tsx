import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PaginationNav } from "./PaginationNav";

const meta: Meta<typeof PaginationNav> = {
  title: "Atoms/PaginationNav",
  component: PaginationNav,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    totalItems: { control: { type: "number", min: 1 } },
    itemsShown: { control: { type: "number", min: 4 } },
    loop: { control: "boolean" },
    disableOverflow: { control: "boolean" },
  },
  args: {
    totalItems: 20,
    itemsShown: 10,
    size: "lg",
    loop: false,
    disableOverflow: false,
  },
};
export default meta;

type Story = StoryObj<typeof PaginationNav>;

export const Default: Story = {};

export const FewPages: Story = {
  args: { totalItems: 5, itemsShown: 10 },
};

export const ManyPages: Story = {
  args: { totalItems: 100, itemsShown: 10 },
};

export const Loop: Story = {
  args: { totalItems: 8, loop: true },
};

export const DisabledOverflow: Story = {
  args: { totalItems: 50, disableOverflow: true },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <code>size=&quot;sm&quot;</code>
        <PaginationNav {...args} size="sm" />
      </div>
      <div>
        <code>size=&quot;md&quot;</code>
        <PaginationNav {...args} size="md" />
      </div>
      <div>
        <code>size=&quot;lg&quot;</code>
        <PaginationNav {...args} size="lg" />
      </div>
    </div>
  ),
  args: { totalItems: 20 },
};

export const Controlled: Story = {
  render: (args) => {
    const [page, setPage] = useState(4);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <PaginationNav {...args} page={page} onChange={setPage} />
        <span>
          Current page (0-based): <strong>{page}</strong>
        </span>
      </div>
    );
  },
  args: { totalItems: 30, itemsShown: 8 },
};

export const SmallWindow: Story = {
  args: { totalItems: 12, itemsShown: 4 },
};

export const CustomLabels: Story = {
  args: {
    totalItems: 25,
    labels: {
      prev: "Anterior",
      next: "Siguiente",
      item: "Página",
      active: "Activa",
      of: "de",
      selectPage: "Seleccionar página",
    },
  },
};
