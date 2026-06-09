import type { Meta, StoryObj } from "@storybook/react";
import { BytesBlock, type ByteItem } from "./BytesBlock";

const meta: Meta<typeof BytesBlock> = {
  title: "Organisms/BytesBlock",
  component: BytesBlock,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Compact homepage block listing the most recent feed items " +
          '("Bytes"). Each row shows a category eyebrow and a clickable ' +
          "title. The block fills its container — wrap it in a column on " +
          "desktop or any layout that suits the page.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BytesBlock>;

/* ---------- Mock data ---------- */

const sampleItems: ByteItem[] = [
  {
    id: "1",
    category: "Design Systems",
    byteTitle: "Introducing the Sterling OMS Agentic AI Activation Package from IBM Expert Labs",
    href: "#",
  },
  {
    id: "2",
    category: "Methods",
    byteTitle: "Notes from a quick experiment with on-device transcription",
    href: "#",
  },
  {
    id: "3",
    category: "Process",
    byteTitle: "Three small wins from this week's design review",
    href: "#",
  },
  {
    id: "4",
    category: "Tokens",
    byteTitle: "Carbon tokens, two months in: what I keep reaching for",
    href: "#",
  },
  {
    id: "5",
    category: "AI",
    byteTitle: "Why the empty state is the most important screen in your product",
    href: "#",
  },
];

/* ---------- Default — narrow column to mimic sidebar ---------- */

export const Default: Story = {
  parameters: { layout: "centered" },
  args: { items: sampleItems },
  render: (args) => (
    <div style={{ inlineSize: "20rem" }}>
      <BytesBlock {...args} />
    </div>
  ),
};

/* ---------- Custom heading + footer link ---------- */

export const CustomCopy: Story = {
  parameters: { layout: "centered" },
  args: {
    heading: "Recent Notes",
    moreLabel: "View all notes",
    moreHref: "/notes",
    items: sampleItems,
  },
  render: (args) => (
    <div style={{ inlineSize: "20rem" }}>
      <BytesBlock {...args} />
    </div>
  ),
};

/* ---------- Fewer items ---------- */

export const ThreeItems: Story = {
  name: "Three items",
  parameters: { layout: "centered" },
  args: { items: sampleItems.slice(0, 3) },
  render: (args) => (
    <div style={{ inlineSize: "20rem" }}>
      <BytesBlock {...args} />
    </div>
  ),
};
