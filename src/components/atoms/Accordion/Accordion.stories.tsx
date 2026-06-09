import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Accordion } from "./Accordion";
import { AccordionItem } from "./AccordionItem";

const sampleBody = (
  <p className="type-body-02">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation.
  </p>
);

const meta: Meta<typeof Accordion> = {
  title: "Atoms/Accordion",
  component: Accordion,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    align: { control: "inline-radio", options: ["start", "end"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    isFlush: { control: "boolean" },
    ordered: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    align: "end",
    size: "md",
    isFlush: false,
    ordered: false,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 640 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem title="Section 1 title">{sampleBody}</AccordionItem>
      <AccordionItem title="Section 2 title">{sampleBody}</AccordionItem>
      <AccordionItem title="Section 3 title">{sampleBody}</AccordionItem>
      <AccordionItem title="Section 4 title">{sampleBody}</AccordionItem>
    </Accordion>
  ),
};

/** Chevron on the left, title on the right. */
export const AlignStart: Story = {
  args: { align: "start" },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem title="First heading">{sampleBody}</AccordionItem>
      <AccordionItem title="Second heading" open>
        {sampleBody}
      </AccordionItem>
      <AccordionItem title="Third heading">{sampleBody}</AccordionItem>
    </Accordion>
  ),
};

/** Flush removes horizontal padding — useful when the accordion sits
 * inside a card or side panel. Ignored when `align="start"`. */
export const Flush: Story = {
  args: { isFlush: true },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem title="Flush section 1">{sampleBody}</AccordionItem>
      <AccordionItem title="Flush section 2">{sampleBody}</AccordionItem>
      <AccordionItem title="Flush section 3">{sampleBody}</AccordionItem>
    </Accordion>
  ),
};

/** Ordered list — semantics only, visuals identical. */
export const Ordered: Story = {
  args: { ordered: true },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem title="Step 1 — Create an account">
        {sampleBody}
      </AccordionItem>
      <AccordionItem title="Step 2 — Verify your email">
        {sampleBody}
      </AccordionItem>
      <AccordionItem title="Step 3 — Invite your team">
        {sampleBody}
      </AccordionItem>
    </Accordion>
  ),
};

/** Rendered side-by-side for comparison. */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 32 }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size}>
          <p className="type-label-01" style={{ marginBottom: 8 }}>
            size={size}
          </p>
          <Accordion size={size}>
            <AccordionItem title={`${size.toUpperCase()} section 1`}>
              {sampleBody}
            </AccordionItem>
            <AccordionItem title={`${size.toUpperCase()} section 2`} open>
              {sampleBody}
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  ),
};

/** Parent-level `disabled` cascades to every item via context. Individual
 * items can still override with their own `disabled` prop. */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem title="Disabled section 1">{sampleBody}</AccordionItem>
      <AccordionItem title="Disabled section 2">{sampleBody}</AccordionItem>
      <AccordionItem title="Individually enabled" disabled={false}>
        {sampleBody}
      </AccordionItem>
    </Accordion>
  ),
};

/** A realistic controlled usage — only one item open at a time. */
export const SingleOpen: Story = {
  render: () => {
    const items = ["Overview", "Tokens", "Components", "Patterns"];
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    return (
      <Accordion>
        {items.map((title, i) => (
          <AccordionItem
            key={title}
            title={title}
            open={openIndex === i}
            onHeadingClick={({ isOpen }) =>
              setOpenIndex(isOpen ? i : null)
            }
          >
            {sampleBody}
          </AccordionItem>
        ))}
      </Accordion>
    );
  },
};
