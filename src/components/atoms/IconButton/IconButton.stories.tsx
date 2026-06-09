import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Add, Edit, TrashCan, Settings } from "@carbon/icons-react";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Atoms/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Carbon IconButton — a square ghost button with a single icon and an always-on tooltip. The `label` prop sets both the tooltip text and the button's accessible name.",
      },
    },
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    align: {
      control: "select",
      options: [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "right",
      ],
    },
    disabled: { control: "boolean" },
    isSelected: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    size: "md",
    align: "top",
    label: "Add item",
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  render: (args) => <IconButton {...args}><Add /></IconButton>,
};

export const Disabled: Story = {
  args: { disabled: true, label: "Unavailable" },
  render: (args) => <IconButton {...args}><Add /></IconButton>,
};

/** A toggle (selected) IconButton. Uses `aria-pressed` under the hood. */
export const Selected: Story = {
  args: { isSelected: true, label: "Pinned" },
  render: (args) => <IconButton {...args}><Edit /></IconButton>,
};

/** Interactive toggle — click to flip selected state. */
export const Toggle: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <IconButton
        isSelected={on}
        label={on ? "Unpin" : "Pin"}
        onClick={() => setOn((v) => !v)}
      >
        <Edit />
      </IconButton>
    );
  },
};

/** All three sizes side-by-side. */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-05)", alignItems: "center" }}>
      <IconButton size="sm" label="Small"><Add size={16} /></IconButton>
      <IconButton size="md" label="Medium"><Add size={16} /></IconButton>
      <IconButton size="lg" label="Large"><Add size={20} /></IconButton>
    </div>
  ),
};

/** A typical toolbar built from ghost IconButtons. */
export const Toolbar: Story = {
  render: () => (
    <div
      style={{
        display: "inline-flex",
        padding: "var(--spacing-02)",
        gap: "var(--spacing-01)",
        backgroundColor: "var(--layer-01)",
        border: "1px solid var(--border-subtle-01)",
      }}
    >
      <IconButton size="sm" label="Add"><Add /></IconButton>
      <IconButton size="sm" label="Edit"><Edit /></IconButton>
      <IconButton size="sm" label="Delete"><TrashCan /></IconButton>
      <IconButton size="sm" label="Settings"><Settings /></IconButton>
    </div>
  ),
};
